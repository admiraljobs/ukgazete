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
    title: 'Application Submitted',
    icon: '📤',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.2)',
    message:
      'Your UK ETA application has been submitted to the UK Home Office.',
    nextSteps: [
      'Your application is now being reviewed by UK authorities',
      'Most applications are processed within 3 working days',
      "We'll notify you immediately when a decision is made",
    ],
  },
  approved: {
    title: 'Application Approved! 🎉',
    icon: '✓',
    color: '#22c55e',
    bgColor: 'rgba(34, 197, 94, 0.2)',
    message:
      'Great news! Your UK Electronic Travel Authorisation has been approved.',
    nextSteps: [
      'Your ETA is now linked to your passport electronically',
      'Valid for 2 years or until your passport expires',
      'Allows multiple entries for stays up to 6 months each',
      "No need to print anything — it's all digital",
    ],
  },
  refused: {
    title: 'Application Update',
    icon: '!',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.2)',
    message:
      'We regret to inform you that your UK ETA application was not approved.',
    nextSteps: [
      'You may be eligible to apply for a standard UK visa instead',
      'Contact our support team for guidance on next steps',
      'If you believe this was an error, you can submit a new application',
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
  const config = statusConfig[status];
  const previewText = `UK ETA Update: ${config.title} - ${referenceNumber}`;

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
            {/* Status Icon */}
            <table
              cellPadding="0"
              cellSpacing="0"
              style={{
                ...statusIconTable,
                backgroundColor: config.bgColor,
              }}
            >
              <tr>
                <td
                  style={{
                    ...statusIconCell,
                    color: config.color,
                  }}
                >
                  <Text
                    style={{
                      ...statusIconText,
                      color: config.color,
                    }}
                  >
                    {config.icon}
                  </Text>
                </td>
              </tr>
            </table>

            <Heading style={heading}>{config.title}</Heading>

            <Text style={paragraph}>Dear {applicantName},</Text>

            <Text style={paragraph}>{config.message}</Text>

            {/* Reference Box */}
            <Section
              style={{
                ...referenceBox,
                borderColor: config.color,
              }}
            >
              <Text style={referenceLabel}>Reference Number</Text>
              <Text style={referenceValue}>{referenceNumber}</Text>
              <Row style={{ marginTop: '12px' }}>
                <Column>
                  <Text style={detailSmall}>Status</Text>
                  <Text
                    style={{
                      ...statusText,
                      color: config.color,
                    }}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Text>
                </Column>
                <Column>
                  <Text
                    style={{
                      ...detailSmall,
                      textAlign: 'right' as const,
                    }}
                  >
                    Updated
                  </Text>
                  <Text
                    style={{
                      ...statusText,
                      textAlign: 'right' as const,
                      color: '#c5c6c7',
                    }}
                  >
                    {updatedAt}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Additional Info (if refused) */}
            {additionalInfo && (
              <Section style={infoBox}>
                <Text style={infoTitle}>Additional Information</Text>
                <Text style={infoText}>{additionalInfo}</Text>
              </Section>
            )}

            {/* Next Steps */}
            <Section style={nextStepsSection}>
              <Text style={nextStepsTitle}>
                {status === 'approved' ? 'What This Means' : 'Next Steps'}
              </Text>

              {config.nextSteps.map((step, index) => (
                <Row key={index} style={stepRow}>
                  <Column style={{ width: '28px', verticalAlign: 'top' }}>
                    <Text
                      style={{
                        ...bulletText,
                        color: config.color,
                      }}
                    >
                      {status === 'approved' ? '✓' : '•'}
                    </Text>
                  </Column>
                  <Column style={{ verticalAlign: 'top' }}>
                    <Text style={stepText}>{step}</Text>
                  </Column>
                </Row>
              ))}
            </Section>

            {/* Special message for approved */}
            {status === 'approved' && (
              <Section style={successBox}>
                <Text style={successTitle}>🎉 You&apos;re all set!</Text>
                <Text style={successText}>
                  Your ETA will be automatically verified when you check in for
                  your flight or arrive at the UK border. Have a wonderful trip!
                </Text>
              </Section>
            )}

            {/* CTA Button */}
            <Section style={ctaSection}>
              <Button
                style={{
                  ...buttonStyle,
                  backgroundColor: config.color,
                }}
                href={statusUrl}
              >
                View Full Details
              </Button>
            </Section>

            {/* Support note for refused */}
            {status === 'refused' && (
              <Section style={supportBox}>
                <Text style={supportTitle}>Need Help?</Text>
                <Text style={supportText}>
                  Our support team is here to help you understand your options
                  and guide you through the next steps.
                </Text>
                <Button
                  style={supportButton}
                  href="https://ukgazete.com/contact"
                >
                  Contact Support
                </Button>
              </Section>
            )}

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

export default StatusUpdateEmail;

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

const statusIconTable: React.CSSProperties = {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  margin: '0 auto 24px',
};

const statusIconCell: React.CSSProperties = {
  width: '64px',
  height: '64px',
  textAlign: 'center',
  verticalAlign: 'middle',
};

const statusIconText = {
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
  borderWidth: '1px',
  borderStyle: 'solid' as const,
};

const referenceLabel = {
  color: '#888',
  fontSize: '12px',
  fontWeight: '600' as const,
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  margin: '0 0 8px',
};

const referenceValue = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold' as const,
  fontFamily: 'monospace',
  margin: '0',
};

const detailSmall = {
  color: '#666',
  fontSize: '11px',
  textTransform: 'uppercase' as const,
  margin: '0',
};

const statusText = {
  fontSize: '14px',
  fontWeight: '600' as const,
  margin: '4px 0 0',
};

const infoBox = {
  backgroundColor: 'rgba(239, 68, 68, 0.1)',
  borderRadius: '12px',
  padding: '16px',
  margin: '24px 0',
  borderLeft: '4px solid #ef4444',
};

const infoTitle = {
  color: '#ef4444',
  fontSize: '14px',
  fontWeight: '600' as const,
  margin: '0 0 8px',
};

const infoText = {
  color: '#c5c6c7',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

const nextStepsSection = {
  margin: '32px 0',
};

const nextStepsTitle = {
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: '600' as const,
  margin: '0 0 16px',
};

const stepRow = {
  marginBottom: '12px',
};

const bulletText = {
  fontSize: '16px',
  margin: '0',
};

const stepText = {
  color: '#c5c6c7',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

const successBox = {
  backgroundColor: 'rgba(34, 197, 94, 0.1)',
  borderRadius: '12px',
  padding: '20px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const successTitle = {
  color: '#22c55e',
  fontSize: '18px',
  fontWeight: '600' as const,
  margin: '0 0 8px',
};

const successText = {
  color: '#c5c6c7',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

const ctaSection = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const buttonStyle = {
  color: '#0b0c10',
  padding: '14px 28px',
  borderRadius: '8px',
  fontSize: '16px',
  fontWeight: 'bold' as const,
  textDecoration: 'none',
  display: 'inline-block' as const,
};

const supportBox = {
  backgroundColor: '#1f2833',
  borderRadius: '12px',
  padding: '20px',
  margin: '24px 0',
  textAlign: 'center' as const,
};

const supportTitle = {
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600' as const,
  margin: '0 0 8px',
};

const supportText = {
  color: '#888',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 16px',
};

const supportButton = {
  backgroundColor: 'transparent',
  color: '#66fcf1',
  padding: '10px 20px',
  borderRadius: '8px',
  fontSize: '14px',
  fontWeight: '600' as const,
  textDecoration: 'none',
  display: 'inline-block' as const,
  border: '1px solid #66fcf1',
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
