/**
 * How to update firmware, per product family. Only menu paths verified against the maker's own
 * manual or support pages belong here (sources listed per family). No version numbers: they change.
 * Rendered as a "Firmware & Updates" section and FAQ on each listed /gear/ page.
 */
export interface FirmwareFamily {
  name: string;
  slugs: string[];
  /** On-screen menu path for an over-the-network update. */
  network?: string;
  /** How to turn on automatic updates, if supported. */
  auto?: string;
  /** USB update outline, if supported. */
  usb?: string;
  /** Maker's support / downloads page for release notes and files. */
  supportUrl: string;
  cautions?: string;
  sources: string[];
}

export const firmware: FirmwareFamily[] = [];

export const firmwareFor = (slug: string) => firmware.find((f) => f.slugs.includes(slug));
