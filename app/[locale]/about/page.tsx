'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Shield, Users, Award, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  const t = useTranslations();

  const values = [
    { icon: <Shield className="w-6 h-6" />, title: t('about.values.security.title'), description: t('about.values.security.desc') },
    { icon: <Users className="w-6 h-6" />, title: t('about.values.customer.title'), description: t('about.values.customer.desc') },
    { icon: <Award className="w-6 h-6" />, title: t('about.values.excellence.title'), description: t('about.values.excellence.desc') },
    { icon: <Globe className="w-6 h-6" />, title: t('about.values.accessibility.title'), description: t('about.values.accessibility.desc') },
  ];

  const stats = [
    { number: '10,000+', label: t('about.stats.applications') },
    { number: '99.2%',   label: t('about.stats.approvalRate') },
    { number: '4.9/5',   label: t('about.stats.rating') },
    { number: '24hrs',   label: t('about.stats.processing') },
  ];

  const whatWeDoItems = [
    t('about.whatWeDo.item1'),
    t('about.whatWeDo.item2'),
    t('about.whatWeDo.item3'),
    t('about.whatWeDo.item4'),
    t('about.whatWeDo.item5'),
    t('about.whatWeDo.item6'),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/5 via-transparent to-transparent" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-dark mb-6">
                {t('about.hero.title')}
              </h1>
              <p className="text-xl text-brand-light/70 leading-relaxed">
                {t('about.hero.subtitle')}
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-surface-card/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-display font-bold text-brand-accent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-brand-light/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-brand-dark mb-6">
                {t('about.story.title')}
              </h2>
              <div className="space-y-4 text-brand-light/70 leading-relaxed">
                <p>{t('about.story.p1')}</p>
                <p>{t('about.story.p2')}</p>
                <p>{t('about.story.p3')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-20 bg-surface-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold text-brand-dark mb-4">
                  {t('about.values.title')}
                </h2>
                <p className="text-brand-light/60">{t('about.values.subtitle')}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-surface-card/50 border border-brand-royal/30"
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-accent/20 flex items-center justify-center text-brand-accent mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-brand-dark mb-2">{value.title}</h3>
                    <p className="text-brand-light/60">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-display font-bold text-brand-dark mb-6">
                {t('about.whatWeDo.title')}
              </h2>

              <ul className="space-y-4">
                {whatWeDoItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                    <span className="text-brand-light/80">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 p-6 rounded-2xl bg-brand-accent/10 border border-brand-accent/20">
                <h3 className="text-lg font-semibold text-brand-accent mb-2">
                  {t('about.whatWeDo.noteTitle')}
                </h3>
                <p className="text-brand-light/70 text-sm">
                  {t('about.whatWeDo.noteText')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-surface-card/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-brand-dark mb-4">
              {t('about.cta.title')}
            </h2>
            <p className="text-brand-light/60 mb-8 max-w-xl mx-auto">
              {t('about.cta.subtitle')}
            </p>
            <Link
              href="/apply-for-eta"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 group"
            >
              {t('about.cta.button')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
