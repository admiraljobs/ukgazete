import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
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
  statusUrl = 'https://uketa-service.com/status',
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
              <Column>
                <div style={logoBox}>
                  <Text style={logoText}>UK</Text>
                </div>
              </Column>
              <Column>
                <Text style={headerTitle}>UK ETA Service</Text>
              </Column>
            </Row>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            {/* Success Icon */}
            <div style={successIconContainer}>
              <Text style={successIcon}>✓</Text>
            </div>

            <Heading style={heading}>Application Received!</Heading>
            
            <Text style={paragraph}>
              Dear {applicantName},
            </Text>
            
            <Text style={paragraph}>
              Thank you for submitting your UK Electronic Travel Authorisation (ETA) application. 
              We have received your payment and your application is now being processed.
            </Text>

            {/* Reference Box */}
            <Section style={referenceBox}>
              <Text style={referenceLabel}>Your Reference Number</Text>
              <Text style={referenceValue}>{referenceNumber}</Text>
              <Text style={referenceNote}>Please save this for your records</Text>
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
                  <Text style={statusBadge}>Paid - Awaiting Submission</Text>
                </Column>
              </Row>
            </Section>

            {/* What Happens Next */}
            <Section style={nextStepsSection}>
              <Text style={nextStepsTitle}>What Happens Next?</Text>
              
              <div style={stepItem}>
                <Text style={stepNumber}>1</Text>
                <div>
                  <Text style={stepTitle}>Review & Verification</Text>
                  <Text style={stepDesc}>Our team will review your application and documents within 24 hours.</Text>
                </div>
              </div>
              
              <div style={stepItem}>
                <Text style={stepNumber}>2</Text>
                <div>
                  <Text style={stepTitle}>Submission to UK Authorities</Text>
                  <Text style={stepDesc}>We'll submit your application to the UK Home Office on your behalf.</Text>
                </div>
              </div>
              
              <div style={stepItem}>
                <Text style={stepNumber}>3</Text>
                <div>
                  <Text style={stepTitle}>Decision (Usually 3 Working Days)</Text>
                  <Text style={stepDesc}>You'll receive an email notification once a decision is made.</Text>
                </div>
              </div>
            </Section>

            {/* CTA Button */}
            <Section style={ctaSection}>
              <Button style={button} href={statusUrl}>
                Check Application Status
              </Button>
            </Section>

            <Text style={paragraph}>
              If you have any questions, please don't hesitate to{' '}
              <Link href="https://uketa-service.com/contact" style={link}>
                contact our support team
              </Link>.
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              UK ETA Service | Electronic Travel Authorisation Assistance
            </Text>
            <Text style={footerDisclaimer}>
              This is an independent service and is not affiliated with the UK Government.
            </Text>
            <Hr style={footerDivider} />
            <Text style={footerLinks}>
              <Link href="https://uketa-service.com/privacy" style={footerLink}>Privacy Policy</Link>
              {' • '}
              <Link href="https://uketa-service.com/terms" style={footerLink}>Terms of Service</Link>
              {' • '}
              <Link href="https://uketa-service.com/contact" style={footerLink}>Contact Us</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ConfirmationEmail;

// Styles
const main = {
  backgroundColor: '#0b0c10',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
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

const logoBox = {
  width: '48px',
  height: '48px',
  backgroundColor: '#66fcf1',
  borderRadius: '12px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const logoText = {
  color: '#0b0c10',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
  lineHeight: '48px',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0',
  paddingLeft: '12px',
  lineHeight: '48px',
};

const content = {
  padding: '32px 24px',
};

const successIconContainer = {
  width: '64px',
  height: '64px',
  backgroundColor: 'rgba(34, 197, 94, 0.2)',
  borderRadius: '50%',
  margin: '0 auto 24px',
  textAlign: 'center' as const,
};

const successIcon = {
  color: '#22c55e',
  fontSize: '32px',
  lineHeight: '64px',
  margin: '0',
};

const heading = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
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
  fontWeight: '600',
  textTransform: 'uppercase' as const,
  letterSpacing: '1px',
  margin: '0 0 8px',
};

const referenceValue = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
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
  fontWeight: '600',
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
  fontWeight: '600',
  margin: '0',
  textAlign: 'right' as const,
};

const nextStepsSection = {
  margin: '32px 0',
};

const nextStepsTitle = {
  color: '#ffffff',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 20px',
};

const stepItem = {
  display: 'flex',
  marginBottom: '16px',
};

const stepNumber = {
  width: '28px',
  height: '28px',
  backgroundColor: 'rgba(102, 252, 241, 0.2)',
  color: '#66fcf1',
  borderRadius: '50%',
  fontSize: '14px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  lineHeight: '28px',
  marginRight: '12px',
  flexShrink: 0,
};

const stepTitle = {
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600',
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
  fontWeight: 'bold',
  textDecoration: 'none',
  display: 'inline-block',
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
