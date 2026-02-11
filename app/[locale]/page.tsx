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

// FAQ Accordion Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-brand-royal/30 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-brand-light font-medium group-hover:text-brand-accent transition-colors pr-4">
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
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Quick Application',
      description: 'Complete your ETA application in under 10 minutes with our streamlined form.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure & Encrypted',
      description: '256-bit SSL encryption protects your personal data throughout the process.',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Multi-Language Support',
      description: 'Apply in English, Turkish, Arabic, or French - whatever suits you best.',
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6" />,
      title: 'Expert Support',
      description: 'Our team reviews every application and handles submission on your behalf.',
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: 'Document Check',
      description: 'We verify your documents before submission to avoid rejection.',
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: 'Flexible Payment',
      description: 'Pay securely with card, Apple Pay, or Google Pay.',
    },
  ];

  const steps = [
    { number: '01', title: 'Fill Application', description: 'Complete our simple online form with your details' },
    { number: '02', title: 'Upload Documents', description: 'Provide passport photo and selfie for verification' },
    { number: '03', title: 'Pay Securely', description: 'Complete payment via card, Apple Pay or Google Pay' },
    { number: '04', title: 'We Submit', description: 'Our experts review and submit to UK authorities' },
  ];

  const faqs = [
    {
      question: 'What is a UK ETA?',
      answer: 'The UK Electronic Travel Authorisation (ETA) is a digital travel permit required for visa-free visitors to the UK. It links to your passport electronically and must be obtained before travel.',
    },
    {
      question: 'Who needs a UK ETA?',
      answer: 'Nationals of countries that don\'t require a visa to visit the UK will need an ETA. This includes citizens from GCC countries, and will expand to EU citizens and others in 2025.',
    },
    {
      question: 'How long does the ETA last?',
      answer: 'A UK ETA is valid for 2 years or until your passport expires (whichever comes first). It allows multiple visits of up to 6 months each for tourism, business, or transit.',
    },
    {
      question: 'How long does approval take?',
      answer: 'Most ETA applications are processed within 3 working days. However, some applications may take longer if additional checks are required.',
    },
    {
      question: 'What\'s included in your service fee?',
      answer: 'Our fee covers application review, document verification, submission handling, status tracking, and customer support. The government ETA fee is separate and paid directly.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. We use 256-bit SSL encryption, comply with UK GDPR, and never share your data with third parties. Your information is deleted after your application is processed.',
    },
  ];

  const trustBadges = [
    { icon: <Lock className="w-5 h-5" />, text: '256-bit SSL' },
    { icon: <Shield className="w-5 h-5" />, text: 'GDPR Compliant' },
    { icon: <Users className="w-5 h-5" />, text: '10,000+ Applications' },
    { icon: <Star className="w-5 h-5" />, text: '4.9/5 Rating' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-accent/5 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-accent/10 rounded-full blur-3xl opacity-30" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 mb-8">
                <Zap className="w-4 h-4 text-brand-accent" />
                <span className="text-brand-accent text-sm font-medium">Fast & Secure ETA Service</span>
              </div>
              
              {/* Main Headline */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
                Get Your UK ETA
                <span className="block text-brand-accent">In Minutes</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-brand-light/70 mb-10 max-w-2xl mx-auto">
                Apply for your UK Electronic Travel Authorisation quickly and securely. 
                We handle the paperwork, you focus on your trip.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link 
                  href="/apply-for-eta"
                  className="btn-primary text-lg px-8 py-4 flex items-center gap-2 group"
                >
                  Start Application
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a 
                  href="#how-it-works"
                  className="btn-secondary text-lg px-8 py-4"
                >
                  How It Works
                </a>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6">
                {trustBadges.map((badge, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 text-brand-light/50 text-sm"
                  >
                    <span className="text-brand-muted">{badge.icon}</span>
                    <span>{badge.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-surface-card/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                Why Choose Our Service?
              </h2>
              <p className="text-brand-light/60 text-lg max-w-2xl mx-auto">
                We make the UK ETA application process simple, fast, and stress-free.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-2xl bg-surface-card/50 border border-brand-royal/30 hover:border-brand-muted/50 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/20 flex items-center justify-center text-brand-accent mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-brand-light/60">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                How It Works
              </h2>
              <p className="text-brand-light/60 text-lg max-w-2xl mx-auto">
                Four simple steps to get your UK ETA approved.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-brand-accent/50 to-transparent" />
                  )}
                  
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-2xl bg-brand-accent/20 border border-brand-accent/30 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-display font-bold text-brand-accent">{step.number}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-brand-light/60 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 bg-surface-card/30">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  Simple, Transparent Pricing
                </h2>
                <p className="text-brand-light/60">
                  One price, everything included. No hidden fees.
                </p>
              </div>
              
              <div className="form-card p-8 text-center relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <div className="text-brand-accent text-sm font-medium mb-2">ETA Service Package</div>
                  <div className="flex items-baseline justify-center gap-1 mb-6">
                    <span className="text-5xl md:text-6xl font-display font-bold text-white">£79.00</span>
                    <span className="text-brand-light/50">+ £2.50 processing</span>
                  </div>
                  
                  <ul className="space-y-3 mb-8 text-left max-w-xs mx-auto">
                    {[
                      'Full application assistance',
                      'Document verification',
                      'Expert review before submission',
                      'Status tracking & updates',
                      'Email support',
                      'Money-back if rejected due to our error',
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-brand-light/80">
                        <CheckCircle className="w-5 h-5 text-brand-accent flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    href="/apply-for-eta"
                    className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2 group"
                  >
                    Start Application Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  
                  <p className="text-brand-light/40 text-xs mt-4">
                    Government ETA fee (£10) paid separately during official processing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-brand-light/60">
                  Everything you need to know about the UK ETA.
                </p>
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
        <section className="py-20 bg-gradient-to-b from-surface-card/30 to-transparent">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Apply?
            </h2>
            <p className="text-brand-light/60 text-lg mb-8 max-w-xl mx-auto">
              Start your UK ETA application now and travel with confidence.
            </p>
            <Link 
              href="/apply-for-eta"
              className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-2 group"
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
