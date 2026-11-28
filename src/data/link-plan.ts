// The site's internal-link plan, copied from thehonestreviewers.com (about 20,000 search visitors a
// month, almost all from Bing-powered engines). Its link structure:
//
//   pillar     every guide and brand review feeds one buyer's guide (roundup). Guides and reviews
//              show a "Ready to Buy?" box pointing at it; the pillar shows its whole cluster.
//   questions  the guides that settle a buyer's questions before they pick (sizing, cost, setup).
//              Shown in the roundup's "Before You Buy" box, above the FAQ.
//   companions the other gear the same setup needs. Shown in "Before You Buy" as well.
//
// Hand-checked: every slug must exist in src/content/articles/ (scripts/check-link-plan.mjs runs in
// the build). Add each new page here in the same commit that publishes it.

export const PILLAR: Record<string, string> = {
  // guides
  'best-movies-for-home-theater': 'best-home-theater-systems',
  'cyber-monday-soundbar-deals': 'best-soundbar-for-home-theater',
  'dolby-atmos-speaker-layout-chart': 'best-dolby-atmos-home-theater-system',
  'home-theater-room-design': 'best-home-theater-systems',
  'home-theater-setup-guide': 'best-home-theater-systems',
  'how-much-does-a-home-theater-cost': 'best-home-theater-systems',
  'how-to-connect-projector-to-laptop': 'best-projector-for-home-theater',
  'is-polk-audio-good': 'best-home-theater-speakers',
  'projector-screen-size-chart': 'best-projector-screen-for-home-theater',
  'projector-throw-distance-chart': 'best-projector-for-home-theater',
  'soundbar-no-sound-hdmi-arc-earc': 'best-soundbar-for-home-theater',
  'soundbar-vs-home-theater': 'best-soundbar-for-home-theater',
  'tv-size-viewing-distance-chart': 'best-tv-for-home-theater',
  // brand reviews
  'bose-home-theater-review': 'best-soundbar-for-home-theater',
  'epson-projector-review': 'best-projector-for-home-theater',
  'klipsch-home-theater-review': 'best-home-theater-speakers',
  'polk-audio-review': 'best-home-theater-speakers',
  'samsung-home-theater-review': 'best-soundbar-for-home-theater',
  'sonos-home-theater-review': 'best-soundbar-for-home-theater',
  'sony-home-theater-review': 'best-home-theater-systems',
  'yamaha-home-theater-review': 'best-home-theater-receiver',
};

const PROJECTOR_Q = ['projector-throw-distance-chart', 'projector-screen-size-chart', 'how-to-connect-projector-to-laptop', 'tv-size-viewing-distance-chart'];
const SPEAKER_Q = ['dolby-atmos-speaker-layout-chart', 'home-theater-setup-guide', 'is-polk-audio-good', 'home-theater-room-design'];
const RECEIVER_Q = ['dolby-atmos-speaker-layout-chart', 'home-theater-setup-guide', 'how-much-does-a-home-theater-cost'];
const SYSTEM_Q = ['how-much-does-a-home-theater-cost', 'soundbar-vs-home-theater', 'home-theater-setup-guide', 'dolby-atmos-speaker-layout-chart'];

export const QUESTIONS: Record<string, string[]> = {
  'best-home-theater-systems': [...SYSTEM_Q, 'home-theater-room-design', 'tv-size-viewing-distance-chart'],
  'best-budget-home-theater-system': SYSTEM_Q,
  'best-home-theater-system-by-lifestyle': SYSTEM_Q,
  'best-wireless-home-theater-system': ['soundbar-vs-home-theater', 'home-theater-setup-guide', 'how-much-does-a-home-theater-cost'],
  'best-dolby-atmos-home-theater-system': ['dolby-atmos-speaker-layout-chart', 'home-theater-setup-guide', 'home-theater-room-design', 'how-much-does-a-home-theater-cost'],
  'best-soundbar-for-home-theater': ['soundbar-vs-home-theater', 'soundbar-no-sound-hdmi-arc-earc', 'dolby-atmos-speaker-layout-chart', 'cyber-monday-soundbar-deals', 'tv-size-viewing-distance-chart'],
  'best-projector-for-home-theater': PROJECTOR_Q,
  'best-4k-projector-for-home-theater': PROJECTOR_Q,
  'best-laser-projector-for-home-theater': PROJECTOR_Q,
  'best-budget-home-theater-projector': PROJECTOR_Q,
  'best-projector-screen-for-home-theater': ['projector-screen-size-chart', 'projector-throw-distance-chart', 'tv-size-viewing-distance-chart'],
  'best-home-theater-receiver': RECEIVER_Q,
  'best-budget-home-theater-receiver': RECEIVER_Q,
  'best-home-theater-amplifier': RECEIVER_Q,
  'best-home-theater-speakers': SPEAKER_Q,
  'best-bookshelf-speakers-for-home-theater': SPEAKER_Q,
  'best-tower-speakers-for-home-theater': SPEAKER_Q,
  'best-center-channel-speaker-for-home-theater': SPEAKER_Q,
  'best-budget-home-theater-speakers': [...SPEAKER_Q, 'how-much-does-a-home-theater-cost'],
  'best-high-end-home-theater-speakers': SPEAKER_Q,
  'best-in-wall-speakers-for-home-theater': ['dolby-atmos-speaker-layout-chart', 'home-theater-room-design', 'home-theater-setup-guide'],
  'best-wireless-speakers-for-home-theater': ['soundbar-vs-home-theater', 'home-theater-setup-guide', 'dolby-atmos-speaker-layout-chart'],
  'best-subwoofer-for-home-theater': ['home-theater-setup-guide', 'home-theater-room-design', 'dolby-atmos-speaker-layout-chart'],
  'best-budget-subwoofer-for-home-theater': ['home-theater-setup-guide', 'how-much-does-a-home-theater-cost', 'home-theater-room-design'],
  'best-tv-for-home-theater': ['tv-size-viewing-distance-chart', 'soundbar-vs-home-theater', 'soundbar-no-sound-hdmi-arc-earc'],
  'best-home-theater-seating': ['home-theater-room-design', 'tv-size-viewing-distance-chart', 'how-much-does-a-home-theater-cost'],
  'best-popcorn-machine-for-home-theater': ['best-movies-for-home-theater', 'home-theater-room-design'],
  'best-speaker-wire-for-home-theater': ['home-theater-setup-guide', 'dolby-atmos-speaker-layout-chart'],
  'best-surge-protector-for-home-theater': ['home-theater-setup-guide', 'how-much-does-a-home-theater-cost'],
  'best-universal-remote-for-home-theater': ['home-theater-setup-guide', 'soundbar-no-sound-hdmi-arc-earc'],
  // brand reviews: the questions of their pillar
  'bose-home-theater-review': ['soundbar-vs-home-theater', 'soundbar-no-sound-hdmi-arc-earc', 'dolby-atmos-speaker-layout-chart'],
  'sonos-home-theater-review': ['soundbar-vs-home-theater', 'soundbar-no-sound-hdmi-arc-earc', 'dolby-atmos-speaker-layout-chart'],
  'samsung-home-theater-review': ['soundbar-vs-home-theater', 'soundbar-no-sound-hdmi-arc-earc', 'tv-size-viewing-distance-chart'],
  'sony-home-theater-review': ['soundbar-vs-home-theater', 'how-much-does-a-home-theater-cost', 'tv-size-viewing-distance-chart'],
  'epson-projector-review': PROJECTOR_Q,
  'klipsch-home-theater-review': SPEAKER_Q,
  'polk-audio-review': SPEAKER_Q,
  'yamaha-home-theater-review': RECEIVER_Q,
};

export const COMPANIONS: Record<string, string[]> = {
  'best-home-theater-systems': ['best-home-theater-receiver', 'best-home-theater-speakers', 'best-subwoofer-for-home-theater', 'best-projector-for-home-theater', 'best-home-theater-seating'],
  'best-budget-home-theater-system': ['best-budget-home-theater-speakers', 'best-budget-home-theater-receiver', 'best-budget-home-theater-projector', 'best-budget-subwoofer-for-home-theater'],
  'best-home-theater-system-by-lifestyle': ['best-soundbar-for-home-theater', 'best-wireless-home-theater-system', 'best-budget-home-theater-system'],
  'best-wireless-home-theater-system': ['best-wireless-speakers-for-home-theater', 'best-soundbar-for-home-theater', 'best-subwoofer-for-home-theater'],
  'best-dolby-atmos-home-theater-system': ['best-in-wall-speakers-for-home-theater', 'best-home-theater-receiver', 'best-soundbar-for-home-theater', 'best-subwoofer-for-home-theater'],
  'best-soundbar-for-home-theater': ['best-subwoofer-for-home-theater', 'best-tv-for-home-theater', 'best-universal-remote-for-home-theater', 'best-surge-protector-for-home-theater'],
  'best-projector-for-home-theater': ['best-projector-screen-for-home-theater', 'best-4k-projector-for-home-theater', 'best-laser-projector-for-home-theater', 'best-home-theater-seating'],
  'best-4k-projector-for-home-theater': ['best-projector-screen-for-home-theater', 'best-laser-projector-for-home-theater', 'best-budget-home-theater-projector'],
  'best-laser-projector-for-home-theater': ['best-projector-screen-for-home-theater', 'best-4k-projector-for-home-theater', 'best-projector-for-home-theater'],
  'best-budget-home-theater-projector': ['best-projector-screen-for-home-theater', 'best-budget-home-theater-system', 'best-budget-home-theater-speakers'],
  'best-projector-screen-for-home-theater': ['best-projector-for-home-theater', 'best-4k-projector-for-home-theater', 'best-laser-projector-for-home-theater'],
  'best-home-theater-receiver': ['best-home-theater-speakers', 'best-subwoofer-for-home-theater', 'best-speaker-wire-for-home-theater', 'best-home-theater-amplifier'],
  'best-budget-home-theater-receiver': ['best-budget-home-theater-speakers', 'best-budget-subwoofer-for-home-theater', 'best-speaker-wire-for-home-theater'],
  'best-home-theater-amplifier': ['best-home-theater-receiver', 'best-home-theater-speakers', 'best-high-end-home-theater-speakers'],
  'best-home-theater-speakers': ['best-home-theater-receiver', 'best-subwoofer-for-home-theater', 'best-center-channel-speaker-for-home-theater', 'best-speaker-wire-for-home-theater'],
  'best-bookshelf-speakers-for-home-theater': ['best-center-channel-speaker-for-home-theater', 'best-subwoofer-for-home-theater', 'best-home-theater-receiver', 'best-tower-speakers-for-home-theater'],
  'best-tower-speakers-for-home-theater': ['best-center-channel-speaker-for-home-theater', 'best-bookshelf-speakers-for-home-theater', 'best-subwoofer-for-home-theater', 'best-home-theater-receiver'],
  'best-center-channel-speaker-for-home-theater': ['best-tower-speakers-for-home-theater', 'best-bookshelf-speakers-for-home-theater', 'best-home-theater-receiver'],
  'best-budget-home-theater-speakers': ['best-budget-home-theater-receiver', 'best-budget-subwoofer-for-home-theater', 'best-speaker-wire-for-home-theater'],
  'best-high-end-home-theater-speakers': ['best-home-theater-amplifier', 'best-home-theater-receiver', 'best-subwoofer-for-home-theater'],
  'best-in-wall-speakers-for-home-theater': ['best-home-theater-receiver', 'best-speaker-wire-for-home-theater', 'best-dolby-atmos-home-theater-system'],
  'best-wireless-speakers-for-home-theater': ['best-wireless-home-theater-system', 'best-soundbar-for-home-theater', 'best-subwoofer-for-home-theater'],
  'best-subwoofer-for-home-theater': ['best-home-theater-receiver', 'best-home-theater-speakers', 'best-soundbar-for-home-theater'],
  'best-budget-subwoofer-for-home-theater': ['best-budget-home-theater-receiver', 'best-budget-home-theater-speakers', 'best-budget-home-theater-system'],
  'best-tv-for-home-theater': ['best-soundbar-for-home-theater', 'best-universal-remote-for-home-theater', 'best-surge-protector-for-home-theater'],
  'best-home-theater-seating': ['best-popcorn-machine-for-home-theater', 'best-projector-for-home-theater', 'best-home-theater-systems'],
  'best-popcorn-machine-for-home-theater': ['best-home-theater-seating', 'best-projector-for-home-theater'],
  'best-speaker-wire-for-home-theater': ['best-home-theater-receiver', 'best-in-wall-speakers-for-home-theater', 'best-home-theater-speakers'],
  'best-surge-protector-for-home-theater': ['best-home-theater-receiver', 'best-tv-for-home-theater', 'best-universal-remote-for-home-theater'],
  'best-universal-remote-for-home-theater': ['best-home-theater-receiver', 'best-soundbar-for-home-theater', 'best-tv-for-home-theater'],
  // brand reviews
  'bose-home-theater-review': ['best-soundbar-for-home-theater', 'best-subwoofer-for-home-theater', 'best-wireless-speakers-for-home-theater'],
  'sonos-home-theater-review': ['best-soundbar-for-home-theater', 'best-subwoofer-for-home-theater', 'best-wireless-speakers-for-home-theater'],
  'samsung-home-theater-review': ['best-soundbar-for-home-theater', 'best-tv-for-home-theater', 'best-dolby-atmos-home-theater-system'],
  'sony-home-theater-review': ['best-home-theater-systems', 'best-tv-for-home-theater', 'best-soundbar-for-home-theater'],
  'epson-projector-review': ['best-projector-for-home-theater', 'best-projector-screen-for-home-theater', 'best-4k-projector-for-home-theater'],
  'klipsch-home-theater-review': ['best-home-theater-speakers', 'best-tower-speakers-for-home-theater', 'best-home-theater-receiver'],
  'polk-audio-review': ['best-home-theater-speakers', 'best-budget-home-theater-speakers', 'best-in-wall-speakers-for-home-theater'],
  'yamaha-home-theater-review': ['best-home-theater-receiver', 'best-budget-home-theater-receiver', 'best-home-theater-speakers'],
};

/** Guides and reviews whose pillar is this roundup. */
export function clusterOf(slug: string): string[] {
  return Object.entries(PILLAR).filter(([, p]) => p === slug).map(([s]) => s);
}

/** Pages that share this page's pillar (its siblings), pillar excluded. */
export function siblingsOf(slug: string): string[] {
  const p = PILLAR[slug];
  return p ? clusterOf(p).filter((s) => s !== slug) : [];
}
