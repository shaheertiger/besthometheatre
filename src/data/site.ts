/**
 * Global site settings. Change the Amazon tag here and every affiliate link on the
 * site updates on the next build.
 */
export const SITE = {
  name: 'Best Home Theater Review',
  shortName: 'BHTR',
  url: 'https://www.besthometheaterreview.com',
  tagline: 'Independent home theater reviews built on the spec sheet',
  description:
    'Independent home theater reviews: projectors, AV receivers, speakers, subwoofers and complete systems checked against the spec sheet, room size and real cost. No paid placements.',
  locale: 'en_US',
  author: 'Justin Lee',
  email: 'editors@besthometheaterreview.com',
  ogImage: '/og-default.png',
  /** Amazon Associates tracking ID used on every Amazon link. */
  amazonTag: 'sktiger-20',
  amazonDomain: 'www.amazon.com',
  /** Optional: Google AdSense publisher ID, e.g. 'ca-pub-123'. Leave empty to omit the meta tag. */
  adsenseId: '',
  /** Optional: Google Search Console verification token. */
  googleSiteVerification: '',
} as const;

/** Article author. Facts only from his public profile; keep in sync with /authors/justin-lee/. */
export const AUTHOR = {
  name: 'Justin Lee',
  slug: 'justin-lee',
  url: '/authors/justin-lee/',
  role: 'Author',
  shortBio: 'Software engineer (ex-Apple, ex-Tesla firmware) with a background in digital signal processing. University of Waterloo Computer Science.',
  sameAs: ['https://www.linkedin.com/in/justinllee32/'],
  knowsAbout: ['Digital signal processing', 'Embedded software', 'Firmware', 'Home theater'],
  alumniOf: 'University of Waterloo',
} as const;

/** Our testing lab. Products get a "Lab tested" badge only when they have a `tested` record. */
export const LAB = { location: 'Mississauga, Ontario' } as const;

export const CATEGORY_LABELS: Record<string, string> = {
  projector: 'Projectors',
  screen: 'Projector Screens',
  receiver: 'AV Receivers',
  amplifier: 'Amplifiers',
  subwoofer: 'Subwoofers',
  system: 'Home Theater Systems',
  soundbar: 'Soundbars',
  bookshelf: 'Bookshelf Speakers',
  tower: 'Tower Speakers',
  center: 'Center Channel Speakers',
  'atmos-speaker': 'Dolby Atmos Speakers',
  'in-wall': 'In-Wall & Ceiling Speakers',
  'high-end': 'High-End Speakers',
  'wireless-speaker': 'Wireless Speakers',
  tv: 'TVs',
  seating: 'Home Theater Seating',
  remote: 'Universal Remotes',
  cable: 'Speaker Wire & Cables',
  power: 'Surge Protectors & Power',
  popcorn: 'Popcorn Machines',
};

export const CATEGORY_ICONS: Record<string, string> = {
  projector: '📽️', screen: '🖼️', receiver: '🎛️', amplifier: '🔊', subwoofer: '🔉', system: '🎬',
  soundbar: '📶', bookshelf: '🔈', tower: '🗼', center: '🎙️', 'atmos-speaker': '⬆️', 'in-wall': '🧱',
  'high-end': '💎', 'wireless-speaker': '📡', tv: '📺', seating: '🛋️', remote: '🎮', cable: '🔌', power: '⚡', popcorn: '🍿',
};

/** Roundup format (title, meta description and "Before You Buy" box), modelled on our best-performing Bing pages. */
export const FORMAT = {
  /** What every roundup compares products on, used in the meta description. */
  criteria: 'spec sheets, room size and real-world price',
  alsoNeededLabel: 'Also Needed for This Setup',
  alsoNeeded: ['best-speaker-wire-for-home-theater', 'best-surge-protector-for-home-theater', 'best-universal-remote-for-home-theater', 'best-projector-screen-for-home-theater'],
};
