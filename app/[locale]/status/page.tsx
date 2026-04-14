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

export default function StatusPage() {
  const t = useTranslations();
  const [referenceNumber, setReferenceNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<StatusResult | null>(null);

  const statusConfig = {
    draft: {
      icon: <FileText className="w-8 h-8" />,
      color: 'text-gray-400',
      bgColor: 'bg-gray-400/20',
      label: t('statusPage.status.draft.label'),
      description: t('statusPage.status.draft.desc'),
    },
    paid: {
      icon: <Clock className="w-8 h-8" />,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/20',
      label: t('statusPage.status.paid.label'),
      description: t('statusPage.status.paid.desc'),
    },
    submitted: {
      icon: <AlertCircle className="w-8 h-8" />,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/20',
      label: t('statusPage.status.submitted.label'),
      description: t('statusPage.status.submitted.desc'),
    },
    approved: {
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'text-green-400',
      bgColor: 'bg-green-400/20',
      label: t('statusPage.status.approved.label'),
      description: t('statusPage.status.approved.desc'),
    },
    refused: {
      icon: <XCircle className="w-8 h-8" />,
      color: 'text-red-400',
      bgColor: 'bg-red-400/20',
      label: t('statusPage.status.refused.label'),
      description: t('statusPage.status.refused.desc'),
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/check-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referenceNumber: referenceNumber.trim().toUpperCase(),
          email: email.trim().toLowerCase(),
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || t('statusPage.notFound'));
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('statusPage.notFound'));
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
              <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">
                {t('statusPage.title')}
              </h1>
              <p className="text-brand-light/60">{t('statusPage.subtitle')}</p>
            </div>

            {/* Search Form */}
            {!result && (
              <div className="form-card p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="input-label">{t('statusPage.refLabel')}</label>
                    <input
                      type="text"
                      value={referenceNumber}
                      onChange={(e) => setReferenceNumber(e.target.value.toUpperCase())}
                      placeholder="ETA-XXXXXX-XXXX"
                      className="input-field uppercase"
                      required
                    />
                    <p className="text-brand-light/40 text-xs mt-1.5">{t('statusPage.refHelp')}</p>
                  </div>

                  <div>
                    <label className="input-label">{t('statusPage.emailLabel')}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your.email@example.com"
                      className="input-field"
                      required
                    />
                    <p className="text-brand-light/40 text-xs mt-1.5">{t('statusPage.emailHelp')}</p>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 border border-red-200">
                      <p className="text-red-600 text-sm">{error}</p>
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
                        {t('statusPage.checkingBtn')}
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        {t('statusPage.checkBtn')}
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* Result Display */}
            {result && statusInfo && (
              <div className="form-card p-6 md:p-8">
                <div className="text-center mb-8">
                  <div className={`w-20 h-20 rounded-2xl ${statusInfo.bgColor} flex items-center justify-center mx-auto mb-4`}>
                    <span className={statusInfo.color}>{statusInfo.icon}</span>
                  </div>
                  <h2 className={`text-2xl font-bold ${statusInfo.color} mb-2`}>
                    {statusInfo.label}
                  </h2>
                  <p className="text-brand-light/60">{statusInfo.description}</p>
                </div>

                <div className="space-y-4 p-4 rounded-xl bg-surface-elevated/30 mb-6">
                  <div className="flex justify-between py-2 border-b border-brand-royal/20">
                    <span className="text-brand-light/50">{t('statusPage.details.reference')}</span>
                    <span className="text-brand-light font-mono">{result.referenceNumber}</span>
                  </div>
                  {result.applicantName && (
                    <div className="flex justify-between py-2 border-b border-brand-royal/20">
                      <span className="text-brand-light/50">{t('statusPage.details.applicant')}</span>
                      <span className="text-brand-light">{result.applicantName}</span>
                    </div>
                  )}
                  {result.submittedAt && (
                    <div className="flex justify-between py-2 border-b border-brand-royal/20">
                      <span className="text-brand-light/50">{t('statusPage.details.submitted')}</span>
                      <span className="text-brand-light">
                        {new Date(result.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {result.updatedAt && (
                    <div className="flex justify-between py-2">
                      <span className="text-brand-light/50">{t('statusPage.details.lastUpdated')}</span>
                      <span className="text-brand-light">
                        {new Date(result.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      setResult(null);
                      setReferenceNumber('');
                      setEmail('');
                    }}
                    className="btn-secondary flex-1"
                  >
                    {t('statusPage.checkAnother')}
                  </button>
                  <a href="/contact" className="btn-primary flex-1 text-center">
                    {t('statusPage.contactSupport')}
                  </a>
                </div>
              </div>
            )}

            {/* Help Text */}
            <div className="mt-8 text-center">
              <p className="text-brand-light/50 text-sm">
                {t('statusPage.helpText')}{' '}
                <a href="/contact" className="text-brand-accent hover:underline">
                  {t('statusPage.helpLink')}
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
