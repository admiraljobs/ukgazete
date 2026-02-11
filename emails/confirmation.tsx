import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components';
import * as React from 'react';

interface ConfirmationEmailProps {
  referenceNumber: string;
  applicantName: string;
  email: string;
  submittedAt: string;
  statusUrl: string;
}

export const ConfirmationEmail = ({
  referenceNumber = 'ETA-XXXXXX-XXXX',
  applicantName = 'John Smith',
  email = 'john@example.com',
  submittedAt = new Date().toLocaleDateString(),
  statusUrl = 'https://ukgazete.com/status',
}: ConfirmationEmailProps) => {
  const previewText = `Your UK ETA application ${referenceNumber} has been received`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Row>
              <Column style={{ width: '60px' }}>
                <table cellPadding="0" cellSpacing="0" style={logoBox}>
                  <tr>
                    <td style={logoCell}>
                      <Text style={logoText}>UK</Text>
                    </td>
                  </tr>
                </table>
              </Column>
              <Column>
                <Text style={headerTitle}>UK ETA Service</Text>
              </Column>
            </Row>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            {/* Success Icon */}
            <table cellPadding="0" cellSpacing="0" style={successIconTable}>
              <tr>
                <td style={successIconCell}>
                  <Text style={successIcon}>✓</Text>
                </td>
              </tr>
            </table>

            <Heading style={heading}>Application Received!</Heading>

            <Text style={paragraph}>Dear {applicantName},</Text>

            <Text style={paragraph}>
              Thank you for submitting your UK Electronic Travel Authorisation
              (ETA) application. We have received your payment and your
              application is now being processed.
            </Text>

            {/* Reference Box */}
            <Section style={referenceBox}>
              <Text style={referenceLabel}>Your Reference Number</Text>
              <Text style={referenceValue}>{referenceNumber}</Text>
              <Text style={referenceNote}>
                Please save this for your records
              </Text>
            </Section>

            {/* Application Details */}
            <Section style={detailsSection}>
              <Text style={detailsTitle}>Application Details</Text>
              <Hr style={divider} />

              <Row style={detailRow}>
                <Column>
                  <Text style={detailLabel}>Applicant</Text>
                </Column>
                <Column>
                  <Text style={detailValue}>{applicantName}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column>
                  <Text style={detailLabel}>Email</Text>
                </Column>
                <Column>
                  <Text style={detailValue}>{email}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column>
                  <Text style={detailLabel}>Submitted</Text>
                </Column>
                <Column>
                  <Text style={detailValue}>{submittedAt}</Text>
                </Column>
              </Row>

              <Row style={detailRow}>
                <Column>
                  <Text style={detailLabel}>Status</Text>
                </Column>
                <Column>
                  <Text style={statusBadge}>Paid – Awaiting Submission</Text>
                </Column>
              </Row>
            </Section>

            {/* What Happens Next */}
            <Section style={nextStepsSection}>
              <Text style={nextStepsTitle}>What Happens Next?</Text>

              <Row style={stepRow}>
                <Column style={{ width: '40px', verticalAlign: 'top' }}>
                  <table cellPadding="0" cellSpacing="0">
                    <tr>
                      <td style={stepNumberCell}>
                        <Text style={stepNumberText}>1</Text>
                      </td>
                    </tr>
                  </table>
                </Column>
                <Column style={{ verticalAlign: 'top' }}>
                  <Text style={stepTitle}>Review &amp; Verification</Text>
                  <Text style={stepDesc}>
                    Our team will review your application and documents within 24
                    hours.
                  </Text>
                </Column>
              </Row>

              <Row style={stepRow}>
                <Column style={{ width: '40px', verticalAlign: 'top' }}>
                  <table cellPadding="0" cellSpacing="0">
                    <tr>
                      <td style={stepNumberCell}>
                        <Text style={stepNumberText}>2</Text>
                      </td>
                    </tr>
                  </table>
                </Column>
                <Column style={{ verticalAlign: 'top' }}>
                  <Text style={stepTitle}>
                    Submission to UK Authorities
                  </Text>
                  <Text style={stepDesc}>
                    We&apos;ll submit your application to the UK Home Office on
                    your behalf.
                  </Text>
                </Column>
              </Row>

              <Row style={stepRow}>
                <Column style={{ width: '40px', verticalAlign: 'top' }}>
                  <table cellPadding="0" cellSpacing="0">
                    <tr>
                      <td style={stepNumberCell}>
                        <Text style={stepNumberText}>3</Text>
                      </td>
                    </tr>
                  </table>
                </Column>
                <Column style={{ verticalAlign: 'top' }}>
                  <Text style={stepTitle}>
                    Decision (Usually 3 Working Days)
                  </Text>
                  <Text style={stepDesc}>
                    You&apos;ll receive an email notification once a decision is
                    made.
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* CTA Button */}
            <Section style={ctaSection}>
              <Button style={button} href={statusUrl}>
                Check Application Status
              </Button>
            </Section>

            <Text style={paragraph}>
              If you have any questions, please don&apos;t hesitate to{' '}
              <Link href="https://ukgazete.com/contact" style={link}>
                contact our support team
              </Link>
              .
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              UK ETA Service | Electronic Travel Authorisation Assistance
            </Text>
            <Text style={footerDisclaimer}>
              This is an independent service and is not affiliated with the UK
              Government.
            </Text>
            <Hr style={footerDivider} />
            <Text style={footerLinks}>
              <Link href="https://ukgazete.com/privacy" style={footerLink}>
                Privacy Policy
              </Link>
              {' • '}
              <Link href="https://ukgazete.com/terms" style={footerLink}>
                Terms of Service
              </Link>
              {' • '}
              <Link href="https://ukgazete.com/contact" style={footerLink}>
                Contact Us
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ConfirmationEmail;

// ─── Styles ───────────────────────────────────────────────────

const main = {
  backgroundColor: '#0b0c10',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const header = {
  padding: '24px',
  borderBottom: '1px solid #1f2833',
};

const logoBox: React.CSSProperties = {
  width: '48px',
  height: '48px',
  backgroundColor: '#66fcf1',
  borderRadius: '12px',
};

const logoCell: React.CSSProperties = {
  width: '48px',
  height: '48px',
  textAlign: 'center',
  verticalAlign: 'middle',
};

const logoText = {
  color: '#0b0c10',
  fontSize: '18px',
  fontWeight: 'bold' as const,
  margin: '0',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: 'bold' as const,
  margin: '0',
  paddingLeft: '12px',
  lineHeight: '48px',
};

const content = {
  padding: '32px 24px',
};

const successIconTable: React.CSSProperties = {
  width: '64px',
  height: '64px',
  backgroundColor: 'rgba(34, 197, 94, 0.2)',
  borderRadius: '50%',
  margin: '0 auto 24px',
};

const successIconCell: React.CSSProperties = {
  width: '64px',
  height: '64px',
  textAlign: 'center',
  verticalAlign: 'middle',
};

const successIcon = {
  color: '#22c55e',
  fontSize: '32px',
  margin: '0',
};

const heading = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold' as const,
  textAlign: 'center' as const,
  margin: '0 0 24px',
};

const paragraph = {
  color: '#c5c6c7',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
};

const referenceBox = {
  backgroundColor: '#1f2833',
  borderRadius: '12px',
  padding: '24px',
  textAlign: 'center' as const,
  margin: '24px 0',
  border: '1px solid #66fcf1',
};

const referenceLabel = {
  color: '#66fcf1',
  fontSize: '12px',
  fontWeight: '600' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  margin: '0 0 8px',
};

const referenceValue = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold' as const,
  fontFamily: 'monospace',
  margin: '0 0 8px',
};

const referenceNote = {
  color: '#c5c6c7',
  fontSize: '12px',
  margin: '0',
};

const detailsSection = {
  backgroundColor: '#1f2833',
  borderRadius: '12px',
  padding: '20px',
  margin: '24px 0',
};

const detailsTitle = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600' as const,
  margin: '0 0 12px',
};

const divider = {
  borderColor: '#333',
  margin: '12px 0',
};

const detailRow = {
  margin: '8px 0',
};

const detailLabel = {
  color: '#888',
  fontSize: '14px',
  margin: '0',
};

const detailValue = {
  color: '#c5c6c7',
  fontSize: '14px',
  margin: '0',
  textAlign: 'right' as const,
};

const statusBadge = {
  color: '#eab308',
  fontSize: '14px',
  fontWeight: '600' as const,
  margin: '0',
  textAlign: 'right' as const,
};

const nextStepsSection = {
  margin: '32px 0',
};

const nextStepsTitle = {
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: '600' as const,
  margin: '0 0 20px',
};

const stepRow = {
  marginBottom: '16px',
};

const stepNumberCell: React.CSSProperties = {
  width: '28px',
  height: '28px',
  backgroundColor: 'rgba(102, 252, 241, 0.2)',
  borderRadius: '50%',
  textAlign: 'center',
  verticalAlign: 'middle',
};

const stepNumberText = {
  color: '#66fcf1',
  fontSize: '14px',
  fontWeight: 'bold' as const,
  margin: '0',
};

const stepTitle = {
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600' as const,
  margin: '0 0 4px',
};

const stepDesc = {
  color: '#888',
  fontSize: '13px',
  margin: '0',
  lineHeight: '18px',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#66fcf1',
  color: '#0b0c10',
  padding: '14px 28px',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  display: 'inline-block' as const,
};

const link = {
  color: '#66fcf1',
  textDecoration: 'underline',
};

const footer = {
  padding: '24px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#888',
  fontSize: '14px',
  margin: '0 0 8px',
};

const footerDisclaimer = {
  color: '#666',
  fontSize: '12px',
  margin: '0 0 16px',
};

const footerDivider = {
  borderColor: '#333',
  margin: '16px 0',
};

const footerLinks = {
  color: '#888',
  fontSize: '12px',
  margin: '0',
};

const footerLink = {
  color: '#888',
  textDecoration: 'none',
};
