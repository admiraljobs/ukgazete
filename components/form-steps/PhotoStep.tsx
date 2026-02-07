'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Camera, Upload, X, Check, RotateCcw } from 'lucide-react';
import { useCallback, useState, useRef, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useFormContext } from '@/lib/form-context';
import { photoSchema, PhotoData } from '@/lib/validations';
import { FormNavigation } from '../FormNavigation';
import { cn } from '@/lib/utils';

export function PhotoStep() {
  const t = useTranslations();
  const { formData, updateFormData, nextStep, markStepComplete, currentStep } = useFormContext();
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(
    formData.selfiePhoto || null
  );
  const [showCamera, setShowCamera] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PhotoData>({
    resolver: zodResolver(photoSchema),
    defaultValues: {
      selfiePhoto: formData.selfiePhoto || '',
    },
  });

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // Attach stream to video element once both are available
  useEffect(() => {
    if (showCamera && videoRef.current && streamRef.current) {
      const video = videoRef.current;
      video.srcObject = streamRef.current;
      
      const handleCanPlay = () => {
        setCameraReady(true);
      };

      video.addEventListener('canplay', handleCanPlay);
      
      // Ensure video plays
      video.play().catch((err) => {
        console.error('Video play failed:', err);
      });

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [showCamera]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          setUploadedPhoto(base64);
          setValue('selfiePhoto', base64, { shouldValidate: true });
        };
        reader.readAsDataURL(file);
      }
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  const startCamera = async () => {
    setCameraError(null);
    setCameraReady(false);

    // Check if getUserMedia is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError(
        'Camera is not supported in this browser. Please upload a photo instead.'
      );
      return;
    }

    try {
      // Stop any existing stream first
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 },
        },
        audio: false,
      });

      streamRef.current = stream;
      // Set showCamera to true AFTER we have the stream
      // The useEffect will handle attaching it to the video element
      setShowCamera(true);
    } catch (err: unknown) {
      console.error('Camera access error:', err);
      const error = err as DOMException;
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setCameraError(
          'Camera access was denied. Please allow camera access in your browser settings, or upload a photo instead.'
        );
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setCameraError(
          'No camera found on this device. Please upload a photo instead.'
        );
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        setCameraError(
          'Camera is in use by another application. Please close other apps using the camera and try again.'
        );
      } else if (error.name === 'OverconstrainedError') {
        // Retry with relaxed constraints
        try {
          const fallbackStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          streamRef.current = fallbackStream;
          setShowCamera(true);
        } catch {
          setCameraError('Unable to access camera. Please upload a photo instead.');
        }
      } else {
        setCameraError(
          'Unable to access camera. Please upload a photo instead.'
        );
      }
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraReady(false);
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    
    // Use actual video dimensions for best quality
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Mirror the image horizontally (selfie mode)
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const base64 = canvas.toDataURL('image/jpeg', 0.85);
      setUploadedPhoto(base64);
      setValue('selfiePhoto', base64, { shouldValidate: true });
      stopCamera();
    }
  };

  const removePhoto = () => {
    setUploadedPhoto(null);
    setValue('selfiePhoto', '', { shouldValidate: true });
  };

  const onSubmit = (data: PhotoData) => {
    updateFormData(data);
    markStepComplete(currentStep);
    nextStep();
  };

  const requirements = [
    t('photo.requirement1'),
    t('photo.requirement2'),
    t('photo.requirement3'),
    t('photo.requirement4'),
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Step Header */}
      <div className="mb-8">
        <h2 className="step-title">{t('photo.title')}</h2>
        <p className="step-description">{t('photo.description')}</p>
      </div>

      <div className="space-y-6">
        {/* Requirements */}
        <div className="p-4 rounded-xl bg-surface-elevated/30 border border-brand-royal/30">
          <h3 className="text-brand-light font-medium mb-3">{t('photo.requirements')}</h3>
          <ul className="space-y-2">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-brand-light/70 text-sm">
                <Check className="w-4 h-4 text-brand-muted flex-shrink-0 mt-0.5" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Camera Error */}
        {cameraError && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {cameraError}
          </div>
        )}

        {/* Photo Display/Capture Area */}
        <div>
          <label className="input-label">
            {t('photo.selfie')} <span className="text-red-400">*</span>
          </label>
          <p className="text-brand-light/50 text-sm mb-3">{t('photo.selfieDescription')}</p>

          {showCamera ? (
            /* Camera view */
            <div className="relative rounded-xl overflow-hidden bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full aspect-[4/3] object-cover"
                style={{ transform: 'scaleX(-1)' }}
              />
              
              {/* Loading overlay */}
              {!cameraReady && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <span className="text-brand-light/70 text-sm">Starting camera...</span>
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
                <button
                  type="button"
                  onClick={stopCamera}
                  className="p-3 rounded-full bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                  aria-label="Close camera"
                >
                  <X className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={capturePhoto}
                  disabled={!cameraReady}
                  className="p-4 rounded-full bg-brand-accent hover:bg-brand-accent/90 text-surface-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Take photo"
                >
                  <Camera className="w-8 h-8" />
                </button>
              </div>
            </div>
          ) : uploadedPhoto ? (
            /* Photo preview */
            <div className="relative rounded-xl overflow-hidden bg-surface-elevated/30 border border-brand-muted/30">
              <img
                src={uploadedPhoto}
                alt="Uploaded selfie"
                className="w-full aspect-[4/3] object-cover"
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  type="button"
                  onClick={removePhoto}
                  className="p-2 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                  aria-label="Remove photo"
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={startCamera}
                  className="p-2 rounded-lg bg-brand-accent/80 hover:bg-brand-accent text-surface-dark transition-colors"
                  aria-label="Retake photo"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute top-4 left-4">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/30">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 text-sm font-medium">Photo uploaded</span>
                </div>
              </div>
            </div>
          ) : (
            /* Upload/Camera options */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Camera option */}
              <button
                type="button"
                onClick={startCamera}
                className="flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed border-brand-royal/50 hover:border-brand-accent/50 hover:bg-brand-accent/5 transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-brand-accent/20 flex items-center justify-center mb-4">
                  <Camera className="w-8 h-8 text-brand-accent" />
                </div>
                <span className="text-brand-light font-medium">{t('photo.takePhoto')}</span>
              </button>

              {/* Upload option */}
              <div
                {...getRootProps()}
                className={cn(
                  'flex flex-col items-center justify-center p-8 rounded-xl border-2 border-dashed transition-all cursor-pointer',
                  isDragActive
                    ? 'border-brand-accent bg-brand-accent/10'
                    : 'border-brand-royal/50 hover:border-brand-accent/50 hover:bg-brand-accent/5'
                )}
              >
                <input {...getInputProps()} />
                <div className="w-16 h-16 rounded-full bg-brand-muted/20 flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-brand-muted" />
                </div>
                <span className="text-brand-light font-medium">{t('photo.uploadPhoto')}</span>
              </div>
            </div>
          )}

          {errors.selfiePhoto && (
            <p className="input-error mt-2">{t('photo.errors.photoRequired')}</p>
          )}
        </div>
      </div>

      <FormNavigation />
    </form>
  );
}
