# UK ETA Application Service

A modern, multi-step form application for UK Electronic Travel Authorisation (ETA) submissions.

## Features

- 🌍 **Multi-language Support** - English, Turkish, Arabic (RTL), French
- 💳 **Stripe Payment Integration** - Apple Pay, Google Pay, Card payments
- 📱 **Mobile-First Design** - Responsive and touch-friendly
- 🔒 **Secure** - 256-bit encryption, GDPR compliant
- ✨ **Modern UI** - Dark theme with glassmorphism effects
- 📷 **Photo Capture** - Camera integration for selfie/passport photos
- ✅ **Comprehensive Validation** - Zod schemas with real-time feedback

## Tech Stack

- **Framework**: Next.js 15 (App Router + Turbopack)
- **React**: React 19
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4
- **Forms**: React Hook Form + Zod
- **i18n**: next-intl 3.25
- **Payments**: Stripe 17
- **Animation**: Framer Motion 11
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 20+
- npm, yarn, or pnpm
- Stripe account
- Firebase project (optional, for data storage)

### Installation

1. Clone and install dependencies:

```bash
npm install
```

2. Copy environment file and configure:

```bash
cp .env.example .env.local
```

3. Add your API keys to `.env.local`:
   - Stripe publishable and secret keys
   - Firebase configuration (optional)

4. Run the development server (with Turbopack):

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/
│   ├── [locale]/          # Locale-based routing
│   │   ├── layout.tsx     # Root layout with providers
│   │   └── page.tsx       # Main form page
│   ├── api/               # API routes
│   │   └── create-payment-intent/
│   └── globals.css        # Global styles
├── components/
│   ├── form-steps/        # Individual form step components
│   │   ├── PassportStep.tsx
│   │   ├── PersonalStep.tsx
│   │   ├── ContactStep.tsx
│   │   ├── PhotoStep.tsx
│   │   ├── BackgroundStep.tsx
│   │   ├── AddressStep.tsx
│   │   ├── EmergencyStep.tsx
│   │   └── ReviewStep.tsx
│   ├── Header.tsx         # Header with language switcher
│   ├── Footer.tsx
│   ├── ProgressBar.tsx    # Step progress indicator
│   ├── FormWizard.tsx     # Step renderer
│   └── FormNavigation.tsx # Next/Back buttons
├── lib/
│   ├── validations.ts     # Zod schemas
│   ├── form-context.tsx   # Form state management
│   └── utils.ts           # Utility functions
├── messages/              # Translation files
│   ├── en.json
│   ├── tr.json
│   ├── ar.json
│   └── fr.json
├── i18n.ts               # Internationalization config
└── middleware.ts         # Locale routing middleware
```

## Form Steps

1. **Passport Details** - Passport information and document upload
2. **Personal Details** - Name, DOB, gender, nationality
3. **Contact Details** - Email and phone with validation
4. **Photo** - Selfie capture or upload
5. **Background Questions** - Immigration history (yes/no)
6. **Address** - Current residential address
7. **Emergency Contact** - Optional emergency contact
8. **Review & Pay** - Summary, consent, and payment

## Adding Languages

1. Create a new translation file in `messages/` (e.g., `es.json`)
2. Add the locale to `i18n.ts`:

```typescript
export const locales = ['en', 'tr', 'ar', 'fr', 'es'] as const;
```

3. Add RTL support if needed:

```typescript
export const rtlLocales: Locale[] = ['ar'];
```

## Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Get your API keys from the Dashboard
3. Configure Payment Methods in Stripe Dashboard:
   - Enable Apple Pay
   - Enable Google Pay
   - Enable Card payments

## Admin Panel (Future)

The application is designed to support an admin panel with:
- View all submissions
- Update application status
- Mark as submitted/approved/refused
- Export data

## Security Considerations

- All data encrypted in transit (TLS)
- Passport photos encrypted at rest
- GDPR compliant data handling
- Clear data retention policy
- User data deletion on request

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Manual Build

```bash
npm run build
npm start
```

## License

Private - All rights reserved

## Support

For questions or issues, contact support.
