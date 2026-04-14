import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { referenceNumber, email } = body;

    if (!referenceNumber || typeof referenceNumber !== 'string') {
      return NextResponse.json(
        { error: 'Reference number is required' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    // Reference number is the Firestore document ID
    const doc = await adminDb
      .collection('eta-applications')
      .doc(referenceNumber.trim().toUpperCase())
      .get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: 'Application not found. Please check your reference number and email.' },
        { status: 404 }
      );
    }

    const data = doc.data()!;

    // Verify email matches — prevents fishing for other people's applications
    if (data.email?.toLowerCase() !== email.trim().toLowerCase()) {
      return NextResponse.json(
        { error: 'Application not found. Please check your reference number and email.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      referenceNumber: data.referenceNumber,
      status: data.status,
      submittedAt: data.submittedAt,
      updatedAt: data.updatedAt,
      applicantName: `${data.firstName || ''} ${data.lastName || ''}`.trim() || undefined,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to retrieve application status';
    console.error('Check status error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
