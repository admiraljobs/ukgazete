'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Shield, Users, Award, Globe, ArrowRight, CheckCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  const t = useTranslations();

  const values = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Security First',
      description: 'Your data is protected with bank-level encryption. We never share your information with third parties.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Customer Focused',
      description: 'We\'re here to make your travel easier. Our team personally reviews every application.',
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Excellence',
      description: 'We strive for the highest standards in everything we do, from our technology to our customer service.',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Accessibility',
      description: 'Our service is available in multiple languages to serve travelers from around the world.',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Applications Processed' },
    { number: '99.2%', label: 'Approval Rate' },
    { number: '4.9/5', label: 'Customer Rating' },
    { number: '24hrs', label: 'Avg. Processing Time' },
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
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                About UK ETA Service
              </h1>
              <p className="text-xl text-brand-light/70 leading-relaxed">
                We're a dedicated team helping travelers navigate the UK's Electronic Travel 
                Authorisation system with ease and confidence.
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
              <h2 className="text-3xl font-display font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-brand-light/70 leading-relaxed">
                <p>
                  When the UK announced its new Electronic Travel Authorisation requirement, 
                  we saw an opportunity to help. Many travelers found the official process 
                  confusing, especially those unfamiliar with UK government websites or 
                  non-native English speakers.
                </p>
                <p>
                  We built this service to bridge that gap. Our team combines expertise in 
                  immigration processes with modern technology to create a smooth, guided 
                  experience that takes the stress out of applying.
                </p>
                <p>
                  Every application is personally reviewed by our team before submission, 
                  ensuring accuracy and completeness. We catch potential issues before they 
                  become problems, giving you the best chance of approval.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-20 bg-surface-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-display font-bold text-white mb-4">Our Values</h2>
                <p className="text-brand-light/60">What drives us every day.</p>
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
                    <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
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
              <h2 className="text-3xl font-display font-bold text-white mb-6">What We Do</h2>
              
              <ul className="space-y-4">
                {[
                  'Guide you through every step of the ETA application process',
                  'Verify your documents for accuracy and completeness',
                  'Submit your application to UK authorities on your behalf',
                  'Track your application status and keep you informed',
                  'Provide support if any issues arise',
                  'Offer refunds if your application is rejected due to our error',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0 mt-0.5" />
                    <span className="text-brand-light/80">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 p-6 rounded-2xl bg-brand-accent/10 border border-brand-accent/20">
                <h3 className="text-lg font-semibold text-brand-accent mb-2">Important Note</h3>
                <p className="text-brand-light/70 text-sm">
                  We are an independent service and not affiliated with the UK Government. 
                  We provide assistance with ETA applications for a service fee. You can also 
                  apply directly through the official UK Government website.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-surface-card/30">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-brand-light/60 mb-8 max-w-xl mx-auto">
              Let us help you with your UK ETA application today.
            </p>
            <Link 
              href="/apply-for-eta"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center gap-2 group"
            >
              Start Application
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
