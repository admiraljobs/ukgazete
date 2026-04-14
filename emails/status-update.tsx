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

type StatusType = 'submitted' | 'approved' | 'refused';

interface StatusUpdateEmailProps {
  referenceNumber: string;
  applicantName: string;
  status: StatusType;
  updatedAt: string;
  statusUrl: string;
  additionalInfo?: string;
}

const statusConfig = {
  submitted: {
    title: 'Application Submitted to UK Authorities',
    icon: '📤',
    color: '#1d70b8',
    bgColor: 'rgba(29, 112, 184, 0.1)',
    message: 'Your UK ETA application has been submitted to the UK Home Office and is now being reviewed.',
    nextSteps: [
      'Your application is now being reviewed by UK authorities',
      'Most applications are processed within 3 working days',
      "We'll notify you immediately when a decision is made",
    ],
  },
  approved: {
    title: 'ETA Approved!',
    icon: '✓',
    color: '#16a34a',
    bgColor: 'rgba(22, 163, 74, 0.1)',
    message: 'Great news! Your UK Electronic Travel Authorisation (ETA) has been approved.',
    nextSteps: [
      'Your ETA is now linked electronically to your passport',
      'Valid for 2 years or until your passport expires — whichever comes first',
      'Allows multiple trips to the UK for stays of up to 6 months each',
      'No need to print anything — it is verified automatically at the border',
    ],
  },
  refused: {
    title: 'Application Update',
    icon: '!',
    color: '#dc2626',
    bgColor: 'rgba(220, 38, 38, 0.1)',
    message: 'We regret to inform you that your UK ETA application was not approved by UK authorities.',
    nextSteps: [
      'You may be eligible to apply for a standard UK visa instead',
      'Contact our support team for guidance on your options',
      'If you believe this was made in error, a new application can be submitted',
    ],
  },
};

export const StatusUpdateEmail = ({
  referenceNumber = 'ETA-XXXXXX-XXXX',
  applicantName = 'John Smith',
  status = 'submitted',
  updatedAt = new Date().toLocaleDateString(),
  statusUrl = 'https://ukgazete.com/status',
  additionalInfo,
}: StatusUpdateEmailProps) => {
  const cfg = statusConfig[status];
  const previewText = `UK ETA Update: ${cfg.title} — ${referenceNumber}`;

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

          {/* Main content */}
          <Section style={content}>

            {/* Status icon */}
            <table
              cellPadding="0"
              cellSpacing="0"
              style={{ ...statusIconTable, backgroundColor: cfg.bgColor }}
            >
              <tr>
                <td style={statusIconCell}>
                  <Text style={{ ...statusIconText, color: cfg.color }}>{cfg.icon}</Text>
                </td>
              </tr>
            </table>

            <Heading style={heading}>{cfg.title}</Heading>

            <Text style={paragraph}>Dear {applicantName},</Text>
            <Text style={paragraph}>{cfg.message}</Text>

            {/* Reference box */}
            <Section style={{ ...referenceBox, borderLeftColor: cfg.color }}>
              <Text style={referenceLabel}>Reference Number</Text>
              <Text style={referenceValue}>{referenceNumber}</Text>
              <Row style={{ marginTop: '12px' }}>
                <Column>
                  <Text style={detailSmall}>Status</Text>
                  <Text style={{ ...statusText, color: cfg.color }}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                </Column>
                <Column>
                  <Text style={{ ...detailSmall, textAlign: 'right' as const }}>Updated</Text>
                  <Text style={{ ...statusText, textAlign: 'right' as const, color: MUTED }}>
                    {updatedAt}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Additional info (refusal) */}
            {additionalInfo && (
              <Section style={infoBox}>
                <Text style={infoTitle}>Additional Information</Text>
                <Text style={infoText}>{additionalInfo}</Text>
              </Section>
            )}

            {/* Next steps / what this means */}
            <Section style={nextStepsSection}>
              <Text style={nextStepsTitle}>
                {status === 'approved' ? 'What This Means' : 'Next Steps'}
              </Text>
              {cfg.nextSteps.map((step, i) => (
                <Row key={i} style={stepRow}>
                  <Column style={{ width: '28px', verticalAlign: 'top' }}>
                    <Text style={{ ...bulletText, color: cfg.color }}>
                      {status === 'approved' ? '✓' : '•'}
                    </Text>
                  </Column>
                  <Column style={{ verticalAlign: 'top' }}>
                    <Text style={stepText}>{step}</Text>
                  </Column>
                </Row>
              ))}
            </Section>

            {/* Approved celebration box */}
            {status === 'approved' && (
              <Section style={successBox}>
                <Text style={successTitle}>You are all set to travel!</Text>
                <Text style={successText}>
                  Your ETA will be verified automatically when you check in for your flight
                  or arrive at the UK border. Have a wonderful trip!
                </Text>
              </Section>
            )}

            {/* CTA */}
            <Section style={ctaSection}>
              <Button style={{ ...buttonStyle, backgroundColor: cfg.color }} href={statusUrl}>
                View Full Application Details
              </Button>
            </Section>

            {/* Support box (refusal) */}
            {status === 'refused' && (
              <Section style={supportBox}>
                <Text style={supportTitle}>Need Help?</Text>
                <Text style={supportText}>
                  Our support team can help you understand your options and guide you through next steps.
                </Text>
                <Button style={supportButton} href="https://ukgazete.com/contact">
                  Contact Support
                </Button>
              </Section>
            )}

            <Text style={paragraph}>
              Questions?{' '}
              <Link href="https://ukgazete.com/contact" style={link}>Contact our support team</Link>.
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

export default StatusUpdateEmail;

// ─── Brand tokens ──────────────────────────────────────────────
const BLUE    = '#1d70b8';
const DARK    = '#0f172a';
const BODY    = '#334155';
const MUTED   = '#5b7fa6';
const BORDER  = '#dde6f0';
const BG      = '#f4f7fb';
const CARD    = '#ffffff';
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

const statusIconTable: React.CSSProperties = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  margin: '0 auto 20px',
};

const statusIconCell: React.CSSProperties = {
  width: '60px',
  height: '60px',
  textAlign: 'center',
  verticalAlign: 'middle',
};

const statusIconText = {
  fontSize: '28px',
  fontWeight: 'bold' as const,
  margin: '0',
};

const heading = {
  color: DARK,
  fontSize: '24px',
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
  borderLeftWidth: '4px',
  borderLeftStyle: 'solid' as const,
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
  fontSize: '24px',
  fontWeight: 'bold' as const,
  fontFamily: 'monospace',
  margin: '0',
  letterSpacing: '1px',
};

const detailSmall = {
  color: MUTED,
  fontSize: '11px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
  margin: '0',
};

const statusText = {
  fontSize: '14px',
  fontWeight: '600' as const,
  margin: '4px 0 0',
};

const infoBox = {
  backgroundColor: 'rgba(220, 38, 38, 0.05)',
  borderRadius: '10px',
  padding: '16px 20px',
  margin: '24px 0',
  borderLeft: '4px solid #dc2626',
};

const infoTitle = {
  color: '#dc2626',
  fontSize: '13px',
  fontWeight: '600' as const,
  margin: '0 0 6px',
};

const infoText = {
  color: BODY,
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

const nextStepsSection = { margin: '28px 0' };

const nextStepsTitle = {
  color: DARK,
  fontSize: '16px',
  fontWeight: '600' as const,
  margin: '0 0 14px',
};

const stepRow = { marginBottom: '10px' };

const bulletText = {
  fontSize: '16px',
  fontWeight: 'bold' as const,
  margin: '0',
};

const stepText = {
  color: BODY,
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
  paddingLeft: '6px',
};

const successBox = {
  backgroundColor: 'rgba(22, 163, 74, 0.06)',
  borderRadius: '10px',
  padding: '20px',
  margin: '24px 0',
  textAlign: 'center' as const,
  border: '1px solid rgba(22, 163, 74, 0.2)',
};

const successTitle = {
  color: '#16a34a',
  fontSize: '16px',
  fontWeight: '600' as const,
  margin: '0 0 8px',
};

const successText = {
  color: BODY,
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '28px 0',
};

const buttonStyle = {
  color: '#ffffff',
  padding: '13px 28px',
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  display: 'inline-block' as const,
};

const supportBox = {
  backgroundColor: ELEVATED,
  borderRadius: '10px',
  padding: '20px',
  margin: '24px 0',
  textAlign: 'center' as const,
  border: `1px solid ${BORDER}`,
};

const supportTitle = {
  color: DARK,
  fontSize: '15px',
  fontWeight: '600' as const,
  margin: '0 0 8px',
};

const supportText = {
  color: MUTED,
  fontSize: '13px',
  lineHeight: '20px',
  margin: '0 0 14px',
};

const supportButton = {
  backgroundColor: 'transparent',
  color: BLUE,
  padding: '10px 20px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600' as const,
  textDecoration: 'none',
  display: 'inline-block' as const,
  border: `1px solid ${BLUE}`,
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
