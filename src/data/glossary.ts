export interface Term { slug: string; term: string; short: string; body: string; related: { title: string; url: string }[] }

export const glossary: Term[] = [
  {
    slug: 'dolby-atmos',
    term: 'Dolby Atmos',
    short: 'An object-based surround format that adds height channels, so sound can come from above as well as around you.',
    body: `Traditional surround formats such as Dolby Digital 5.1 assign each sound to a fixed channel. **Dolby Atmos** instead treats up to 128 sounds as "objects" with a position in 3D space, and your receiver or soundbar renders them to whatever speakers you actually have.

Atmos layouts are written as three numbers: **5.1.2** means five ear-level speakers, one subwoofer and two height speakers. Common layouts are 5.1.2, 5.1.4 and 7.1.4. Height effects come from in-ceiling speakers (best), upward-firing "elevation" modules that bounce sound off the ceiling, or virtualization processing in a soundbar (weakest).

**What you need:** an Atmos source (most 4K Blu-rays, Netflix, Disney+, Apple TV+ and Max titles), an HDMI eARC or direct HDMI connection that passes Dolby TrueHD or Dolby Digital Plus, and an Atmos-capable receiver or soundbar. Upward-firing modules need a flat, reflective ceiling 7.5 to 12 feet high to work as intended.

Dolby's guidance for in-ceiling speakers is to place them slightly in front of and behind the main listening position (about 30–55° elevation for the front pair).`,
    related: [
      { title: 'Best Dolby Atmos Home Theater Systems', url: '/best-dolby-atmos-home-theater-system/' },
      { title: 'Best In-Wall & Ceiling Speakers', url: '/best-in-wall-speakers-for-home-theater/' },
      { title: 'DTS:X explained', url: '/glossary/dts-x/' },
    ],
  },
  {
    slug: 'dts-x',
    term: 'DTS:X',
    short: "DTS's object-based surround format and Dolby Atmos's main rival. It is flexible about speaker layout and needs no dedicated height channels.",
    body: `**DTS:X** is the object-based answer to Dolby Atmos from DTS (now part of Xperi). Like Atmos it positions sounds in 3D space rather than locking them to channels. Its main practical difference is that it does not mandate a specific speaker layout, so it can adapt to the speakers you have.

Most mid-range and better AV receivers decode both formats, and many 4K Blu-rays (especially from Lionsgate and Paramount) carry DTS:X soundtracks. Streaming services rarely use DTS:X; they favour Dolby Atmos over Dolby Digital Plus.

**DTS Neural:X** is the related upmixer: it spreads stereo or 5.1 sources across height speakers. Some soundbars support Atmos but not DTS:X, so check the spec sheet if your disc collection leans DTS.`,
    related: [
      { title: 'Dolby Atmos explained', url: '/glossary/dolby-atmos/' },
      { title: 'Best Home Theater Receivers', url: '/best-home-theater-receiver/' },
    ],
  },
  {
    slug: 'earc',
    term: 'eARC (Enhanced Audio Return Channel)',
    short: 'An HDMI feature that sends full-resolution audio, including lossless Dolby Atmos, from your TV back to a receiver or soundbar.',
    body: `When your streaming apps run on the TV, the TV has to send their audio back down the HDMI cable to your receiver or soundbar. The original **ARC** could only carry compressed formats (Dolby Digital, Dolby Digital Plus with Atmos, DTS). **eARC**, introduced with HDMI 2.1, has far more bandwidth and carries uncompressed multichannel PCM and lossless Dolby TrueHD / DTS-HD Master Audio, including TrueHD Atmos.

**How to use it:** connect the TV's port labelled "eARC" to the receiver's or soundbar's eARC/ARC HDMI output, then turn on HDMI-CEC and eARC in the TV's settings. Use an Ultra High Speed or Premium High Speed HDMI cable.

eARC matters most if you play lossless audio from a player connected to the TV. Streaming Atmos is Dolby Digital Plus, which plain ARC can already carry.`,
    related: [
      { title: 'HDMI 2.1 explained', url: '/glossary/hdmi-2-1/' },
      { title: 'Best Soundbars for Home Theater', url: '/best-soundbar-for-home-theater/' },
    ],
  },
  {
    slug: 'hdmi-2-1',
    term: 'HDMI 2.1',
    short: 'The current HDMI standard: up to 48 Gbps for 4K at 120 Hz, 8K, VRR and ALLM gaming features, and eARC.',
    body: `**HDMI 2.1** raises bandwidth to up to 48 Gbps (FRL). For home theater that means **4K at 120 Hz** for PS5, Xbox Series X and PC gaming, plus **VRR** (variable refresh rate) and **ALLM** (auto low latency mode), which pass through a compatible receiver to the TV.

Not every "HDMI 2.1" port supports every feature. Many receivers offer only one to three 40 Gbps 4K/120 inputs. Count the ports that list *4K/120* or *8K/60* on the spec sheet, not the total number of HDMI inputs.

If your consoles connect straight to the TV and only audio goes to the receiver over eARC, HDMI 2.1 on the receiver matters much less.`,
    related: [
      { title: 'eARC explained', url: '/glossary/earc/' },
      { title: 'Best Home Theater Receivers', url: '/best-home-theater-receiver/' },
      { title: 'Best TVs for Home Theater', url: '/best-tv-for-home-theater/' },
    ],
  },
  {
    slug: 'throw-ratio',
    term: 'Throw Ratio',
    short: 'Projector throw distance divided by image width. It tells you how far back the projector must sit for a given screen size.',
    body: `**Throw ratio = throw distance ÷ image width.** A projector with a 1.5:1 throw ratio needs 1.5 feet of distance for every foot of image width.

**Worked example:** a 120-inch 16:9 screen is about 104.6 inches (8.7 ft) wide. At 1.5:1 the lens must sit about 157 inches (13.1 ft) from the screen. At 1.2:1 it is about 10.5 ft. A zoom lens gives a range (e.g. 1.13–1.47:1), so you get some mounting flexibility.

- **Long/standard throw:** 1.3:1 and up, typical home theater projectors mounted at the back of the room.
- **Short throw:** about 0.4–1.0:1, a 100-inch image from roughly 3–7 feet.
- **Ultra short throw (UST):** under 0.4:1. Sits on a console inches from the wall.

Use our [throw distance calculator](/tools/projector-throw-calculator/) to check your room before you buy.`,
    related: [
      { title: 'Projector Throw Distance Calculator', url: '/tools/projector-throw-calculator/' },
      { title: 'Best Projectors for Home Theater', url: '/best-projector-for-home-theater/' },
      { title: 'Best Laser & Short-Throw Projectors', url: '/best-laser-projector-for-home-theater/' },
    ],
  },
  {
    slug: 'ansi-lumens',
    term: 'ANSI & ISO Lumens',
    short: 'Standardized measures of projector brightness. Only ANSI or ISO 21118 figures are comparable between brands.',
    body: `Projector brightness is quoted in lumens, but not all lumens are equal. **ANSI lumens** and **ISO 21118 lumens** are measured to a standard method and are broadly comparable. Marketing terms like "LED lumens", "light source lumens" or unspecified "lumens" on cheap projectors can be several times higher than the real output.

**How much do you need?** For a dark, dedicated room and a 100–120 inch matte white screen, about **1,500–2,000 ANSI lumens** is plenty for SDR. HDR benefits from more headroom. A living room with lights on needs 2,500–3,000+ lumens and ideally an [ALR screen](/glossary/alr-screen/).

Calibrated "movie" modes typically deliver noticeably less than the headline figure, which is measured in the brightest (often greenish) mode.`,
    related: [
      { title: 'ALR screens explained', url: '/glossary/alr-screen/' },
      { title: 'Best Budget Home Theater Projectors', url: '/best-budget-home-theater-projector/' },
    ],
  },
  {
    slug: 'pixel-shifting',
    term: 'Pixel Shifting (4K Enhancement)',
    short: 'A technique where a lower-resolution chip rapidly shifts each pixel to put a 4K (3840×2160) image on screen.',
    body: `Native 4K projector chips are expensive, so most affordable "4K" projectors use **pixel shifting**. Texas Instruments' 0.47-inch DLP XPR chip (1920×1080 mirrors) shifts four times per frame to address all 8.3 million pixels of a UHD image. Epson's "4K PRO-UHD" and JVC's "e-shift" do a similar trick with 1080p LCD or D-ILA panels, shifting diagonally.

**Does it matter?** From a normal seating distance, a good pixel-shift DLP looks very close to native 4K on a 100–120 inch screen. Native 4K panels (Sony SXRD, JVC D-ILA in the NZ range) look slightly crisper and are paired with better contrast and optics, which matter more than the resolution method.

Contrast, black level, brightness and lens quality usually make a bigger visible difference than native vs shifted 4K.`,
    related: [
      { title: 'Best 4K Projectors for Home Theater', url: '/best-4k-projector-for-home-theater/' },
      { title: 'HDR explained', url: '/glossary/hdr/' },
    ],
  },
  {
    slug: 'hdr',
    term: 'HDR (HDR10, HDR10+, Dolby Vision, HLG)',
    short: 'High dynamic range video formats that carry brighter highlights and wider color than standard video.',
    body: `**HDR** content is mastered with highlights far brighter than standard dynamic range (SDR) and a wider color gamut. The main formats:

- **HDR10:** the universal baseline with static metadata. Every HDR TV and projector supports it.
- **HDR10+:** adds scene-by-scene dynamic metadata. Backed by Samsung, Amazon and some projector makers.
- **Dolby Vision:** dynamic metadata, widely used by Netflix, Disney+ and Apple TV+. Not supported by Samsung TVs.
- **HLG:** a broadcast format for live TV.

Projectors cannot reach the brightness of TVs, so they **tone map** HDR down to what they can show. Good dynamic tone mapping (e.g. Epson, JVC Frame Adapt HDR) matters more on a projector than which logos are on the box.`,
    related: [
      { title: 'Best TVs for Home Theater', url: '/best-tv-for-home-theater/' },
      { title: 'Best 4K Projectors', url: '/best-4k-projector-for-home-theater/' },
    ],
  },
  {
    slug: 'alr-screen',
    term: 'ALR (Ambient Light Rejecting) Screen',
    short: 'A projector screen that reflects light coming from the projector toward you while rejecting light from other angles.',
    body: `An **ALR screen** uses an angular-reflective surface so that light hitting it from the projector's direction is sent toward the audience, while light from windows and ceiling lamps is absorbed or reflected away. The result is far better contrast in rooms that aren't fully dark.

**Match the screen to the projector type.** Standard-throw ALR screens (e.g. grey or angular-reflective) work with ceiling- or shelf-mounted projectors. Ultra short throw projectors need a dedicated **UST/CLR** (ceiling light rejecting) screen with a ridged surface, because the light arrives from below at a steep angle. Using the wrong type causes hot-spotting or a dim image.

In a dedicated, dark-walled theater, a quality matte white screen (gain around 1.0–1.3) usually looks more uniform than ALR.`,
    related: [
      { title: 'Best Projector Screens for Home Theater', url: '/best-projector-screen-for-home-theater/' },
      { title: 'ANSI lumens explained', url: '/glossary/ansi-lumens/' },
    ],
  },
  {
    slug: 'room-correction',
    term: 'Room Correction (Audyssey, Dirac, YPAO, ARC Genesis)',
    short: 'Software in a receiver or soundbar that measures your room with a microphone and adjusts levels, distances and EQ.',
    body: `Your room changes how speakers sound, especially in the bass, where reflections create peaks and nulls of 10 dB or more. **Room correction** uses a supplied microphone to measure each speaker at several seats, then sets speaker distances, levels, crossover points and corrective EQ.

- **Audyssey** (Denon, Marantz): MultEQ XT32 in higher models; the MultEQ Editor app allows custom target curves.
- **Dirac Live** (Onkyo, Pioneer, Integra, some NAD/Arcam): highly regarded; Bass Control and ART add multi-sub management at extra cost.
- **YPAO** (Yamaha): simpler, with R.S.C. reflection control in mid and upper models.
- **Anthem ARC Genesis** (Anthem, Paradigm, MartinLogan): excellent, mainly in premium gear.

Run it with the microphone at ear height on a tripod, not on the sofa cushion, and keep the room quiet.`,
    related: [
      { title: 'Best Home Theater Receivers', url: '/best-home-theater-receiver/' },
      { title: 'Home Theater Setup Guide', url: '/home-theater-setup-guide/' },
    ],
  },
  {
    slug: 'crossover',
    term: 'Crossover (Bass Management)',
    short: 'The frequency below which your receiver sends bass to the subwoofer instead of the speakers. 80 Hz is the THX standard.',
    body: `**Bass management** routes low frequencies from your main speakers to the subwoofer below a **crossover frequency**. Small speakers can't reproduce deep bass cleanly, so sending it to a sub reduces distortion and frees amplifier power.

**80 Hz** is the THX recommendation and a sensible default for almost every system, including towers. Set small bookshelf or satellite speakers to 100–120 Hz if their response rolls off early. Avoid crossovers above about 120 Hz, because bass becomes localizable and you'll hear where the sub is.

Set speakers to "Small" in the receiver (which enables the crossover), set the subwoofer's own low-pass control to its highest setting or LFE/bypass, and let the receiver do the filtering.`,
    related: [
      { title: 'LFE explained', url: '/glossary/lfe/' },
      { title: 'Best Subwoofers for Home Theater', url: '/best-subwoofer-for-home-theater/' },
    ],
  },
  {
    slug: 'lfe',
    term: 'LFE (Low-Frequency Effects)',
    short: 'The ".1" in 5.1: a dedicated bass-effects channel on movie soundtracks, routed to the subwoofer.',
    body: `The **LFE channel** carries extra low-frequency effects (explosions, rumble, impacts) mixed specifically for the subwoofer. It is band-limited to 120 Hz and mixed 10 dB hotter than the other channels to give headroom for big moments.

LFE is not the same as all the bass in a movie: plenty of bass lives in the main channels too. With [bass management](/glossary/crossover/), your receiver combines LFE with redirected bass from the main speakers and sends both to the subwoofer.

Connect your subwoofer to the receiver's **Sub Out/Pre Out (LFE)** jack with a single RCA cable, and use the sub's LFE input if it has one.`,
    related: [
      { title: 'Crossover explained', url: '/glossary/crossover/' },
      { title: 'Best Budget Subwoofers', url: '/best-budget-subwoofer-for-home-theater/' },
    ],
  },
  {
    slug: 'speaker-sensitivity',
    term: 'Speaker Sensitivity',
    short: 'How loud a speaker plays from 1 watt, measured at 1 meter. Every 3 dB of extra sensitivity halves the amplifier power you need.',
    body: `**Sensitivity** (in dB at 1 W / 1 m, or 2.83 V / 1 m) tells you how efficiently a speaker turns power into volume. Each **+3 dB requires double the power**; +10 dB requires ten times the power.

**Worked example:** to reach 105 dB peaks at 1 m, an 85 dB speaker needs 100 W, an 88 dB speaker needs 50 W, and a 96 dB speaker such as the Klipsch R-600F needs only about 8 W. At a 3 m seat you lose roughly 9–10 dB more, so the gap matters in big rooms.

High-sensitivity speakers pair well with modest receivers. Low-sensitivity, low-[impedance](/glossary/impedance/) speakers benefit from a stronger amp or an external [power amplifier](/best-home-theater-amplifier/).`,
    related: [
      { title: 'Impedance explained', url: '/glossary/impedance/' },
      { title: 'Best Home Theater Speakers', url: '/best-home-theater-speakers/' },
    ],
  },
  {
    slug: 'impedance',
    term: 'Impedance (Ohms)',
    short: "A speaker's electrical resistance to the amplifier's signal. Lower impedance draws more current and works the amp harder.",
    body: `Speaker **impedance** is quoted in ohms (Ω) as a nominal figure (typically 4, 6 or 8 Ω), but real impedance swings with frequency and can dip well below nominal.

Most AV receivers are rated for 6–8 Ω speakers. Many have a 4/6 Ω setting that limits voltage to keep the amp cool, at the cost of some headroom. **8 Ω speakers** are the easiest load; **4 Ω** speakers in large rooms played loud are where an external amplifier helps.

Impedance and [sensitivity](/glossary/speaker-sensitivity/) together tell you how demanding a speaker is. A 6 Ω, 90 dB speaker is an easy match for almost any receiver.`,
    related: [
      { title: 'Speaker sensitivity explained', url: '/glossary/speaker-sensitivity/' },
      { title: 'Best Home Theater Amplifiers', url: '/best-home-theater-amplifier/' },
    ],
  },
  {
    slug: 'surround-sound-channels',
    term: 'Surround Channels (5.1, 7.1, 5.1.2, 7.1.4)',
    short: 'Channel notation: ear-level speakers, then subwoofers, then height speakers. 5.1.2 = 5 speakers + 1 sub + 2 heights.',
    body: `Surround layouts are written **ear-level.subwoofers.height**:

- **5.1:** left, center, right, two surrounds, one sub. The best-value starting point for most rooms.
- **7.1:** adds two rear surrounds behind the seats. Worth it in rooms deeper than about 15 ft or with seating against no back wall.
- **5.1.2 / 5.1.4:** adds two or four height speakers for [Dolby Atmos](/glossary/dolby-atmos/).
- **7.1.4:** the "reference" Atmos layout. Needs a 9- to 11-channel receiver, or extra amplification.

A good 5.1 usually beats a mediocre 7.1. Spend on the front three speakers and the subwoofer first, then add surrounds and heights.`,
    related: [
      { title: 'Soundbar vs Home Theater', url: '/soundbar-vs-home-theater/' },
      { title: 'Best Home Theater Systems', url: '/best-home-theater-systems/' },
      { title: 'Home Theater Setup Guide', url: '/home-theater-setup-guide/' },
    ],
  },
];
