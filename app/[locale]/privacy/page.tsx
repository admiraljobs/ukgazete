import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE_NAME, SITE_URL, buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${SITE_NAME} — how we collect, use, and protect your personal data.`,
  metadataBase: new URL(SITE_URL),
  alternates: buildAlternates('/privacy'),
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-2">
              Privacy Policy
            </h1>
            <p className="text-brand-muted text-sm mb-10">Last updated: January 2026</p>

            <div className="prose-brand">
              <h2>1. Who We Are</h2>
              <p>
                UK ETA Service ("{SITE_NAME}") operates the website at {SITE_URL}. We provide assistance with UK
                Electronic Travel Authorisation (ETA) applications. We are an independent third-party service and
                are not affiliated with the UK Government.
              </p>

              <h2>2. Data We Collect</h2>
              <p>To process your ETA application, we collect the following personal data:</p>
              <ul>
                <li>Full name, date of birth, gender, and nationality</li>
                <li>Passport number, issue date, expiry date, and issuing authority</li>
                <li>Country of birth and country of residence</li>
                <li>Residential address</li>
                <li>Email address and phone number</li>
                <li>Passport photo page image and face photo (selfie)</li>
                <li>Responses to background questions (criminal, immigration, terrorism)</li>
                <li>Payment information (processed by Stripe — we do not store card details)</li>
              </ul>

              <h2>3. How We Use Your Data</h2>
              <p>We use your personal data exclusively for:</p>
              <ul>
                <li>Processing and submitting your UK ETA application to UK authorities</li>
                <li>Communicating with you about your application status</li>
                <li>Responding to customer support enquiries</li>
                <li>Complying with legal obligations</li>
              </ul>
              <p>We do not use your data for marketing without your explicit consent, and we never sell your data to third parties.</p>

              <h2>4. Legal Basis for Processing</h2>
              <p>We process your data under the following legal bases (UK GDPR):</p>
              <ul>
                <li><strong>Contract performance</strong>: to deliver the service you have purchased</li>
                <li><strong>Legal obligation</strong>: where required by law</li>
                <li><strong>Legitimate interests</strong>: for fraud prevention and service improvement</li>
              </ul>

              <h2>5. Data Sharing</h2>
              <p>Your data is shared only with:</p>
              <ul>
                <li><strong>UK Home Office / UKVI</strong>: to submit your ETA application</li>
                <li><strong>Stripe</strong>: to process payments (subject to Stripe's privacy policy)</li>
                <li><strong>Resend</strong>: to send transactional emails</li>
                <li><strong>Firebase / Google Cloud</strong>: for secure data storage</li>
              </ul>
              <p>All third-party processors are contractually bound to protect your data.</p>

              <h2>6. Data Retention</h2>
              <p>
                We retain your application data for up to 12 months after your application is processed. Passport
                images and face photos are deleted from our systems within 30 days of the final decision. You may
                request earlier deletion (see Section 8).
              </p>

              <h2>7. Data Security</h2>
              <p>
                We protect your data using 256-bit SSL/TLS encryption in transit and AES-256 encryption at rest.
                Access to personal data is restricted to authorised personnel only. Document images are stored in
                private cloud storage with signed URL access — they are never publicly accessible.
              </p>

              <h2>8. Your Rights</h2>
              <p>Under UK GDPR, you have the right to:</p>
              <ul>
                <li><strong>Access</strong>: request a copy of the data we hold about you</li>
                <li><strong>Rectification</strong>: request correction of inaccurate data</li>
                <li><strong>Erasure</strong>: request deletion of your data ("right to be forgotten")</li>
                <li><strong>Restriction</strong>: request that we limit processing of your data</li>
                <li><strong>Portability</strong>: receive your data in a machine-readable format</li>
                <li><strong>Objection</strong>: object to processing based on legitimate interests</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{' '}
                <a href="mailto:privacy@ukgazete.com">privacy@ukgazete.com</a>. We will respond within 30 days.
              </p>

              <h2>9. Cookies</h2>
              <p>
                We use essential cookies only — for session management and security (Cloudflare Turnstile). We do
                not use advertising or tracking cookies. You can disable cookies in your browser settings, but this
                may affect site functionality.
              </p>

              <h2>10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Material changes will be notified by email to
                active applicants. Continued use of the service after changes constitutes acceptance of the updated
                policy.
              </p>

              <h2>11. Contact</h2>
              <p>
                For privacy-related enquiries: <a href="mailto:privacy@ukgazete.com">privacy@ukgazete.com</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
