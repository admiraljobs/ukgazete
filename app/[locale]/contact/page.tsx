'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import {
  Mail,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle,
  Clock,
  HelpCircle,
  AlertCircle,
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Turnstile } from '@/components/Turnstile';

export default function ContactPage() {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    referenceNumber: '',
    subject: '',
    message: '',
  });

  const handleTurnstileVerify = useCallback((token: string) => {
    setTurnstileToken(token);
    if (error) setError(null);
  }, [error]);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!turnstileToken) {
      setError(t('contactPage.errors.turnstile'));
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || t('contactPage.errors.generic'));
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : t('contactPage.errors.generic')
      );
      setTurnstileToken(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const subjects = [
    { value: 'General Inquiry',          label: t('contactPage.form.subjects.general') },
    { value: 'Application Status',       label: t('contactPage.form.subjects.status') },
    { value: 'Payment Issue',            label: t('contactPage.form.subjects.payment') },
    { value: 'Document Upload Problem',  label: t('contactPage.form.subjects.document') },
    { value: 'Refund Request',           label: t('contactPage.form.subjects.refund') },
    { value: 'Technical Support',        label: t('contactPage.form.subjects.technical') },
    { value: 'Other',                    label: t('contactPage.form.subjects.other') },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-2xl bg-brand-accent/20 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-brand-accent" />
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">
                {t('contactPage.title')}
              </h1>
              <p className="text-brand-light/60 max-w-xl mx-auto">
                {t('contactPage.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Info Cards */}
              <div className="lg:col-span-1 space-y-4">
                <div className="form-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-accent/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-brand-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-dark mb-1">{t('contactPage.emailCard.title')}</h3>
                      <p className="text-brand-light/60 text-sm mb-2">{t('contactPage.emailCard.subtitle')}</p>
                      <a href="mailto:support@ukgazete.com" className="text-brand-accent hover:underline text-sm">
                        {t('contactPage.emailCard.address')}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="form-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-accent/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-brand-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-dark mb-1">{t('contactPage.responseCard.title')}</h3>
                      <p className="text-brand-light/60 text-sm">{t('contactPage.responseCard.desc')}</p>
                    </div>
                  </div>
                </div>

                <div className="form-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-accent/20 flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-5 h-5 text-brand-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-brand-dark mb-1">{t('contactPage.statusCard.title')}</h3>
                      <p className="text-brand-light/60 text-sm mb-2">{t('contactPage.statusCard.desc')}</p>
                      <a href="/status" className="text-brand-accent hover:underline text-sm">
                        {t('contactPage.statusCard.link')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="form-card p-6 md:p-8">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-400" />
                      </div>
                      <h2 className="text-2xl font-bold text-brand-dark mb-2">
                        {t('contactPage.success.title')}
                      </h2>
                      <p className="text-brand-light/60 mb-2">{t('contactPage.success.desc')}</p>
                      <p className="text-brand-light/40 text-sm mb-6">{t('contactPage.success.confirmation')}</p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setError(null);
                          setTurnstileToken(null);
                          setFormData({ name: '', email: '', referenceNumber: '', subject: '', message: '' });
                        }}
                        className="btn-secondary"
                      >
                        {t('contactPage.success.sendAnother')}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200">
                          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                          <p className="text-red-600 text-sm">{error}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="input-label">{t('contactPage.form.name')}</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t('contactPage.form.namePlaceholder')}
                            className="input-field"
                            required
                            minLength={2}
                          />
                        </div>
                        <div>
                          <label className="input-label">{t('contactPage.form.email')}</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t('contactPage.form.emailPlaceholder')}
                            className="input-field"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="input-label">
                            {t('contactPage.form.reference')}{' '}
                            <span className="text-brand-light/40">{t('contactPage.form.referenceOptional')}</span>
                          </label>
                          <input
                            type="text"
                            name="referenceNumber"
                            value={formData.referenceNumber}
                            onChange={handleChange}
                            placeholder={t('contactPage.form.referencePlaceholder')}
                            className="input-field uppercase"
                          />
                        </div>
                        <div>
                          <label className="input-label">{t('contactPage.form.subject')}</label>
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="select-field"
                            required
                          >
                            <option value="">{t('contactPage.form.subjectPlaceholder')}</option>
                            {subjects.map((s) => (
                              <option key={s.value} value={s.value}>{s.label}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="input-label">{t('contactPage.form.message')}</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder={t('contactPage.form.messagePlaceholder')}
                          rows={5}
                          className="input-field resize-none"
                          required
                          minLength={10}
                        />
                      </div>

                      <div className="flex justify-center">
                        <Turnstile
                          onVerify={handleTurnstileVerify}
                          onExpire={handleTurnstileExpire}
                          onError={() => setError(t('contactPage.errors.turnstile'))}
                          theme="light"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting || !turnstileToken}
                        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {t('contactPage.form.sending')}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            {t('contactPage.form.send')}
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
