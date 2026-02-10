import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is not set');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'UK ETA Service <noreply@uketa-service.com>';

// Email types for different notifications
export type EmailType = 'confirmation' | 'submitted' | 'approved' | 'refused';

export interface SendEmailParams {
  to: string;
  type: EmailType;
  data: {
    referenceNumber: string;
    applicantName: string;
    email: string;
    submittedAt?: string;
    [key: string]: any;
  };
}
