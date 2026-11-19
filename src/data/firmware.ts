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
  /** Per-model support pages, where the maker has them (slug -> URL). */
  supportUrls?: Record<string, string>;
  cautions?: string;
  sources: string[];
}

export const firmware: FirmwareFamily[] = [
  {
    "name": "Denon 2022+ AV receivers",
    "slugs": [
      "denon-avr-s770h",
      "denon-avr-x1800h",
      "denon-avr-x2800h",
      "denon-avr-x3800h",
      "denon-avr-x4800h"
    ],
    "network": "SETUP › General › Firmware › Check for Update › Update Now",
    "auto": "Turn on **SETUP › General › Firmware › Auto-Update** (off by default) and updates install while the receiver is in standby. Leave **Allow Update** on.",
    "supportUrl": "https://help.denon.com/en_US/AVR-X3800H",
    "supportUrls": {
      "denon-avr-s770h": "https://help.denon.com/en_US/AVR-S770H",
      "denon-avr-x1800h": "https://help.denon.com/en_US/AVR-X1800H",
      "denon-avr-x2800h": "https://help.denon.com/en_US/AVR-X2800H",
      "denon-avr-x3800h": "https://help.denon.com/en_US/AVR-X3800H",
      "denon-avr-x4800h": "https://help.denon.com/en_US/AVR-X4800H"
    },
    "cautions": "The update takes about an hour and some settings may reset. Do not turn the receiver off until it finishes. If an update fails, hold the power button for more than 5 seconds; the update restarts after about a minute.",
    "sources": [
      "https://manuals.denon.com/AVRX3800H/NA/EN/GFNFSYldiskxse.php",
      "https://manuals.denon.com/AVRS770H/NA/EN/GFNFSYldiskxse.php",
      "https://manuals.denon.com/AVRX1800H/NA/EN/GFNFSYldiskxse.php",
      "https://manuals.denon.com/AVRX2800H/NA/EN/GFNFSYldiskxse.php",
      "https://manuals.denon.com/AVRX4800H/NA/EN/GFNFSYldiskxse.php",
      "https://manuals.denon.com/AVRX3800H/NA/EN/GFNFSYwahcrdvi.php",
      "https://www.denon.com/en/product/av-receivers/avr-s770h/AVRS770H.html",
      "https://www.denon.com/en/product/av-receivers/avr-x1800h/AVRX1800H.html"
    ]
  },
  {
    "name": "Marantz Cinema 50 / Cinema 60",
    "slugs": [
      "marantz-cinema-60",
      "marantz-cinema-50"
    ],
    "network": "SETUP › General › Firmware › Check for Update › Update Now",
    "auto": "Turn on **SETUP › General › Firmware › Auto-Update** (off by default) and updates install in standby. Leave **Allow Update** on.",
    "supportUrl": "https://www.marantz.com/en/product/av-receivers/cinema-60/CINEMA60.html",
    "supportUrls": {
      "marantz-cinema-60": "https://www.marantz.com/en/product/av-receivers/cinema-60/CINEMA60.html",
      "marantz-cinema-50": "https://www.marantz.com/en/product/av-receivers/cinema-50/CINEMA50.html"
    },
    "cautions": "The update takes about an hour and some settings may reset. Do not turn the receiver off until it finishes.",
    "sources": [
      "https://manuals.marantz.com/Cinema60/NA/EN/GFNFSYldiskxse.php",
      "https://manuals.marantz.com/Cinema50/NA/EN/GFNFSYldiskxse.php",
      "https://www.marantz.com/en/product/av-receivers/cinema-60/CINEMA60.html",
      "https://www.marantz.com/en/product/av-receivers/cinema-50/CINEMA50.html"
    ]
  },
  {
    "name": "Yamaha RX-V4A / RX-V6A",
    "slugs": [
      "yamaha-rx-v4a",
      "yamaha-rx-v6a"
    ],
    "network": "SETUP › Function › Firmware Update › Network Update",
    "auto": "There is no auto-install, but you can reserve an update on the update screen so it runs the next time you turn the receiver off.",
    "usb": "Download the file and instructions from Yamaha's downloads page for your model, then go to **SETUP › Function › Firmware Update › USB Update**. Yamaha recommends USB when the receiver is on Wi-Fi or a slow connection.",
    "supportUrl": "https://usa.yamaha.com/products/audio_visual/av_receivers_amps/rx-v6a/downloads.html",
    "supportUrls": {
      "yamaha-rx-v4a": "https://usa.yamaha.com/products/audio_visual/av_receivers_amps/rx-v4a/downloads.html",
      "yamaha-rx-v6a": "https://usa.yamaha.com/products/audio_visual/av_receivers_amps/rx-v6a/downloads.html"
    },
    "cautions": "A network update takes about 20 minutes. Do not operate the receiver or disconnect power or network cables until **UPDATE SUCCESS PLEASE POWER OFF!** appears, then press the front-panel power button.",
    "sources": [
      "https://manual.yamaha.com/av/20/rxv6a/en-US/319186827.html",
      "https://manual.yamaha.com/av/20/rxv6a/en-US/319708939.html",
      "https://manual.yamaha.com/av/20/rxv6a/en-US/5646291851.html",
      "https://manual.yamaha.com/av/20/rxv6a/en-US/319780619.html",
      "https://manual.yamaha.com/av/20/rxv6a/en-US/5646299275.html",
      "https://manual.yamaha.com/av/20/rxv4a/en-US/319186827.html",
      "https://manual.yamaha.com/av/20/rxv4a/en-US/319780619.html"
    ]
  },
  {
    "name": "Yamaha RX-A4A (AVENTAGE)",
    "slugs": [
      "yamaha-rx-a4a"
    ],
    "network": "SETUP › System › Firmware Update › Network Update",
    "auto": "There is no auto-install; choose **LATER** on the update screen to run it when you next turn the receiver off.",
    "usb": "Download the file from Yamaha's RX-A4A downloads page, then go to **SETUP › System › Firmware Update › USB Update**.",
    "supportUrl": "https://usa.yamaha.com/products/audio_visual/av_receivers_amps/rx-a4a/downloads.html",
    "cautions": "A network update takes about 20 minutes. Do not operate the receiver or disconnect power or network cables until it finishes.",
    "sources": [
      "https://manual.yamaha.com/av/20/rxa4a/en-US/319186827.html",
      "https://manual.yamaha.com/av/20/rxa4a/en-US/319780619.html",
      "https://manual.yamaha.com/av/20/rxa4a/en-US/5646299275.html"
    ]
  },
  {
    "name": "Sony STR-AN1000",
    "slugs": [
      "sony-str-an1000"
    ],
    "network": "Home › Setup › Software Update › Network Update",
    "auto": "Turn on **Setup › Network Settings › Auto Update Settings › Auto Update** and set your time zone; updates run between 2 and 5 a.m.",
    "usb": "Download the update from Sony's support site, then go to **Setup › Software Update › USB Update**.",
    "supportUrl": "https://www.sony.com/am/support",
    "cautions": "An update can take about 20 minutes and cannot be rolled back. Do not turn the receiver off or unplug the power or network cable until it finishes.",
    "sources": [
      "https://helpguide.sony.net/ha/strtaan10/v1/en/contents/TP1000547608.html",
      "https://helpguide.sony.net/ha/strtaan10/v1/en/contents/TP1000549506.html",
      "https://helpguide.sony.net/ha/strtaan10/v1/en/contents/TP1000544528.html"
    ]
  },
  {
    "name": "Sony STR-DH590",
    "slugs": [
      "sony-str-dh590"
    ],
    "usb": "Download the update from Sony's support site onto a USB drive, plug it into the rear **POWER SUPPLY** port, press **AMP MENU** and choose **SYSTEM › UPDATE › START** on the front display. The STR-DH590 has no network connection, so USB is the only way to update it.",
    "supportUrl": "https://www.sony.com/am/support",
    "cautions": "The update takes about 15 minutes and cannot be rolled back. Do not turn the receiver off while it runs.",
    "sources": [
      "https://helpguide.sony.net/ha/strdh59/v1/en/contents/TP0001560174.html",
      "https://helpguide.sony.net/ha/strdh59/v1/en/contents/TP0001553325.html"
    ]
  },
  {
    "name": "Onkyo TX-NR6100 / TX-RZ50",
    "slugs": [
      "onkyo-tx-nr6100",
      "onkyo-tx-rz50"
    ],
    "network": "SETUP › 7. Miscellaneous › Firmware Update › Update via NET",
    "auto": "There is no auto-install; leave **Update Notice** enabled in the same menu to be told when an update is available.",
    "usb": "Download the firmware ZIP from Onkyo's support site, unzip it to the root of an empty FAT16/FAT32 USB drive (1 GB or larger), then choose **Update via USB** in the same menu.",
    "supportUrl": "https://support.onkyousa.com/hc/en-us/articles/10213620228372-TX-NR6100-Firmware-Update",
    "supportUrls": {
      "onkyo-tx-nr6100": "https://support.onkyousa.com/hc/en-us/articles/10213620228372-TX-NR6100-Firmware-Update",
      "onkyo-tx-rz50": "https://support.onkyousa.com/hc/en-us/articles/8862685495188-TX-RZ50-Updating-Firmware-via-Network"
    },
    "cautions": "An update takes about 20 minutes and keeps your settings. Turn off multi-zone and HDMI CEC first, do not touch cables or the USB drive during the update, and finish with the ON/STANDBY button on the receiver.",
    "sources": [
      "https://assets.onkyo-av.com/product-manuals/txnr6100_en_2024-10-29-075255_fxdy.pdf",
      "https://support.onkyousa.com/hc/en-us/article_attachments/19977170388884",
      "https://support.onkyousa.com/hc/en-us/articles/10213620228372-TX-NR6100-Firmware-Update",
      "https://support.onkyousa.com/hc/en-us/articles/8862685495188-TX-RZ50-Updating-Firmware-via-Network",
      "https://support.onkyousa.com/hc/en-us/articles/8863780980884-TX-RZ50-Updating-Firmware-via-USB"
    ]
  },
  {
    "name": "Onkyo TX-NR5100",
    "slugs": [
      "onkyo-tx-nr5100"
    ],
    "network": "SETUP › 6. Miscellaneous › Firmware Update › Update via NET",
    "auto": "There is no auto-install; leave **Update Notice** enabled in the same menu.",
    "usb": "Download the firmware ZIP from Onkyo's support site, unzip it to the root of an empty FAT16/FAT32 USB drive (1 GB or larger), then choose **Update via USB** in the same menu.",
    "supportUrl": "https://support.onkyousa.com/hc/en-us/articles/9363138329492-TX-NR5100-Firmware-Update",
    "cautions": "An update takes about 20 minutes and keeps your settings. Turn off multi-zone and HDMI CEC first, and finish with the ON/STANDBY button on the receiver.",
    "sources": [
      "https://support.onkyousa.com/hc/en-us/article_attachments/31699410654996",
      "https://support.onkyousa.com/hc/en-us/articles/9363138329492-TX-NR5100-Firmware-Update"
    ]
  },
  {
    "name": "LG OLED C5 / C6 (webOS)",
    "slugs": [
      "lg-c5-oled",
      "lg-c6-oled"
    ],
    "network": "Settings › All Settings › Support › Software Update › Check for Updates",
    "auto": "Turn on **Auto Update** (also labelled Allow Automatic Updates) in the same menu.",
    "usb": "Download the file for your exact model from LG's support page, put the .epk file in a folder named **LG_DTV** on a FAT32 or NTFS USB drive, insert it and choose **INSTALL**.",
    "supportUrl": "https://www.lg.com/us/support/product/lg-OLED65C5PUA.AUS",
    "supportUrls": {
      "lg-c5-oled": "https://www.lg.com/us/support/product/lg-OLED65C5PUA.AUS",
      "lg-c6-oled": "https://www.lg.com/us/support/product/lg-OLED65C6PUA.AUS"
    },
    "cautions": "Do not unplug the TV or remove the USB drive during an update; the TV may restart on its own. LG notes that menu names can differ slightly between software versions.",
    "sources": [
      "https://www.lg.com/us/support/help-library/how-to-update-your-lg-tv-software-and-turn-on-automatic-updates-CT10000018-20155444905539",
      "https://www.lg.com/us/support/product/lg-OLED65C5PUA.AUS",
      "https://www.lg.com/us/support/product/lg-OLED65C6PUA.AUS",
      "https://gscs-b2c.lge.com/downloadFile?fileId=EqNSWbbLzzjK8IA9T28UQ",
      "https://www.lg.com/uk/lg-experience/lg-lab/webos-user-guide/"
    ]
  },
  {
    "name": "Samsung S90F / S95F (Tizen, 2025)",
    "slugs": [
      "samsung-s90f",
      "samsung-s95f"
    ],
    "network": "Settings › All Settings › Support › Software Update › Update Now",
    "auto": "Turn on **Auto Update** in the same menu; updates download in the background and apply the next time the TV turns on.",
    "usb": "Download the USB upgrade file for your exact model from Samsung's Download Center, unzip it to the top level of an empty FAT32 USB drive, insert it and choose **Update Now**.",
    "supportUrl": "https://www.samsung.com/us/support/downloads/",
    "cautions": "Do not turn off the TV or remove the USB drive until it restarts. If Software Update is greyed out, close any streaming app first. Picture and sound settings may reset after an update.",
    "sources": [
      "https://www.samsung.com/us/support/answer/ANS10002051/",
      "https://www.samsung.com/au/support/tv-audio-video/update-the-software-on-your-samsung-tv/"
    ]
  },
  {
    "name": "Sony BRAVIA (Google TV, 2024-2025)",
    "slugs": [
      "sony-bravia-8-ii",
      "sony-bravia-9"
    ],
    "network": "Input button › Help › Status & Diagnostics › System software update › Software update",
    "auto": "Turn on **Automatically check for update** in the same menu.",
    "usb": "Without a network connection, you can update from a USB drive with the file from Sony's support site; follow the instructions supplied with the download.",
    "supportUrl": "https://www.sony.com/tvsupport",
    "cautions": "To keep receiving updates, turn the TV off with the remote (standby) rather than unplugging it.",
    "sources": [
      "https://helpguide.sony.net/tv/musltn1/v1/en-003/contents/TP1001675630.html",
      "https://helpguide.sony.net/tv/musltn1/v1/en-003/print.html",
      "https://helpguide.sony.net/tv/maep1/v1/en/contents/TP1001675630.html"
    ]
  },
  {
    "name": "TCL QM8L / QM7K (Google TV)",
    "slugs": [
      "tcl-qm8l",
      "tcl-qm7k"
    ],
    "network": "Settings › System › About › System update",
    "auto": "Turn on **Auto Update** in the same menu where your software build offers it; some builds update in the background with no toggle.",
    "supportUrl": "https://support.tcl.com/en_US/us-googletv-troubleshooting/perform-software-update-gtvs",
    "supportUrls": {
      "tcl-qm8l": "https://support.tcl.com/en_US/qm8-series",
      "tcl-qm7k": "https://support.tcl.com/en_US/2025-google-tv/qm7k-series"
    },
    "cautions": "Connect to Wi-Fi or Ethernet first, and do not unplug the TV during an update.",
    "sources": [
      "https://support.tcl.com/en_US/us-googletv-troubleshooting/perform-software-update-gtvs",
      "https://cdn.shopify.com/s/files/1/0687/7151/2385/files/GoogleTV_User_Guide_55-85QM7K_US_EN.pdf?v=1763626304",
      "https://static.helpjuice.com/helpjuice_production/uploads/upload/image/5306/6536672/GoogleTV_User_Guide_55QM8L_US_EN.pdf",
      "https://support.tcl.com/en_US/qm8-series",
      "https://support.tcl.com/en_US/2025-google-tv/qm7k-series"
    ]
  },
  {
    "name": "Hisense U8QG / U7SG (Google TV)",
    "slugs": [
      "hisense-u8qg",
      "hisense-u7sg"
    ],
    "network": "Settings › System › About › System update › Upgrade from Network",
    "usb": "Choose **Upgrade from USB** in the same menu, with the update files in the root of a FAT32 (MBR) USB drive plugged into the TV's USB 2.0 port. Hisense's Firmware Download page finds files by serial number.",
    "supportUrl": "https://www.hisense-usa.com/support/firmware-download",
    "supportUrls": {
      "hisense-u8qg": "https://www.hisense-usa.com/support/televisions-65-class-u8-series-miniled-uled-4k-google-tv-65u8qg",
      "hisense-u7sg": "https://www.hisense-usa.com/support/televisions-75-class-u7-series-uled-miniled-4k-google-tv-75u7sg"
    },
    "cautions": "Keep the TV online to receive updates automatically. If a network update fails, restart the TV and try again, or update by USB.",
    "sources": [
      "https://www.hisense-usa.com/_files/ugd/991681_6a3fb29c9ae0481aafd5d0f584d295b0.pdf",
      "https://www.hisense-usa.com/_files/ugd/991681_d044741ea23146cfaa48b41b96d7fd33.pdf",
      "https://www.hisense-usa.com/support/televisions-65-class-u8-series-miniled-uled-4k-google-tv-65u8qg",
      "https://www.hisense-usa.com/support/televisions-75-class-u7-series-uled-miniled-4k-google-tv-75u7sg",
      "https://www.hisense-usa.com/support/firmware-download"
    ]
  }
];

export const firmwareFor = (slug: string) => firmware.find((f) => f.slugs.includes(slug));
