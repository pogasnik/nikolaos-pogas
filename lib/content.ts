// All copy on the site lives here. Components only lay it out.
// Rule: facts only. No metric, client or number that isn't true.

export const person = {
  name: 'Nikolaos Pogas',
  title: 'Full-stack engineer',
  summary: [
    'I build multi-tenant web apps on Next.js and PostgreSQL, and the payment and fiscal integrations around them.',
    'Based in Greece (EET). Remote, with full overlap with CET hours.',
  ],
  email: 'pogasnik@gmail.com',
  location: 'Greece (EET)',
  outsideWork: 'Bassist for 17 years. Four released albums.',
} as const;

export type Link = { label: string; href: string };

export const links: Link[] = [
  { label: 'GitHub', href: 'https://github.com/pogasnik' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikolaos-pogas' },
  { label: 'hypnotech.gr', href: 'https://hypnotech.gr' },
  { label: 'Email', href: 'mailto:pogasnik@gmail.com' },
];

// ── Projects ────────────────────────────────────────────────────────────────

export type FlowStep = {
  label: string;
  note?: string;
  // Several boxes side by side at this step, e.g. swappable backends.
  options?: string[];
};

export type MediaSlot = {
  // File name without extension in public/media/<slug>/, e.g. "storefront".
  // Any of .mp4 .webm .png .jpg .jpeg .webp .avif .gif matches.
  name: string;
  caption: string;
};

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  problem: string;
  // One or two sentences for the card on the home page.
  summary: string;
  built: string[];
  stack: string[];
  links: Link[];
  architecture: { heading: string; body: string[] }[];
  flow: { title: string; steps: FlowStep[]; footnote?: string };
  media: MediaSlot[];
  sourceNote: string;
};

export const projects: Project[] = [
  {
    slug: 'ploutos',
    name: 'Ploutos',
    tagline: 'Multi-tenant e-commerce SaaS with AADE myDATA built in.',
    problem:
      'Greek shops selling online must report every sale to AADE myDATA. Running a separate store per client does not scale for one engineer.',
    summary:
      'One Next.js app serves every shop from one PostgreSQL database, with tenants isolated by row-level security. A paid order issues its fiscal document and sends it to myDATA through one of 5 swappable backends.',
    built: [
      'One Next.js app and one shared PostgreSQL database. Every tenant isolated with row-level security.',
      'A provisioning CLI, create-ploutos-app, that sets up a new client in one command.',
      'A myDATA transmission layer with 5 swappable backends: direct AADE, Elorus, Primer, Viva and a mock. Direct transmission verified against the AADE sandbox.',
      'A payment webhook that issues the fiscal document, with atomic numbering in a PostgreSQL function. A failed transmission is logged. It never fails the payment.',
    ],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL RLS', 'AADE myDATA'],
    links: [{ label: 'Live demo', href: 'https://ploutos.hypnotech.gr' }],
    architecture: [
      {
        heading: 'One database, many shops',
        body: [
          'All tenants share one PostgreSQL database on Supabase. Row-level security policies decide which rows a request can see, so isolation lives in the database, not in application code that could forget a filter.',
          'A new client is one command: create-ploutos-app sets it up.',
        ],
      },
      {
        heading: 'Payment first, fiscal document second',
        body: [
          'When a payment succeeds, the payment webhook asks a PostgreSQL function for the next document number. The function hands out numbers atomically, so two orders paid at the same moment never get the same number.',
          'The fiscal document then goes to myDATA. If transmission fails, the failure is logged. The payment is never failed because of it: the customer has already paid.',
        ],
      },
      {
        heading: 'Swappable myDATA backends',
        body: [
          'The transmission layer has one interface and 5 implementations: direct AADE, Elorus, Primer, Viva and a mock for development. The rest of the app does not know which one is in use. Direct transmission is verified against the AADE sandbox.',
        ],
      },
    ],
    flow: {
      title: 'Order to fiscal document',
      steps: [
        { label: 'Customer pays', note: 'storefront of one tenant' },
        { label: 'Payment webhook', note: 'issues the fiscal document' },
        { label: 'PostgreSQL function', note: 'atomic document number' },
        { label: 'myDATA transmission layer', note: 'one interface' },
        {
          label: 'Swappable backend',
          options: ['AADE direct', 'Elorus', 'Primer', 'Viva', 'Mock'],
        },
      ],
      footnote: 'If transmission fails, the failure is logged. The payment is never failed.',
    },
    media: [
      { name: 'storefront', caption: 'A tenant storefront' },
      { name: 'admin', caption: 'Shop admin' },
      { name: 'cli', caption: 'create-ploutos-app provisioning a client' },
    ],
    sourceNote: 'Source is private. The live demo is public.',
  },
  {
    slug: 'arke',
    name: 'Arke',
    tagline: 'Field-service app for technical installation crews.',
    problem:
      'The office needs to know where each crew is and what it is doing. Technicians on a job should not have to tap through an app to say so. And a billing dispute needs evidence.',
    summary:
      'An Expo app that sets a technician’s status from OS geofences, queues changes offline and writes them to an immutable event log. The office follows it on a live dashboard.',
    built: [
      'An Expo / React Native app that uses OS-level geofencing to set a technician’s status automatically. No taps.',
      'An offline sync queue. Status changes made without signal are sent when the phone reconnects.',
      'A live dashboard for the office over Supabase Realtime.',
      'An immutable status event log with GPS, timestamps and trigger source, kept as evidence for billing disputes.',
    ],
    stack: ['Expo', 'React Native', 'TypeScript', 'Supabase Realtime', 'PostgreSQL'],
    links: [],
    architecture: [
      {
        heading: 'The phone decides, not the technician',
        body: [
          'Each job site is a geofence registered with the operating system. When the phone enters or leaves it, the OS wakes the app and the app records a status change. The technician does nothing.',
        ],
      },
      {
        heading: 'Offline first',
        body: [
          'Signal on a job site is not guaranteed. Every status change goes into a local queue first, and the queue syncs to Supabase when the connection returns. Each event keeps the time it happened.',
        ],
      },
      {
        heading: 'An append-only record',
        body: [
          'Status changes are stored as events that are never edited: GPS position, timestamp and what triggered the change. When a client disputes a bill, the log is the evidence.',
          'The office dashboard subscribes to the same events over Supabase Realtime, so it updates as crews move.',
        ],
      },
    ],
    flow: {
      title: 'Geofence to dashboard',
      steps: [
        { label: 'Phone enters job-site geofence', note: 'detected by the OS' },
        { label: 'Status event created', note: 'GPS, timestamp, trigger source' },
        { label: 'Offline sync queue', note: 'held until there is signal' },
        { label: 'Supabase event log', note: 'append-only' },
        { label: 'Office dashboard', note: 'live over Supabase Realtime' },
      ],
    },
    media: [
      { name: 'technician-app', caption: 'Technician app' },
      { name: 'dashboard', caption: 'Office dashboard' },
      { name: 'event-log', caption: 'Status event log' },
    ],
    sourceNote: 'Source is private.',
  },
  {
    slug: 'mydata-receipt-demo',
    name: 'myDATA receipt demo',
    tagline: 'AADE myDATA XML to an 80 mm receipt PDF, in the browser.',
    problem:
      'myDATA XML has a strict element order, VAT that must add up to the cent, and fields that must not appear for Greek parties. Getting any of it wrong means a rejected document.',
    summary:
      'A typed library that builds and validates InvoicesDoc XML, and a static page that renders the receipt PDF from the XML itself.',
    built: [
      'A typed TypeScript library that builds InvoicesDoc XML (schema v2.0.2) for a retail receipt (11.1) and a sales invoice (1.1).',
      'Integer money and an explicit rounding rule. Element order taken from the official XSD.',
      'Validation against the AADE XSD, in tests and in the browser.',
      'A static Next.js page that parses the XML back and renders the receipt PDF from it, so the XML is the single source of truth.',
    ],
    stack: ['TypeScript', 'Next.js', 'XSD validation', 'React PDF', 'AADE myDATA'],
    links: [
      { label: 'Live demo', href: 'https://mydata-receipt-demo.vercel.app' },
      { label: 'Source on GitHub', href: 'https://github.com/pogasnik/mydata-receipt-demo' },
    ],
    architecture: [
      {
        heading: 'Integer money',
        body: [
          'Amounts are integer cents from the moment input is parsed. VAT is computed per line with one documented rounding rule, so the totals in the XML always equal the sum of the lines.',
        ],
      },
      {
        heading: 'The XML is the source of truth',
        body: [
          'The receipt is not drawn from form state. The page builds the XML, parses it back with a strict parser into a typed object, and renders the receipt from that object. If the XML is wrong, the receipt shows it.',
          'Issuer name and address are not allowed in the XML for a Greek issuer. AADE already knows them from the tax number. The printout takes them from a fixed letterhead profile instead.',
        ],
      },
      {
        heading: 'Nothing leaves the page',
        body: [
          'It is a demo. Nothing is transmitted to AADE or anywhere else. The issuer is fictional and every printout carries a watermark.',
        ],
      },
    ],
    flow: {
      title: 'Form to PDF',
      steps: [
        { label: 'Form input', note: 'raw strings' },
        { label: 'Validated, typed input' },
        { label: 'VAT computed', note: 'integer cents' },
        { label: 'InvoicesDoc XML', note: 'checked against AADE XSD v2.0.2' },
        { label: 'Parsed back', note: 'strict parser, typed object' },
        { label: 'Receipt', options: ['HTML preview', 'PDF, 80 mm'] },
      ],
    },
    media: [
      { name: 'form-and-receipt', caption: 'The form, and the receipt rendered from the XML' },
    ],
    sourceNote: 'Source and demo are public.',
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

// ── Experience ──────────────────────────────────────────────────────────────

export type Role = {
  title: string;
  org: string;
  orgNote?: string;
  period: string;
  points: string[];
  projectSlugs?: string[];
};

export const experience: Role[] = [
  {
    title: 'Independent Full-Stack Engineer',
    org: 'Hypnotech',
    orgNote: 'my own practice',
    period: 'Aug 2025 – present',
    points: [
      'Ploutos: multi-tenant e-commerce SaaS on Next.js and Supabase, with AADE myDATA transmission.',
      'Arke: field-service app for installation crews, with geofencing, offline sync and a live dashboard.',
    ],
    projectSlugs: ['ploutos', 'arke'],
  },
  {
    title: 'Developer, Digital Systems',
    org: 'GR-TOYS',
    period: 'Jun 2023 – Jul 2025',
    points: [
      'Built the ERP for 3 family play parks from scratch, as the sole developer. Used all day by about 25 staff.',
      'EAN-13 barcode numbering for in-house printed wristbands: 10–15 types per park, thousands of units of each.',
      'The company’s accountant reported an average monthly increase of about 30% in recorded wristband revenue after launch.',
      'Restock tracking ended emergency weekend print runs. Also built a QR-code menu for customers.',
    ],
  },
];

export const education = {
  degree: 'BSc Information Technology',
  school: 'University of Hertfordshire, via IST College',
  year: '2012',
};

// ── Stack ───────────────────────────────────────────────────────────────────

export const stack: { label: string; items: string[] }[] = [
  {
    label: 'Web',
    items: ['TypeScript', 'Next.js (App Router)', 'React', 'Tailwind', 'shadcn/ui', 'Zustand'],
  },
  { label: 'Data', items: ['PostgreSQL', 'Supabase (RLS, Auth, Realtime)'] },
  { label: 'Mobile', items: ['React Native', 'Expo'] },
  { label: 'Infrastructure', items: ['Vercel', 'Cloudflare R2', 'GitHub Actions', 'Sentry'] },
  {
    label: 'Integrations',
    items: ['Stripe', 'Viva Wallet', 'Resend', 'Claude API', 'AADE myDATA'],
  },
  { label: 'Learning', items: ['Go'] },
];
