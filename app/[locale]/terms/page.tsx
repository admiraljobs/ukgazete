import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SITE_NAME, SITE_URL, buildAlternates } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${SITE_NAME} — the rules and conditions governing use of our UK ETA application service.`,
  metadataBase: new URL(SITE_URL),
  alternates: buildAlternates('/terms'),
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-dark mb-2">
              Terms of Service
            </h1>
            <p className="text-brand-muted text-sm mb-10">Last updated: January 2026</p>

            <div className="prose-brand">
              <h2>1. About Our Service</h2>
              <p>
                {SITE_NAME} ("{SITE_URL}") is an independent third-party service that assists individuals in
                preparing and submitting UK Electronic Travel Authorisation (ETA) applications. We are not
                affiliated with, endorsed by, or operated by the UK Government or UK Visas and Immigration (UKVI).
              </p>
              <p>
                You can also apply for a UK ETA directly and for free via the official UK Government website.
                Our service charges a fee for the convenience of expert review, guided application, and submission
                handling.
              </p>

              <h2>2. Eligibility</h2>
              <p>By using our service you confirm that:</p>
              <ul>
                <li>You are 18 years of age or older, or have parental/guardian consent</li>
                <li>You are legally entitled to apply for a UK ETA for yourself or on behalf of the applicant</li>
                <li>All information you provide is accurate and complete to the best of your knowledge</li>
              </ul>

              <h2>3. Our Service Includes</h2>
              <ul>
                <li>A guided online application form</li>
                <li>Document verification before submission</li>
                <li>Expert review of your completed application</li>
                <li>Submission of your application to UK authorities on your behalf</li>
                <li>Application status tracking and email updates</li>
                <li>Customer support via email</li>
              </ul>

              <h2>4. Fees & Payment</h2>
              <p>
                Our service fee is charged in addition to the UK Government's ETA fee (currently £10). The
                government fee is collected separately and paid directly to UK authorities as part of your
                application.
              </p>
              <p>
                All payments are processed securely through Stripe. By submitting payment, you authorise us to
                charge the stated amount. All fees are in GBP and are non-refundable except as described in
                Section 5.
              </p>

              <h2>5. Refund Policy</h2>
              <p>We offer a full refund of our service fee (not the government ETA fee) in the following cases:</p>
              <ul>
                <li>
                  <strong>Our error</strong>: if your application is refused due to a verifiable error made by
                  our team in preparing or submitting your application
                </li>
                <li>
                  <strong>Technical failure</strong>: if a technical error prevents your application from being
                  submitted after payment
                </li>
              </ul>
              <p>
                Refunds are <strong>not</strong> provided if your application is refused by UK authorities for
                reasons unrelated to our handling (e.g. background check results, passport issues, or
                information you provided). To request a refund, contact us within 30 days of the decision.
              </p>

              <h2>6. Accuracy of Information</h2>
              <p>
                You are solely responsible for the accuracy of all information submitted in your application.
                Providing false information to UK immigration authorities is a criminal offence. We are not liable
                for consequences arising from inaccurate information supplied by you.
              </p>

              <h2>7. No Guarantee of Approval</h2>
              <p>
                We cannot and do not guarantee that your UK ETA application will be approved. The decision rests
                entirely with UK Visas and Immigration. Our service improves the quality and completeness of your
                submission but cannot influence the outcome.
              </p>

              <h2>8. Processing Times</h2>
              <p>
                We aim to review and submit applications within 24 hours of payment. Most UK ETA decisions are
                made within 3 working days, but we have no control over UK Government processing times. We are
                not liable for travel disruption caused by processing delays.
              </p>

              <h2>9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, our total liability for any claim arising from use of our
                service is limited to the amount you paid for that specific application. We are not liable for
                indirect, consequential, or incidental damages.
              </p>

              <h2>10. Intellectual Property</h2>
              <p>
                All content on this website — including text, design, and code — is owned by or licensed to
                {SITE_NAME}. You may not reproduce, distribute, or create derivative works without our written
                permission.
              </p>

              <h2>11. Governing Law</h2>
              <p>
                These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the
                exclusive jurisdiction of the courts of England and Wales.
              </p>

              <h2>12. Changes to These Terms</h2>
              <p>
                We may update these Terms periodically. Continued use of the service after changes constitutes
                acceptance. Material changes will be notified by email.
              </p>

              <h2>13. Contact</h2>
              <p>
                For questions about these Terms: <a href="mailto:support@ukgazete.com">support@ukgazete.com</a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
