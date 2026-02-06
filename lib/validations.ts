import { z } from 'zod';
import { addMonths, isBefore, isAfter, startOfDay } from 'date-fns';

const today = startOfDay(new Date());
const sixMonthsFromNow = addMonths(today, 6);

// Step 1: Passport Details
export const passportSchema = z.object({
  passportCountry: z.string().min(1, 'passport.errors.countryRequired'),
  passportNumber: z
    .string()
    .min(1, 'passport.errors.numberRequired')
    .regex(/^[A-Z0-9]{6,12}$/i, 'passport.errors.numberInvalid'),
  issueDate: z
    .string()
    .min(1, 'passport.errors.issueDateRequired')
    .refine((date) => {
      const parsed = new Date(date);
      return !isAfter(parsed, today);
    }, 'passport.errors.issueDateFuture'),
  expiryDate: z
    .string()
    .min(1, 'passport.errors.expiryRequired')
    .refine((date) => {
      const parsed = new Date(date);
      return isAfter(parsed, today);
    }, 'passport.errors.expiryPast')
    .refine((date) => {
      const parsed = new Date(date);
      return isAfter(parsed, sixMonthsFromNow);
    }, 'passport.errors.expiryTooSoon'),
  issuingAuthority: z.string().min(1, 'passport.errors.authorityRequired'),
  passportPhoto: z.string().optional(),
});

// Step 2: Personal Details
export const personalSchema = z.object({
  firstName: z.string().min(1, 'personal.errors.firstNameRequired'),
  lastName: z.string().min(1, 'personal.errors.lastNameRequired'),
  dateOfBirth: z
    .string()
    .min(1, 'personal.errors.dobRequired')
    .refine((date) => {
      const parsed = new Date(date);
      return isBefore(parsed, today);
    }, 'personal.errors.dobFuture'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'personal.errors.genderRequired',
  }),
  nationality: z.string().min(1, 'personal.errors.nationalityRequired'),
  birthCountry: z.string().min(1, 'personal.errors.birthCountryRequired'),
});

// Step 3: Contact Details
export const contactSchema = z
  .object({
    email: z
      .string()
      .min(1, 'contact.errors.emailRequired')
      .email('contact.errors.emailInvalid'),
    confirmEmail: z.string().min(1, 'contact.errors.emailRequired'),
    phone: z
      .string()
      .min(1, 'contact.errors.phoneRequired')
      .regex(/^\+?[1-9]\d{6,14}$/, 'contact.errors.phoneInvalid'),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: 'contact.errors.emailMismatch',
    path: ['confirmEmail'],
  });

// Step 4: Photo
export const photoSchema = z.object({
  selfiePhoto: z.string().optional(),
});

// Step 5: Background Questions
export const backgroundSchema = z.object({
  criminalConvictions: z.enum(['yes', 'no'], {
    required_error: 'background.errors.criminalRequired',
  }),
  immigrationBreaches: z.enum(['yes', 'no'], {
    required_error: 'background.errors.immigrationRequired',
  }),
  previousRefusals: z.enum(['yes', 'no'], {
    required_error: 'background.errors.refusalRequired',
  }),
  terrorismInvolvement: z.enum(['yes', 'no'], {
    required_error: 'background.errors.terrorismRequired',
  }),
});

// Step 6: Address
export const addressSchema = z.object({
  addressLine1: z.string().min(1, 'address.errors.line1Required'),
  addressLine2: z.string().optional(),
  city: z.string().min(1, 'address.errors.cityRequired'),
  state: z.string().optional(),
  postcode: z.string().min(1, 'address.errors.postcodeRequired'),
  country: z.string().min(1, 'address.errors.countryRequired'),
});

// Step 7: Emergency Contact (optional)
export const emergencySchema = z.object({
  emergencyName: z.string().optional(),
  emergencyRelationship: z.string().optional(),
  emergencyPhone: z.string().optional(),
});

// Step 8: Consent & Review
export const consentSchema = z.object({
  confirmAccuracy: z.boolean().refine(v => v === true, {
    message: 'review.errors.accuracyRequired',
  }),
  consentSubmit: z.boolean().refine(v => v === true, {
    message: 'review.errors.submitRequired',
  }),
  acceptTerms: z.boolean().refine(v => v === true, {
    message: 'review.errors.termsRequired',
  }),
  acceptDataProcessing: z.boolean().refine(v => v === true, {
    message: 'review.errors.dataRequired',
  }),
});

// Complete form schema
export const etaFormSchema = passportSchema
  .merge(personalSchema)
  .merge(contactSchema.innerType())
  .merge(photoSchema)
  .merge(backgroundSchema)
  .merge(addressSchema)
  .merge(emergencySchema)
  .merge(consentSchema);

export type PassportData = z.infer<typeof passportSchema>;
export type PersonalData = z.infer<typeof personalSchema>;
export type ContactData = z.infer<typeof contactSchema>;
export type PhotoData = z.infer<typeof photoSchema>;
export type BackgroundData = z.infer<typeof backgroundSchema>;
export type AddressData = z.infer<typeof addressSchema>;
export type EmergencyData = z.infer<typeof emergencySchema>;
export type ConsentData = z.infer<typeof consentSchema>;
export type ETAFormData = z.infer<typeof etaFormSchema>;

// Form step configuration
export const FORM_STEPS = [
  { id: 'passport', schema: passportSchema },
  { id: 'personal', schema: personalSchema },
  { id: 'contact', schema: contactSchema },
  { id: 'photo', schema: photoSchema },
  { id: 'background', schema: backgroundSchema },
  { id: 'address', schema: addressSchema },
  { id: 'emergency', schema: emergencySchema },
  { id: 'review', schema: consentSchema },
] as const;

export type StepId = (typeof FORM_STEPS)[number]['id'];
