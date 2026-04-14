export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  readingMinutes: number;
  category: string;
  content: string; // HTML string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'what-is-uk-eta',
    title: 'What is a UK ETA? Complete Guide for 2026',
    description:
      'Everything you need to know about the UK Electronic Travel Authorisation — who needs it, how to apply, and what to expect.',
    publishedAt: '2026-01-15',
    readingMinutes: 6,
    category: 'Guides',
    content: `
      <h2>What is the UK ETA?</h2>
      <p>The UK Electronic Travel Authorisation (ETA) is a digital travel permission required for nationals of certain countries to travel to the United Kingdom. Launched as part of the UK's new border control system, the ETA links electronically to your passport and must be obtained before you travel.</p>
      <p>Unlike a visa, the ETA does not require a visit to an embassy or the submission of physical documents. It is applied for entirely online and, in most cases, approved within 3 working days.</p>

      <h2>Who Needs a UK ETA?</h2>
      <p>The UK ETA is required for nationals of countries that are currently visa-free for the UK. This initially included nationals of Gulf Cooperation Council (GCC) countries — Qatar, UAE, Saudi Arabia, Kuwait, Bahrain, and Oman — and has since been expanded to include:</p>
      <ul>
        <li>European Union citizens</li>
        <li>Citizens of other visa-exempt countries including the US, Canada, and Australia</li>
      </ul>
      <p>Citizens of the United Kingdom and Ireland, as well as those who already hold a valid UK visa or residence permit, do <strong>not</strong> need an ETA.</p>

      <h2>What Can You Do with a UK ETA?</h2>
      <p>A UK ETA allows you to:</p>
      <ul>
        <li>Visit the UK for tourism or leisure</li>
        <li>Travel to the UK for business meetings or conferences</li>
        <li>Transit through a UK airport</li>
        <li>Visit family or friends</li>
        <li>Take a short study course of up to 6 months</li>
      </ul>
      <p>A UK ETA does <strong>not</strong> allow you to work in the UK, live in the UK long-term, or access public funds.</p>

      <h2>How Long is a UK ETA Valid?</h2>
      <p>A UK ETA is valid for <strong>2 years</strong> from the date of issue, or until your passport expires — whichever comes first. During this period, you can make multiple trips to the UK, each of up to 6 months.</p>

      <h2>How to Apply for a UK ETA</h2>
      <p>The application process is straightforward:</p>
      <ol>
        <li><strong>Complete the online form</strong> — provide your passport details, personal information, and answer background questions</li>
        <li><strong>Upload your documents</strong> — a photo of your passport's information page and a selfie for identity verification</li>
        <li><strong>Pay the fee</strong> — the government fee is £10, plus a service fee if applying through a third-party service</li>
        <li><strong>Await approval</strong> — most decisions are made within 3 working days</li>
      </ol>

      <h2>ETA vs UK Visa: What's the Difference?</h2>
      <p>The UK ETA is not a visa. Key differences:</p>
      <ul>
        <li><strong>ETA</strong>: fully online, no embassy visit, approved in days, lower cost</li>
        <li><strong>UK Visa</strong>: required for citizens of non-visa-exempt countries, involves more documentation and processing time</li>
      </ul>

      <h2>Apply Today</h2>
      <p>Ready to get your UK ETA? Our service makes it simple — we guide you through every step, review your application, and submit it on your behalf.</p>
    `,
  },
  {
    slug: 'uk-eta-requirements-documents',
    title: 'UK ETA Requirements: Documents You Need in 2026',
    description:
      'A complete checklist of documents and information required for a UK ETA application, with tips to avoid common mistakes.',
    publishedAt: '2026-01-22',
    readingMinutes: 5,
    category: 'Guides',
    content: `
      <h2>Documents Required for a UK ETA Application in 2026</h2>
      <p>Preparing the right documents before you start your UK ETA application will make the process much smoother. Here is exactly what you need.</p>

      <h2>1. Valid Passport</h2>
      <p>Your passport must:</p>
      <ul>
        <li>Be valid for at least <strong>6 months</strong> beyond your intended travel date</li>
        <li>Have at least one blank page for entry stamps</li>
        <li>Be an electronic (biometric) passport — older non-biometric passports may not be accepted</li>
      </ul>
      <p>You will need to upload a clear photo of your passport's information page (the page with your photo, name, and passport number).</p>

      <h2>2. Passport Photo Page Scan</h2>
      <p>Requirements for the passport scan:</p>
      <ul>
        <li>Clear, high-resolution photo or scan</li>
        <li>All text must be readable — no blurring</li>
        <li>No glare or shadows obscuring details</li>
        <li>The full page must be visible, including all four corners</li>
        <li>File format: JPG, PNG, or PDF (max 5MB)</li>
      </ul>

      <h2>3. Face Photo (Selfie)</h2>
      <p>You will also need to submit a recent photo of your face for identity verification. Requirements:</p>
      <ul>
        <li>Face clearly visible and looking straight at the camera</li>
        <li>Plain background with good, even lighting</li>
        <li>No sunglasses, hats, or face coverings</li>
        <li>Photo taken within the last 6 months</li>
        <li>File format: JPG or PNG (max 5MB)</li>
      </ul>

      <h2>4. Personal Information</h2>
      <p>You will need to provide:</p>
      <ul>
        <li>Full name (exactly as shown on your passport)</li>
        <li>Date of birth</li>
        <li>Gender</li>
        <li>Nationality and country of birth</li>
        <li>Current residential address</li>
      </ul>

      <h2>5. Contact Information</h2>
      <ul>
        <li>A valid email address (your ETA decision will be sent here)</li>
        <li>Mobile phone number (including country code)</li>
      </ul>

      <h2>6. Background Questions</h2>
      <p>You will be asked a set of standard questions required by UK authorities:</p>
      <ul>
        <li>Have you ever been convicted of a criminal offence?</li>
        <li>Have you ever breached immigration laws?</li>
        <li>Have you ever been refused entry to or deported from any country?</li>
        <li>Have you ever been involved in terrorist or extremist activities?</li>
      </ul>
      <p>Answer all questions honestly. Providing false information is a criminal offence.</p>

      <h2>7. Payment Details</h2>
      <p>You will need a payment method to pay the application fee. Accepted methods include debit/credit cards, Apple Pay, and Google Pay.</p>

      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li>Uploading a blurry or partially cropped passport photo</li>
        <li>Using a passport that expires within 6 months of travel</li>
        <li>Entering your name differently from how it appears on your passport</li>
        <li>Using an email address you don't have regular access to</li>
      </ul>

      <p>Our service includes a document verification step — we check your submission before sending it to UK authorities to catch any issues early.</p>
    `,
  },
  {
    slug: 'how-long-does-uk-eta-take',
    title: 'How Long Does UK ETA Approval Take?',
    description:
      'Processing times for UK ETA applications explained — typical timelines, what causes delays, and how to avoid them.',
    publishedAt: '2026-02-03',
    readingMinutes: 4,
    category: 'FAQ',
    content: `
      <h2>Typical UK ETA Processing Times</h2>
      <p>The majority of UK ETA applications are processed within <strong>3 working days</strong>. In many cases, approvals come through within 24 hours. However, processing times can vary depending on several factors.</p>

      <h2>Why Do Some Applications Take Longer?</h2>
      <p>While most ETAs are approved quickly, some applications require additional security checks. This can happen when:</p>
      <ul>
        <li>Your name or passport details trigger a manual security review</li>
        <li>You have answered "yes" to any of the background questions</li>
        <li>There are inconsistencies in the information provided</li>
        <li>Your application is submitted during high-volume periods</li>
      </ul>
      <p>In these cases, the process can take up to <strong>5–7 working days</strong>. In rare cases involving complex checks, it may take longer.</p>

      <h2>When Should You Apply?</h2>
      <p>We strongly recommend applying for your UK ETA at least <strong>2 weeks before your travel date</strong>. While same-day approvals do happen, relying on them is risky — especially if you have booked non-refundable flights or accommodation.</p>
      <p>Applying early also gives you time to address any issues if your application needs correction or additional information.</p>

      <h2>Can You Expedite a UK ETA?</h2>
      <p>There is no official fast-track or priority processing option for UK ETAs. All applications go through the same queue. The best way to minimise processing time is to submit a complete, accurate application the first time.</p>

      <h2>How Will You Receive Your ETA Decision?</h2>
      <p>Your ETA decision will be sent to the email address you provided during the application. You will receive one of three outcomes:</p>
      <ul>
        <li><strong>Approved</strong> — your ETA is linked to your passport and you can travel</li>
        <li><strong>Pending</strong> — your application is still being reviewed</li>
        <li><strong>Refused</strong> — your application was not approved (reasons are not always given)</li>
      </ul>

      <h2>What Happens If Your ETA Is Refused?</h2>
      <p>If your UK ETA is refused, you may be able to apply for a standard UK visa instead. Our team can advise you on the next steps. If the refusal was due to an error on our part, we offer a full refund of our service fee.</p>

      <h2>Check Your ETA Status</h2>
      <p>You can check the current status of your application at any time using your reference number and email address on our <a href="/status">status check page</a>.</p>
    `,
  },
  {
    slug: 'uk-eta-vs-uk-visa',
    title: 'UK ETA vs UK Visa: What Is the Difference?',
    description:
      'Understanding the difference between a UK ETA and a UK visa — which one you need, how they compare, and how to apply.',
    publishedAt: '2026-02-14',
    readingMinutes: 5,
    category: 'Guides',
    content: `
      <h2>UK ETA vs UK Visa at a Glance</h2>
      <p>Many travellers are confused about whether they need a UK ETA or a UK visa. The short answer: it depends on your nationality. Here is a clear breakdown of both.</p>

      <h2>What is a UK ETA?</h2>
      <p>The UK Electronic Travel Authorisation (ETA) is a pre-travel permission for nationals of <strong>visa-exempt countries</strong>. It was introduced to bring the UK in line with similar systems used in the US (ESTA), Canada (eTA), and Australia (ETA).</p>
      <p>Key features:</p>
      <ul>
        <li>Applied for entirely online — no embassy visit</li>
        <li>Valid for 2 years or until passport expiry</li>
        <li>Allows multiple trips of up to 6 months each</li>
        <li>Government fee: £10</li>
        <li>Processing: typically 3 working days</li>
      </ul>

      <h2>What is a UK Visa?</h2>
      <p>A UK visa is required for nationals of countries that do <strong>not</strong> have a visa-free arrangement with the UK. There are several types of UK visas, including Standard Visitor Visa, Student Visa, and Work Visa.</p>
      <p>Key features:</p>
      <ul>
        <li>Application submitted to a UK Visa Application Centre</li>
        <li>Requires biometric data collection in person</li>
        <li>More supporting documents required (bank statements, accommodation proof, etc.)</li>
        <li>Higher fees (Standard Visitor Visa: £115)</li>
        <li>Processing: 3 weeks or more</li>
      </ul>

      <h2>Which Countries Need an ETA (Not a Visa)?</h2>
      <p>Nationals of the following groups currently need an ETA instead of a visa:</p>
      <ul>
        <li><strong>GCC countries</strong>: Qatar, UAE, Saudi Arabia, Kuwait, Bahrain, Oman</li>
        <li><strong>EU/EEA countries</strong>: France, Germany, Italy, Spain, Netherlands, Belgium, etc.</li>
        <li><strong>Other visa-exempt countries</strong>: USA, Canada, Australia, New Zealand, Japan, South Korea, and more</li>
      </ul>

      <h2>Can You Choose Between an ETA and a Visa?</h2>
      <p>No. If your nationality qualifies for an ETA, you must obtain an ETA. You cannot apply for a standard visitor visa instead. Conversely, if your nationality requires a visa, you cannot use an ETA.</p>

      <h2>Summary Table</h2>
      <table>
        <thead>
          <tr><th>Feature</th><th>UK ETA</th><th>UK Visa</th></tr>
        </thead>
        <tbody>
          <tr><td>Who it's for</td><td>Visa-exempt nationals</td><td>Non-visa-exempt nationals</td></tr>
          <tr><td>Application method</td><td>Online only</td><td>In-person + online</td></tr>
          <tr><td>Processing time</td><td>3 working days</td><td>3+ weeks</td></tr>
          <tr><td>Cost (government fee)</td><td>£10</td><td>From £115</td></tr>
          <tr><td>Validity</td><td>2 years</td><td>Varies (typically 6 months)</td></tr>
          <tr><td>Multiple entries</td><td>Yes</td><td>Depends on visa type</td></tr>
        </tbody>
      </table>

      <h2>Apply for Your UK ETA Today</h2>
      <p>If you are from a visa-exempt country, our service makes the ETA application quick and easy. We verify your documents and submit on your behalf.</p>
    `,
  },
  {
    slug: 'uk-eta-step-by-step-guide',
    title: 'UK ETA Application: Step-by-Step Guide',
    description:
      'A detailed walkthrough of the UK ETA application process — from gathering documents to receiving your approval.',
    publishedAt: '2026-03-01',
    readingMinutes: 7,
    category: 'Guides',
    content: `
      <h2>Before You Begin</h2>
      <p>Before starting your UK ETA application, make sure you have the following ready:</p>
      <ul>
        <li>Your passport (valid for at least 6 months)</li>
        <li>A clear photo or scan of your passport's information page</li>
        <li>A recent face photo (selfie)</li>
        <li>A valid email address</li>
        <li>A mobile phone number</li>
        <li>A payment method (card, Apple Pay, or Google Pay)</li>
      </ul>

      <h2>Step 1: Passport Details</h2>
      <p>Enter your passport information exactly as it appears on your travel document:</p>
      <ul>
        <li>Issuing country</li>
        <li>Passport number</li>
        <li>Date of issue and expiry date</li>
        <li>Issuing authority</li>
      </ul>
      <p>Upload a clear photo of your passport's information page. Make sure all text is readable and no corners are cut off.</p>
      <p><strong>Tip:</strong> Double-check your passport number carefully — a single wrong digit will cause a rejection.</p>

      <h2>Step 2: Personal Details</h2>
      <p>Enter your personal information as shown in your passport:</p>
      <ul>
        <li>Full first name(s) and family name</li>
        <li>Date of birth</li>
        <li>Gender</li>
        <li>Nationality and country of birth</li>
      </ul>
      <p><strong>Tip:</strong> If your passport uses an abbreviated name, use the same version in your application.</p>

      <h2>Step 3: Contact Information</h2>
      <p>Provide your email address — this is where your ETA decision will be sent. Use an email address you check regularly. Confirm it by entering it twice to avoid typos.</p>
      <p>Also provide your mobile number with country code (e.g. +44 for UK, +33 for France).</p>

      <h2>Step 4: Identity Photo</h2>
      <p>Upload a clear selfie or face photo. Requirements:</p>
      <ul>
        <li>Face clearly visible, looking straight at the camera</li>
        <li>Plain background, good lighting</li>
        <li>No sunglasses, hats, or face coverings</li>
        <li>Taken within the last 6 months</li>
      </ul>

      <h2>Step 5: Background Questions</h2>
      <p>Answer four standard questions required by UK immigration authorities:</p>
      <ol>
        <li>Have you ever been convicted of a criminal offence?</li>
        <li>Have you ever breached immigration laws?</li>
        <li>Have you ever been refused entry or deported from any country?</li>
        <li>Have you ever been involved in terrorist or extremist activities?</li>
      </ol>
      <p>Answer honestly. Most applicants will answer "no" to all four. If you answer "yes" to any question, your application will undergo additional review — but answering honestly is always the right approach.</p>

      <h2>Step 6: Address Information</h2>
      <p>Provide your current residential address. This does not need to be a UK address — use the address where you currently live.</p>

      <h2>Step 7: Emergency Contact (Optional)</h2>
      <p>You may optionally provide the name and phone number of someone we can contact in an emergency. This step can be skipped if you prefer.</p>

      <h2>Step 8: Review & Payment</h2>
      <p>Before submitting, you will see a complete summary of your application. Review every detail carefully. If anything is incorrect, you can go back and edit it.</p>
      <p>Once satisfied, accept the declarations and proceed to payment. The government ETA fee is £10, paid separately to UK authorities. Our service fee covers the application review, document verification, and submission.</p>

      <h2>After Submission</h2>
      <p>Once submitted, our team reviews your application before sending it to UK authorities. You will receive:</p>
      <ol>
        <li>A confirmation email with your reference number immediately</li>
        <li>Status updates as your application progresses</li>
        <li>Your ETA decision by email — usually within 3 working days</li>
      </ol>
      <p>Keep your reference number safe — you can use it to check your application status at any time.</p>
    `,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
