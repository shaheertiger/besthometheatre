import { SITE } from './site';

export interface Author {
  slug: string;
  name: string;
  role: string;
  short: string;
  summary: string;
  bio: string[];
  beat: string[];
  background: [string, string, string][];
  sameAs: string[];
  credential: string;
  alumniOf: string;
  knowsAbout: string[];
}

// The site's author, the same person who writes enthusiastreview.com. Everything here is from his
// real profile. Do not add roles, credentials or claims he has not made.
export const AUTHOR: Author = {
  slug: 'justin-lee',
  name: 'Justin Lee',
  role: 'Author',
  short: `Justin Lee writes every buying guide, comparison and product verdict on ${SITE.name}. Software engineer: ex-Apple, ex-Tesla firmware, Waterloo CS.`,
  summary: 'Software engineer (ex-Apple, ex-Tesla firmware) with a background in embedded software and digital signal processing. University of Waterloo Computer Science.',
  bio: [
    `Justin Lee writes the buying guides, brand reviews, comparisons and product verdicts on ${SITE.name}.`,
    'He is a software engineer whose work has sat close to the hardware: embedded and firmware engineering and digital signal processing. Signal processing is the layer where room correction, bass management and Dolby Atmos rendering live, and it is why our pages spend so much time on what a spec sheet actually promises.',
    'Every page is researched against the manufacturer spec sheet, published independent measurements and owner reports, then converted into room maths: throw distance, amplifier headroom, sub output for room volume. We do not accept payment for placement.',
  ],
  beat: ['AV receivers and room correction', 'Projectors and screens', 'Speakers and subwoofers', 'Soundbars and Dolby Atmos', 'Firmware, HDMI and eARC'],
  background: [
    ['Apple', 'Software Engineer (2024–2026) and Software Engineer Intern (2023)', 'Cupertino'],
    ['Tesla', 'Firmware Engineer Intern (2023)', 'Palo Alto'],
    ['Coherent Logix', 'Digital Signal Processing Software Engineer Intern (2022)', 'Waterloo'],
    ['Peraso', 'Embedded Software Engineer co-op (2021–2022)', 'Toronto'],
    ['University of Waterloo', "Bachelor's degree in Computer Science (2019–2024)", ''],
  ],
  sameAs: ['https://www.linkedin.com/in/justinllee32/'],
  credential: "Bachelor's degree in Computer Science",
  alumniOf: 'University of Waterloo',
  knowsAbout: ['Embedded software', 'Firmware', 'Digital signal processing', 'Home theater audio and video'],
};

export const authorUrl = `/authors/${AUTHOR.slug}/`;

export function authorSchema() {
  const a = AUTHOR;
  return {
    '@type': 'Person',
    name: a.name,
    url: `${SITE.url}${authorUrl}`,
    sameAs: a.sameAs,
    description: a.summary,
    alumniOf: { '@type': 'CollegeOrUniversity', name: a.alumniOf },
    hasCredential: { '@type': 'EducationalOccupationalCredential', credentialCategory: 'degree', name: a.credential },
    knowsAbout: a.knowsAbout,
  };
}
