'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, Clock, CheckCircle, XCircle, AlertCircle, Loader2, FileText } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type ApplicationStatus = 'draft' | 'paid' | 'submitted' | 'approved' | 'refused' | null;

interface StatusResult {
  referenceNumber: string;
  status: ApplicationStatus;
  submittedAt?: string;
  updatedAt?: string;
  applicantName?: string;
}

const statusConfig = {
  draft: {
    icon: <FileText className="w-8 h-8" />,
    color: 'text-gray-400',
    bgColor: 'bg-gray-400/20',
    label: 'Draft',
    description: 'Your application has been started but payment is pending.',
  },
  paid: {
    icon: <Clock className="w-8 h-8" />,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/20',
    label: 'Paid - Awaiting Submission',
    description: 'Payment received. Our team will review and submit your application shortly.',
  },
  submitted: {
    icon: <AlertCircle className="w-8 h-8" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/20',
    label: 'Submitted - Under Review',
    description: 'Your application has been submitted to UK authorities and is being processed.',
  },
  approved: {
    icon: <CheckCircle className="w-8 h-8" />,
    color: 'text-green-400',
    bgColor: 'bg-green-400/20',
    label: 'Approved',
    description: 'Congratulations! Your UK ETA has been approved. Check your email for details.',
  },
  refused: {
    icon: <XCircle className="w-8 h-8" />,
    color: 'text-red-400',
    bgColor: 'bg-red-400/20',
    label: 'Refused',
    description: 'Unfortunately, your application was not approved. Check your email for more information.',
  },
};

export default function StatusPage() {
  const t = useTranslations();
  const [referenceNumber, setReferenceNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<StatusResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/check-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referenceNumber, email }),
      });

      if (!response.ok) {
        throw new Error('Application not found. Please check your reference number and email.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      // For demo, show a mock result
      if (referenceNumber.toUpperCase().startsWith('ETA-')) {
        setResult({
          referenceNumber: referenceNumber.toUpperCase(),
          status: 'submitted',
          submittedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          applicantName: 'Test Applicant',
        });
      } else {
        setError('Application not found. Please check your reference number and email address.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const statusInfo = result?.status ? statusConfig[result.status] : null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-brand-accent/20 flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-brand-accent" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Check Application Status
              </h1>
              <p className="text-brand-light/60">
                Enter your reference number and email to check the status of your ETA application.
              </p>
            </div>

            {/* Search Form */}
            {!result && (
              <div className="form-card p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="input-label">Reference Number</label>
                    <input
                      type="text"
                      value={referenceNumber}
                      onChange={(e) => setReferenceNumber(e.target.value.toUpperCase())}
                      placeholder="ETA-XXXXXX-XXXX"
                      className="input-field uppercase"
                      required
                    />
                    <p className="text-brand-light/40 text-xs mt-1.5">
                      Found in your confirmation email
                    </p>
                  </div>

                  <div>
                    <label className="input-label">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="input-field"
                      required
                    />
                    <p className="text-brand-light/40 text-xs mt-1.5">
                      The email you used for your application
                    </p>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Checking...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Check Status
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Result Display */}
            {result && statusInfo && (
              <div className="form-card p-6 md:p-8">
                {/* Status Badge */}
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 rounded-2xl ${statusInfo.bgColor} flex items-center justify-center mx-auto mb-4`}>
                    <span className={statusInfo.color}>{statusInfo.icon}</span>
                  </div>
                  <h2 className={`text-2xl font-bold ${statusInfo.color} mb-2`}>
                    {statusInfo.label}
                  </h2>
                  <p className="text-brand-light/60">
                    {statusInfo.description}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-4 p-4 rounded-xl bg-surface-elevated/30 mb-6">
                  <div className="flex justify-between py-2 border-b border-brand-royal/20">
                    <span className="text-brand-light/50">Reference Number</span>
                    <span className="text-brand-light font-mono">{result.referenceNumber}</span>
                  </div>
                  {result.applicantName && (
                    <div className="flex justify-between py-2 border-b border-brand-royal/20">
                      <span className="text-brand-light/50">Applicant</span>
                      <span className="text-brand-light">{result.applicantName}</span>
                    </div>
                  )}
                  {result.submittedAt && (
                    <div className="flex justify-between py-2 border-b border-brand-royal/20">
                      <span className="text-brand-light/50">Submitted</span>
                      <span className="text-brand-light">
                        {new Date(result.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {result.updatedAt && (
                    <div className="flex justify-between py-2">
                      <span className="text-brand-light/50">Last Updated</span>
                      <span className="text-brand-light">
                        {new Date(result.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setResult(null);
                      setReferenceNumber('');
                      setEmail('');
                    }}
                    className="btn-secondary flex-1"
                  >
                    Check Another
                  </button>
                  <a
                    href="/contact"
                    className="btn-primary flex-1 text-center"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            )}

            {/* Help Text */}
            <div className="mt-8 text-center">
              <p className="text-brand-light/50 text-sm">
                Can't find your reference number?{' '}
                <a href="/contact" className="text-brand-accent hover:underline">
                  Contact our support team
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
