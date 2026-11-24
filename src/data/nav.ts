export interface NavLink { title: string; blurb: string; icon: string; url: string }
export interface NavGroup { label: string; links: NavLink[] }

/** Category links under the logo (the enthusiastreview.com nav strip). */
export const QUICK = [
  { title: 'Systems', url: '/best-home-theater-systems/' },
  { title: 'Projectors', url: '/best-projector-for-home-theater/' },
  { title: 'Receivers', url: '/best-home-theater-receiver/' },
  { title: 'Speakers', url: '/best-home-theater-speakers/' },
  { title: 'Subwoofers', url: '/best-subwoofer-for-home-theater/' },
  { title: 'All Gear', url: '/gear/' },
  { title: 'Compare', url: '/compare/' },
  { title: 'Guides', url: '/guides/' },
];

export const NAV: NavGroup[] = [
  {
    label: 'Audio',
    links: [
      { title: 'Best Home Theater Systems', blurb: 'Complete 5.1 to 7.1.4 setups', icon: 'system', url: '/best-home-theater-systems/' },
      { title: 'Best AV Receivers', blurb: 'The brain of the system', icon: 'receiver', url: '/best-home-theater-receiver/' },
      { title: 'Best Subwoofers', blurb: 'Bass you feel, not just hear', icon: 'subwoofer', url: '/best-subwoofer-for-home-theater/' },
      { title: 'Best Soundbars', blurb: 'One box, real surround', icon: 'soundbar', url: '/best-soundbar-for-home-theater/' },
      { title: 'Best Dolby Atmos Systems', blurb: 'Height channels done right', icon: 'atmos-speaker', url: '/best-dolby-atmos-home-theater-system/' },
      { title: 'Best Wireless Systems', blurb: 'Surround without the wire runs', icon: 'wireless-speaker', url: '/best-wireless-home-theater-system/' },
    ],
  },
  {
    label: 'Speakers',
    links: [
      { title: 'Best Home Theater Speakers', blurb: 'Our overall speaker picks', icon: 'bookshelf', url: '/best-home-theater-speakers/' },
      { title: 'Best Wireless Speakers', blurb: 'Cable-free surround', icon: 'wireless-speaker', url: '/best-wireless-speakers-for-home-theater/' },
      { title: 'Best In-Wall & Ceiling', blurb: 'Hidden speakers, real sound', icon: 'in-wall', url: '/best-in-wall-speakers-for-home-theater/' },
      { title: 'Best Center Channel', blurb: 'Where the dialogue lives', icon: 'center', url: '/best-center-channel-speaker-for-home-theater/' },
      { title: 'Best Bookshelf Speakers', blurb: 'Fronts and surrounds', icon: 'bookshelf', url: '/best-bookshelf-speakers-for-home-theater/' },
      { title: 'Best Tower Speakers', blurb: 'Full-range front stage', icon: 'tower', url: '/best-tower-speakers-for-home-theater/' },
    ],
  },
  {
    label: 'Projectors & TVs',
    links: [
      { title: 'Best Home Theater Projectors', blurb: 'Our overall projector picks', icon: 'projector', url: '/best-projector-for-home-theater/' },
      { title: 'Best 4K Projectors', blurb: 'Native and pixel-shift 4K', icon: 'k4', url: '/best-4k-projector-for-home-theater/' },
      { title: 'Best Budget Projectors', blurb: 'Big picture, small spend', icon: 'dollar', url: '/best-budget-home-theater-projector/' },
      { title: 'Best Projector Screens', blurb: 'Matte white to ALR', icon: 'screen', url: '/best-projector-screen-for-home-theater/' },
      { title: 'Best TVs for Home Theater', blurb: 'OLED vs Mini-LED', icon: 'tv', url: '/best-tv-for-home-theater/' },
      { title: 'Throw Distance Calculator', blurb: 'Where to mount the projector', icon: 'ruler', url: '/tools/projector-throw-calculator/' },
    ],
  },
  {
    label: 'Room & Seating',
    links: [
      { title: 'Best Home Theater Seating', blurb: 'Recliners, rows and sofas', icon: 'seating', url: '/best-home-theater-seating/' },
      { title: 'Home Theater Setup Guide', blurb: 'Plan it in the right order', icon: 'compass', url: '/home-theater-setup-guide/' },
      { title: 'Room Design: Paint & Carpet', blurb: 'Colors, carpet and light', icon: 'palette', url: '/home-theater-room-design/' },
      { title: 'Best Movies for Home Theater', blurb: 'Demo discs for sound and picture', icon: 'film', url: '/best-movies-for-home-theater/' },
      { title: 'Viewing Distance Calculator', blurb: 'Screen size for your seat', icon: 'ruler', url: '/tools/viewing-distance-calculator/' },
    ],
  },
  {
    label: 'Database',
    links: [
      { title: 'All Home Theater Gear', blurb: 'Every product, one table', icon: 'gear', url: '/gear/' },
      { title: 'Brands', blurb: 'Every brand, every product', icon: 'brand', url: '/brands/' },
      { title: 'Compare Two Products', blurb: 'Spec sheets side by side', icon: 'compare', url: '/compare/' },
      { title: 'Glossary', blurb: 'Atmos, eARC, throw ratio…', icon: 'glossary', url: '/glossary/' },
      { title: 'How We Score', blurb: 'The BHTR Score method', icon: 'score', url: '/how-we-test/' },
    ],
  },
];

export const FOOTER_CATEGORIES = [
  { title: 'Home Theater Systems', url: '/best-home-theater-systems/' },
  { title: 'Projectors', url: '/best-projector-for-home-theater/' },
  { title: 'Speakers', url: '/best-home-theater-speakers/' },
  { title: 'AV Receivers', url: '/best-home-theater-receiver/' },
  { title: 'Subwoofers', url: '/best-subwoofer-for-home-theater/' },
  { title: 'Seating', url: '/best-home-theater-seating/' },
  { title: 'All Best Lists', url: '/best-of/' },
];

export const FOOTER_COMPANY = [
  { title: 'About Us', url: '/about/' },
  { title: 'How We Score', url: '/how-we-test/' },
  { title: 'Editorial Policy', url: '/editorial-policy/' },
  { title: 'Affiliate Disclosure', url: '/affiliate-disclosure/' },
  { title: 'Privacy Policy', url: '/privacy-policy/' },
  { title: 'Contact', url: '/contact/' },
  { title: 'Sitemap', url: '/sitemap/' },
];
