'use client';

import { useState } from 'react';
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

export default function ContactPage() {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    referenceNumber: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
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
    'General Inquiry',
    'Application Status',
    'Payment Issue',
    'Document Upload Problem',
    'Refund Request',
    'Technical Support',
    'Other',
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
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Contact Us
              </h1>
              <p className="text-brand-light/60 max-w-xl mx-auto">
                Have a question or need help with your application? We&apos;re
                here to assist you.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div className="lg:col-span-1 space-y-4">
                <div className="form-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-accent/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-brand-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">
                        Email Us
                      </h3>
                      <p className="text-brand-light/60 text-sm mb-2">
                        For general inquiries
                      </p>
                      <a
                        href="mailto:support@ukgazete.com"
                        className="text-brand-accent hover:underline text-sm"
                      >
                        support@ukgazete.com
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
                      <h3 className="font-semibold text-white mb-1">
                        Response Time
                      </h3>
                      <p className="text-brand-light/60 text-sm">
                        We typically respond within 24 hours during business
                        days.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="form-card p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-accent/20 flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-5 h-5 text-brand-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">
                        Check Status
                      </h3>
                      <p className="text-brand-light/60 text-sm mb-2">
                        Track your application online
                      </p>
                      <a
                        href="/status"
                        className="text-brand-accent hover:underline text-sm"
                      >
                        Check Status &rarr;
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
                      <h2 className="text-2xl font-bold text-white mb-2">
                        Message Sent!
                      </h2>
                      <p className="text-brand-light/60 mb-2">
                        Thank you for contacting us. We&apos;ll get back to you
                        within 24 hours.
                      </p>
                      <p className="text-brand-light/40 text-sm mb-6">
                        A confirmation has been sent to your email.
                      </p>
                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setError(null);
                          setFormData({
                            name: '',
                            email: '',
                            referenceNumber: '',
                            subject: '',
                            message: '',
                          });
                        }}
                        className="btn-secondary"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {error && (
                        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                          <p className="text-red-400 text-sm">{error}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="input-label">Your Name</label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Smith"
                            className="input-field"
                            required
                            minLength={2}
                          />
                        </div>
                        <div>
                          <label className="input-label">Email Address</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            className="input-field"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="input-label">
                            Reference Number{' '}
                            <span className="text-brand-light/40">
                              (if applicable)
                            </span>
                          </label>
                          <input
                            type="text"
                            name="referenceNumber"
                            value={formData.referenceNumber}
                            onChange={handleChange}
                            placeholder="ETA-XXXXXX-XXXX"
                            className="input-field uppercase"
                          />
                        </div>
                        <div>
                          <label className="input-label">Subject</label>
                          <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="select-field"
                            required
                          >
                            <option value="">Select a subject</option>
                            {subjects.map((subject) => (
                              <option key={subject} value={subject}>
                                {subject}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="input-label">Message</label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="How can we help you?"
                          rows={5}
                          className="input-field resize-none"
                          required
                          minLength={10}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            Send Message
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
