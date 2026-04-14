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
              <Column style={{ width: '56px' }}>
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
                <Text style={headerSubtitle}>Electronic Travel Authorisation</Text>
              </Column>
            </Row>
          </Section>

          {/* Main Content */}
          <Section style={content}>

            {/* Success badge */}
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
              Thank you for submitting your UK Electronic Travel Authorisation (ETA)
              application. We have received your payment and your application is now
              being reviewed by our team.
            </Text>

            {/* Reference box */}
            <Section style={referenceBox}>
              <Text style={referenceLabel}>Your Reference Number</Text>
              <Text style={referenceValue}>{referenceNumber}</Text>
              <Text style={referenceNote}>Keep this safe — you will need it to check your status</Text>
            </Section>

            {/* Details */}
            <Section style={detailsSection}>
              <Text style={detailsTitle}>Application Details</Text>
              <Hr style={divider} />
              <Row style={detailRow}>
                <Column><Text style={detailLabel}>Applicant</Text></Column>
                <Column><Text style={detailValue}>{applicantName}</Text></Column>
              </Row>
              <Row style={detailRow}>
                <Column><Text style={detailLabel}>Email</Text></Column>
                <Column><Text style={detailValue}>{email}</Text></Column>
              </Row>
              <Row style={detailRow}>
                <Column><Text style={detailLabel}>Submitted</Text></Column>
                <Column><Text style={detailValue}>{submittedAt}</Text></Column>
              </Row>
              <Row style={detailRow}>
                <Column><Text style={detailLabel}>Status</Text></Column>
                <Column><Text style={statusBadge}>Paid – Awaiting Review</Text></Column>
              </Row>
            </Section>

            {/* What happens next */}
            <Section style={nextStepsSection}>
              <Text style={nextStepsTitle}>What Happens Next?</Text>
              <Row style={stepRow}>
                <Column style={{ width: '40px', verticalAlign: 'top' }}>
                  <table cellPadding="0" cellSpacing="0">
                    <tr><td style={stepNumCell}><Text style={stepNumText}>1</Text></td></tr>
                  </table>
                </Column>
                <Column style={{ verticalAlign: 'top' }}>
                  <Text style={stepTitle}>Review &amp; Verification</Text>
                  <Text style={stepDesc}>Our team reviews your application and documents within 24 hours.</Text>
                </Column>
              </Row>
              <Row style={stepRow}>
                <Column style={{ width: '40px', verticalAlign: 'top' }}>
                  <table cellPadding="0" cellSpacing="0">
                    <tr><td style={stepNumCell}><Text style={stepNumText}>2</Text></td></tr>
                  </table>
                </Column>
                <Column style={{ verticalAlign: 'top' }}>
                  <Text style={stepTitle}>Submission to UK Authorities</Text>
                  <Text style={stepDesc}>We submit your application to the UK Home Office on your behalf.</Text>
                </Column>
              </Row>
              <Row style={stepRow}>
                <Column style={{ width: '40px', verticalAlign: 'top' }}>
                  <table cellPadding="0" cellSpacing="0">
                    <tr><td style={stepNumCell}><Text style={stepNumText}>3</Text></td></tr>
                  </table>
                </Column>
                <Column style={{ verticalAlign: 'top' }}>
                  <Text style={stepTitle}>Decision (Usually 3 Working Days)</Text>
                  <Text style={stepDesc}>You will receive an email once a decision is made by UK authorities.</Text>
                </Column>
              </Row>
            </Section>

            {/* CTA */}
            <Section style={ctaSection}>
              <Button style={button} href={statusUrl}>
                Check Application Status
              </Button>
            </Section>

            <Text style={paragraph}>
              If you have any questions, please{' '}
              <Link href="https://ukgazete.com/contact" style={link}>contact our support team</Link>.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={footerDivider} />
            <Text style={footerText}>UK ETA Service · Electronic Travel Authorisation Assistance</Text>
            <Text style={footerDisclaimer}>
              This is an independent service and is not affiliated with the UK Government.
            </Text>
            <Text style={footerLinks}>
              <Link href="https://ukgazete.com/privacy" style={footerLink}>Privacy Policy</Link>
              {' · '}
              <Link href="https://ukgazete.com/terms" style={footerLink}>Terms of Service</Link>
              {' · '}
              <Link href="https://ukgazete.com/contact" style={footerLink}>Contact Us</Link>
            </Text>
          </Section>

        </Container>
      </Body>
    </Html>
  );
};

export default ConfirmationEmail;

// ─── Brand tokens ──────────────────────────────────────────────
const BLUE   = '#1d70b8';
const NAVY   = '#1e3a5f';
const DARK   = '#0f172a';
const BODY   = '#334155';
const MUTED  = '#5b7fa6';
const BORDER = '#dde6f0';
const BG     = '#f4f7fb';
const CARD   = '#ffffff';
const ELEVATED = '#eef2f8';

// ─── Styles ────────────────────────────────────────────────────

const main = {
  backgroundColor: BG,
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '32px 0 48px',
  maxWidth: '600px',
};

const header = {
  backgroundColor: CARD,
  padding: '24px 28px',
  borderBottom: `2px solid ${BLUE}`,
  borderRadius: '12px 12px 0 0',
};

const logoBox: React.CSSProperties = {
  width: '48px',
  height: '48px',
  backgroundColor: BLUE,
  borderRadius: '10px',
};

const logoCell: React.CSSProperties = {
  width: '48px',
  height: '48px',
  textAlign: 'center',
  verticalAlign: 'middle',
};

const logoText = {
  color: '#ffffff',
  fontSize: '17px',
  fontWeight: 'bold' as const,
  margin: '0',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: DARK,
  fontSize: '18px',
  fontWeight: 'bold' as const,
  margin: '0 0 2px',
  paddingLeft: '14px',
  lineHeight: '1.2',
};

const headerSubtitle = {
  color: MUTED,
  fontSize: '13px',
  margin: '0',
  paddingLeft: '14px',
};

const content = {
  backgroundColor: CARD,
  padding: '32px 28px',
};

const successIconTable: React.CSSProperties = {
  width: '60px',
  height: '60px',
  backgroundColor: 'rgba(29, 112, 184, 0.1)',
  borderRadius: '50%',
  margin: '0 auto 20px',
};

const successIconCell: React.CSSProperties = {
  width: '60px',
  height: '60px',
  textAlign: 'center',
  verticalAlign: 'middle',
};

const successIcon = {
  color: BLUE,
  fontSize: '28px',
  margin: '0',
  fontWeight: 'bold' as const,
};

const heading = {
  color: DARK,
  fontSize: '26px',
  fontWeight: 'bold' as const,
  textAlign: 'center' as const,
  margin: '0 0 24px',
};

const paragraph = {
  color: BODY,
  fontSize: '15px',
  lineHeight: '24px',
  margin: '0 0 16px',
};

const referenceBox = {
  backgroundColor: ELEVATED,
  borderRadius: '10px',
  padding: '20px 24px',
  textAlign: 'center' as const,
  margin: '24px 0',
  borderLeft: `4px solid ${BLUE}`,
};

const referenceLabel = {
  color: MUTED,
  fontSize: '11px',
  fontWeight: '600' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  margin: '0 0 8px',
};

const referenceValue = {
  color: DARK,
  fontSize: '26px',
  fontWeight: 'bold' as const,
  fontFamily: 'monospace',
  margin: '0 0 6px',
  letterSpacing: '1px',
};

const referenceNote = {
  color: MUTED,
  fontSize: '12px',
  margin: '0',
};

const detailsSection = {
  backgroundColor: ELEVATED,
  borderRadius: '10px',
  padding: '20px',
  margin: '24px 0',
};

const detailsTitle = {
  color: DARK,
  fontSize: '14px',
  fontWeight: '600' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0 0 10px',
};

const divider = {
  borderColor: BORDER,
  margin: '10px 0 14px',
};

const detailRow = { margin: '6px 0' };

const detailLabel = {
  color: MUTED,
  fontSize: '13px',
  margin: '0',
};

const detailValue = {
  color: BODY,
  fontSize: '13px',
  margin: '0',
  textAlign: 'right' as const,
};

const statusBadge = {
  color: '#ca8a04',
  fontSize: '13px',
  fontWeight: '600' as const,
  margin: '0',
  textAlign: 'right' as const,
};

const nextStepsSection = { margin: '28px 0' };

const nextStepsTitle = {
  color: DARK,
  fontSize: '16px',
  fontWeight: '600' as const,
  margin: '0 0 16px',
};

const stepRow = { marginBottom: '14px' };

const stepNumCell: React.CSSProperties = {
  width: '28px',
  height: '28px',
  backgroundColor: ELEVATED,
  borderRadius: '50%',
  textAlign: 'center',
  verticalAlign: 'middle',
  border: `1px solid ${BORDER}`,
};

const stepNumText = {
  color: BLUE,
  fontSize: '13px',
  fontWeight: 'bold' as const,
  margin: '0',
};

const stepTitle = {
  color: DARK,
  fontSize: '14px',
  fontWeight: '600' as const,
  margin: '0 0 3px',
  paddingLeft: '12px',
};

const stepDesc = {
  color: MUTED,
  fontSize: '13px',
  margin: '0',
  lineHeight: '18px',
  paddingLeft: '12px',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '28px 0',
};

const button = {
  backgroundColor: BLUE,
  color: '#ffffff',
  padding: '13px 28px',
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  display: 'inline-block' as const,
};

const link = {
  color: BLUE,
  textDecoration: 'underline',
};

const footer = {
  backgroundColor: CARD,
  padding: '20px 28px 28px',
  borderRadius: '0 0 12px 12px',
  textAlign: 'center' as const,
};

const footerDivider = {
  borderColor: BORDER,
  margin: '0 0 16px',
};

const footerText = {
  color: MUTED,
  fontSize: '13px',
  margin: '0 0 6px',
};

const footerDisclaimer = {
  color: '#94a3b8',
  fontSize: '11px',
  margin: '0 0 14px',
};

const footerLinks = {
  color: MUTED,
  fontSize: '12px',
  margin: '0',
};

const footerLink = {
  color: MUTED,
  textDecoration: 'none',
};
