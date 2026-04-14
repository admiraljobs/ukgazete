'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Clock,
  Globe,
  CheckCircle,
  Star,
  CreditCard,
  HeadphonesIcon,
  FileCheck,
  ChevronDown,
  Zap,
  Lock,
  Users
} from 'lucide-react';
import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LiveActivityToast } from '@/components/LiveActivityToast';
import { JsonLd, buildWebsiteSchema, buildServiceSchema, buildFaqSchema, buildReviewSchema } from '@/components/JsonLd';
import { SITE_URL, SITE_NAME } from '@/lib/seo';

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-royal/30 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-brand-dark font-medium group-hover:text-brand-accent transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-brand-muted flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-brand-light/70 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  const t = useTranslations();

  const features = [
    { icon: <Clock className="w-6 h-6" />, title: t('home.features.quick.title'), description: t('home.features.quick.desc') },
    { icon: <Shield className="w-6 h-6" />, title: t('home.features.secure.title'), description: t('home.features.secure.desc') },
    { icon: <Globe className="w-6 h-6" />, title: t('home.features.multilang.title'), description: t('home.features.multilang.desc') },
    { icon: <HeadphonesIcon className="w-6 h-6" />, title: t('home.features.support.title'), description: t('home.features.support.desc') },
    { icon: <FileCheck className="w-6 h-6" />, title: t('home.features.docCheck.title'), description: t('home.features.docCheck.desc') },
    { icon: <CreditCard className="w-6 h-6" />, title: t('home.features.payment.title'), description: t('home.features.payment.desc') },
  ];

  const steps = [
    { number: '01', title: t('home.howItWorks.step1.title'), description: t('home.howItWorks.step1.desc') },
    { number: '02', title: t('home.howItWorks.step2.title'), description: t('home.howItWorks.step2.desc') },
    { number: '03', title: t('home.howItWorks.step3.title'), description: t('home.howItWorks.step3.desc') },
    { number: '04', title: t('home.howItWorks.step4.title'), description: t('home.howItWorks.step4.desc') },
  ];

  const faqs = [
    { question: t('home.faq.q1.q'), answer: t('home.faq.q1.a') },
    { question: t('home.faq.q2.q'), answer: t('home.faq.q2.a') },
    { question: t('home.faq.q3.q'), answer: t('home.faq.q3.a') },
    { question: t('home.faq.q4.q'), answer: t('home.faq.q4.a') },
    { question: t('home.faq.q5.q'), answer: t('home.faq.q5.a') },
    { question: t('home.faq.q6.q'), answer: t('home.faq.q6.a') },
  ];

  const trustBadges = [
    { icon: <Lock className="w-5 h-5" />, text: t('home.trust.ssl') },
    { icon: <Shield className="w-5 h-5" />, text: t('home.trust.gdpr') },
    { icon: <Users className="w-5 h-5" />, text: t('home.trust.applications') },
    { icon: <Star className="w-5 h-5" />, text: t('home.trust.rating') },
  ];

  const pricingFeatures = [
    t('home.pricing.feature1'),
    t('home.pricing.feature2'),
    t('home.pricing.feature3'),
    t('home.pricing.feature4'),
    t('home.pricing.feature5'),
    t('home.pricing.feature6'),
  ];

  const testimonials = [
    {
      name: 'Ahmed Al-Rashidi',
      country: 'Qatar',
      flag: '🇶🇦',
      rating: 5,
      text: 'The process was incredibly smooth. I had my ETA approved within 2 days. The team checked everything before submission — very reassuring.',
      date: 'March 2025',
    },
    {
      name: 'Sophie Marchand',
      country: 'France',
      flag: '🇫🇷',
      rating: 5,
      text: 'J\'avais peur que ce soit compliqué, mais le formulaire était très clair et le service en français est parfait. ETA reçu rapidement!',
      date: 'February 2025',
    },
    {
      name: 'Mehmet Yıldız',
      country: 'Turkey',
      flag: '🇹🇷',
      rating: 5,
      text: 'Çok hızlı ve güvenilir bir hizmet. Başvurumu 10 dakikada tamamladım ve 3 gün içinde ETA\'m onaylandı. Kesinlikle tavsiye ederim.',
      date: 'March 2025',
    },
    {
      name: 'Fatima Al-Sayed',
      country: 'UAE',
      flag: '🇦🇪',
      rating: 5,
      text: 'Excellent service. They reviewed my documents carefully and caught an issue with my passport photo before submitting. Saved me a lot of hassle.',
      date: 'January 2025',
    },
    {
      name: 'Ivan Petrov',
      country: 'Bulgaria',
      flag: '🇧🇬',
      rating: 5,
      text: 'Лесно и бързо! Формулярът е на български, което много помогна. Получих одобрение само за 2 дни. Препоръчвам!',
      date: 'April 2025',
    },
    {
      name: 'Khalid Al-Mansouri',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      rating: 5,
      text: 'Very professional service. The support team answered all my questions quickly. My family of four all got our ETAs without any issues.',
      date: 'February 2025',
    },
  ];

  const stats = [
    { value: '10,000+', label: t('home.stats.applicationsLabel') },
    { value: '98.3%',   label: t('home.stats.approvalLabel') },
    { value: '2.1 days',label: t('home.stats.timeLabel') },
    { value: '4.9 / 5', label: t('home.stats.ratingLabel') },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={buildWebsiteSchema(SITE_URL, SITE_NAME)} />
      <JsonLd data={buildServiceSchema(SITE_URL)} />
      <JsonLd data={buildFaqSchema(faqs.map((f) => ({ q: f.question, a: f.answer })))} />
      <JsonLd data={buildReviewSchema(SITE_URL)} />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/5 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/8 rounded-full blur-3xl opacity-40" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/25 mb-8">
                <Zap className="w-4 h-4 text-brand-accent" />
                <span className="text-brand-accent text-sm font-medium">{t('home.hero.badge')}</span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-brand-dark mb-6 leading-tight">
                {t('home.hero.title')}
                <span className="block text-brand-accent">{t('home.hero.titleAccent')}</span>
              </h1>

              <p className="text-xl md:text-2xl text-brand-light mb-10 max-w-2xl mx-auto">
                {t('home.hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link
                  href="/apply-for-eta"
                  className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group"
                >
                  {t('home.hero.applyBtn')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href="#how-it-works" className="btn-secondary text-lg px-8 py-4">
                  {t('home.hero.howBtn')}
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-6">
                {trustBadges.map((badge, index) => (
                  <div key={index} className="flex items-center gap-2 text-brand-muted text-sm">
                    <span className="text-brand-accent">{badge.icon}</span>
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-surface-elevated/60">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">
                {t('home.features.title')}
              </h2>
              <p className="text-brand-light text-lg max-w-2xl mx-auto">
                {t('home.features.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl bg-surface-card border border-brand-royal hover:border-brand-accent/40 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">{feature.title}</h3>
                  <p className="text-brand-light">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">
                {t('home.howItWorks.title')}
              </h2>
              <p className="text-brand-light text-lg max-w-2xl mx-auto">
                {t('home.howItWorks.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-brand-accent/40 to-transparent" />
                  )}
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 border border-brand-accent/25 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-display font-bold text-brand-accent">{step.number}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-brand-dark mb-2">{step.title}</h3>
                    <p className="text-brand-light text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-surface-elevated/60">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-50 border border-yellow-200 mb-4">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-yellow-700 text-sm font-medium">{t('home.reviews.badge')}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">
                {t('home.reviews.title')}
              </h2>
              <p className="text-brand-light text-lg max-w-2xl mx-auto">
                {t('home.reviews.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((review, index) => (
                <div
                  key={index}
                  className="bg-surface-card border border-brand-royal rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md hover:border-brand-accent/30 transition-all duration-300"
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-brand-light leading-relaxed flex-1">"{review.text}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-brand-royal/40">
                    <div className="w-9 h-9 rounded-full bg-brand-accent/10 flex items-center justify-center text-lg flex-shrink-0">
                      {review.flag}
                    </div>
                    <div>
                      <p className="text-brand-dark text-sm font-semibold">{review.name}</p>
                      <p className="text-brand-muted text-xs">{review.country} · {review.date}</p>
                    </div>
                    <div className="ml-auto">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-display font-bold text-brand-accent">{stat.value}</div>
                  <div className="text-brand-muted text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">
                  {t('home.pricing.title')}
                </h2>
                <p className="text-brand-light">{t('home.pricing.subtitle')}</p>
              </div>

              <div className="form-card p-8 text-center relative overflow-hidden">
                <div className="relative z-10">
                  <div className="text-brand-accent text-sm font-semibold mb-2 uppercase tracking-wide">
                    {t('home.pricing.packageName')}
                  </div>
                  <div className="flex items-baseline justify-center gap-1 mb-6">
                    <span className="text-5xl md:text-6xl font-display font-bold text-brand-dark">£79.00</span>
                    <span className="text-brand-muted">+ £2.50 processing</span>
                  </div>

                  <ul className="space-y-3 mb-8 text-left max-w-xs mx-auto">
                    {pricingFeatures.map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-brand-light">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/apply-for-eta"
                    className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2 group"
                  >
                    {t('home.pricing.cta')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <p className="text-brand-muted text-xs mt-4">{t('home.pricing.note')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-surface-elevated/60">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">
                  {t('home.faq.title')}
                </h2>
                <p className="text-brand-light">{t('home.faq.subtitle')}</p>
              </div>

              <div className="form-card p-6 md:p-8">
                {faqs.map((faq, index) => (
                  <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-4">
              {t('home.cta.title')}
            </h2>
            <p className="text-brand-light text-lg mb-8 max-w-xl mx-auto">
              {t('home.cta.subtitle')}
            </p>
            <Link
              href="/apply-for-eta"
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2 group"
            >
              {t('home.cta.button')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <LiveActivityToast />
    </div>
  );
}
