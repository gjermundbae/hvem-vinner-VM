// Siste 5 landskamper for hvert VM 2026-lag.
//
// Datakonvensjoner (se scripts/FORM-AGENT-INSTRUCTIONS.md for full guide):
//   - Rekkefølge: KRONOLOGISK, eldste først, nyeste sist (app.js gjør slice(-5))
//   - score: "<lagets mål>-<motstanderens mål>"  (lagets perspektiv først)
//   - result: "W" (seier), "D" (uavgjort), "L" (tap)  — fra lagets perspektiv
//   - venue:  "H" hjemme, "A" borte, "N" nøytral bane
//   - date:   "YYYY-MM-DD" (ISO)
//   - opponent: norsk lagnavn der det er naturlig (Frankrike, Italia, Kroatia, Tsjekkia ...)
//   - oppFlag: emoji-flagg for motstanderen
//
// Kun en fil oppdateres én gang i dag — fyll inn alle 5 siste landskamper for
// hvert lag (offisielle A-kamper, både kvalifisering og privatlandskamper teller).

window.TEAM_FORM = {

  // =====================================================================
  // GRUPPE A
  // =====================================================================
  MEX: [
    { date: "2026-01-25", opponent: "Bolivia",    oppFlag: "🇧🇴", venue: "A", score: "1-0", result: "W" },
    { date: "2026-02-26", opponent: "Iceland",    oppFlag: "🇮🇸", venue: "H", score: "4-0", result: "W" },
    { date: "2026-03-29", opponent: "Portugal",   oppFlag: "🇵🇹", venue: "H", score: "0-0", result: "D" },
    { date: "2026-04-01", opponent: "Belgia",     oppFlag: "🇧🇪", venue: "H", score: "1-1", result: "D" },
    { date: "2026-05-22", opponent: "Ghana",      oppFlag: "🇬🇭", venue: "H", score: "2-0", result: "W" },
  ],
  RSA: [
    { date: "2025-12-26", opponent: "Kamerun",    oppFlag: "🇨🇲", venue: "N", score: "0-1", result: "L" },
    { date: "2025-12-29", opponent: "Zimbabwe",   oppFlag: "🇿🇼", venue: "N", score: "3-2", result: "W" },
    { date: "2026-01-04", opponent: "Kamerun",    oppFlag: "🇨🇲", venue: "N", score: "1-2", result: "L" },
    { date: "2026-03-27", opponent: "Panama",     oppFlag: "🇵🇦", venue: "H", score: "1-1", result: "D" },
    { date: "2026-03-31", opponent: "Panama",     oppFlag: "🇵🇦", venue: "H", score: "1-2", result: "L" },
  ],
  KOR: [
    { date: "2025-10-14", opponent: "Paraguay",         oppFlag: "🇵🇾", venue: "H", score: "2-0", result: "W" },
    { date: "2025-11-14", opponent: "Bolivia",          oppFlag: "🇧🇴", venue: "H", score: "2-0", result: "W" },
    { date: "2025-11-18", opponent: "Ghana",            oppFlag: "🇬🇭", venue: "H", score: "1-0", result: "W" },
    { date: "2026-03-28", opponent: "Elfenbenskysten",  oppFlag: "🇨🇮", venue: "N", score: "0-4", result: "L" },
    { date: "2026-03-31", opponent: "Østerrike",        oppFlag: "🇦🇹", venue: "A", score: "0-1", result: "L" },
  ],
  CZE: [
    { date: "2025-09-05", opponent: "Montenegro",     oppFlag: "🇲🇪", venue: "A", score: "2-0", result: "W" },
    { date: "2025-10-09", opponent: "Kroatia",        oppFlag: "🇭🇷", venue: "H", score: "0-0", result: "D" },
    { date: "2025-10-12", opponent: "Faroe Islands", oppFlag: "🇫🇴", venue: "A", score: "1-2", result: "L" },
    { date: "2026-03-26", opponent: "Irland",         oppFlag: "🇮🇪", venue: "H", score: "2-2", result: "D" },
    { date: "2026-03-31", opponent: "Danmark",        oppFlag: "🇩🇰", venue: "H", score: "2-2", result: "D" },
  ],

  // =====================================================================
  // GRUPPE B
  // =====================================================================
  CAN: [
    { date: "2025-11-13", opponent: "Ecuador",    oppFlag: "🇪🇨", venue: "H", score: "0-0", result: "D" },
    { date: "2025-11-18", opponent: "Venezuela",  oppFlag: "🇻🇪", venue: "N", score: "2-0", result: "W" },
    { date: "2026-01-17", opponent: "Guatemala",  oppFlag: "🇬🇹", venue: "N", score: "1-0", result: "W" },
    { date: "2026-03-28", opponent: "Iceland",    oppFlag: "🇮🇸", venue: "H", score: "2-2", result: "D" },
    { date: "2026-03-31", opponent: "Tunisia",    oppFlag: "🇹🇳", venue: "H", score: "0-0", result: "D" },
  ],
  BIH: [
    { date: "2025-10-12", opponent: "Malta",      oppFlag: "🇲🇹", venue: "A", score: "4-1", result: "W" },
    { date: "2025-11-15", opponent: "Romania",    oppFlag: "🇷🇴", venue: "H", score: "3-1", result: "W" },
    { date: "2025-11-18", opponent: "Østerrike",  oppFlag: "🇦🇹", venue: "A", score: "1-1", result: "D" },
    { date: "2026-03-26", opponent: "Wales",      oppFlag: "🏴", venue: "A", score: "1-1", result: "D" },
    { date: "2026-03-31", opponent: "Italia",     oppFlag: "🇮🇹", venue: "H", score: "1-1", result: "D" },
  ],
  QAT: [
    { date: "2025-10-14", opponent: "Forente arabiske emirater", oppFlag: "🇦🇪", venue: "H", score: "2-1", result: "W" },
    { date: "2025-11-17", opponent: "Zimbabwe",                 oppFlag: "🇿🇼", venue: "H", score: "1-2", result: "L" },
    { date: "2025-12-01", opponent: "Palestina",                oppFlag: "🇵🇸", venue: "H", score: "0-1", result: "L" },
    { date: "2025-12-04", opponent: "Syria",                    oppFlag: "🇸🇾", venue: "H", score: "1-1", result: "D" },
    { date: "2025-12-07", opponent: "Tunisia",                  oppFlag: "🇹🇳", venue: "H", score: "0-3", result: "L" },
  ],
  SUI: [
    { date: "2025-10-13", opponent: "Slovenia",  oppFlag: "🇸🇮", venue: "A", score: "0-0", result: "D" },
    { date: "2025-11-15", opponent: "Sverige",   oppFlag: "🇸🇪", venue: "H", score: "4-1", result: "W" },
    { date: "2025-11-18", opponent: "Kosovo",    oppFlag: "🇽🇰", venue: "A", score: "1-1", result: "D" },
    { date: "2026-03-27", opponent: "Tyskland",  oppFlag: "🇩🇪", venue: "H", score: "3-4", result: "L" },
    { date: "2026-03-31", opponent: "Norge",     oppFlag: "🇳🇴", venue: "A", score: "0-0", result: "D" },
  ],

  // =====================================================================
  // GRUPPE C
  // =====================================================================
  BRA: [
    { date: "2025-10-14", opponent: "Japan",      oppFlag: "🇯🇵", venue: "A", score: "2-3", result: "L" },
    { date: "2025-11-15", opponent: "Senegal",    oppFlag: "🇸🇳", venue: "N", score: "2-0", result: "W" },
    { date: "2025-11-18", opponent: "Tunisia",    oppFlag: "🇹🇳", venue: "N", score: "1-1", result: "D" },
    { date: "2026-03-26", opponent: "Frankrike",  oppFlag: "🇫🇷", venue: "N", score: "1-2", result: "L" },
    { date: "2026-03-31", opponent: "Kroatia",    oppFlag: "🇭🇷", venue: "N", score: "3-1", result: "W" },
  ],
  MAR: [
    { date: "2026-01-09", opponent: "Kamerun",    oppFlag: "🇨🇲", venue: "H", score: "2-0", result: "W" },
    { date: "2026-01-14", opponent: "Nigeria",    oppFlag: "🇳🇬", venue: "H", score: "0-0", result: "D" },
    { date: "2026-01-18", opponent: "Senegal",    oppFlag: "🇸🇳", venue: "H", score: "0-1", result: "L" },
    { date: "2026-03-27", opponent: "Ecuador",    oppFlag: "🇪🇨", venue: "N", score: "1-1", result: "D" },
    { date: "2026-03-31", opponent: "Paraguay",   oppFlag: "🇵🇾", venue: "N", score: "2-1", result: "W" },
  ],
  HAI: [
    { date: "2025-10-13", opponent: "Honduras",   oppFlag: "🇭🇳", venue: "A", score: "0-3", result: "L" },
    { date: "2025-11-13", opponent: "Curaçao",    oppFlag: "🇨🇼", venue: "A", score: "1-0", result: "W" },
    { date: "2025-11-18", opponent: "Curaçao",    oppFlag: "🇨🇼", venue: "A", score: "2-0", result: "W" },
    { date: "2026-03-28", opponent: "Tunisia",    oppFlag: "🇹🇳", venue: "N", score: "0-1", result: "L" },
    { date: "2026-03-31", opponent: "Iceland",    oppFlag: "🇮🇸", venue: "N", score: "1-1", result: "D" },
  ],
  SCO: [
    { date: "2025-10-12", opponent: "Hviterussland",      oppFlag: "🇧🇾", venue: "H", score: "2-1", result: "W" },
    { date: "2025-11-15", opponent: "Hellas",             oppFlag: "🇬🇷", venue: "A", score: "2-3", result: "L" },
    { date: "2025-11-18", opponent: "Danmark",            oppFlag: "🇩🇰", venue: "H", score: "4-2", result: "W" },
    { date: "2026-03-28", opponent: "Japan",              oppFlag: "🇯🇵", venue: "H", score: "0-1", result: "L" },
    { date: "2026-03-31", opponent: "Elfenbenskysten",    oppFlag: "🇨🇮", venue: "N", score: "0-1", result: "L" },
  ],

  // =====================================================================
  // GRUPPE D
  // =====================================================================
  USA: [
    { date: "2025-10-14", opponent: "Australia",  oppFlag: "🇦🇺", venue: "H", score: "2-1", result: "W" },
    { date: "2025-11-15", opponent: "Paraguay",   oppFlag: "🇵🇾", venue: "H", score: "2-1", result: "W" },
    { date: "2025-11-18", opponent: "Uruguay",    oppFlag: "🇺🇾", venue: "H", score: "5-1", result: "W" },
    { date: "2026-03-28", opponent: "Belgia",     oppFlag: "🇧🇪", venue: "H", score: "2-5", result: "L" },
    { date: "2026-03-31", opponent: "Portugal",   oppFlag: "🇵🇹", venue: "H", score: "0-2", result: "L" },
  ],
  PAR: [
    { date: "2025-10-14", opponent: "Sør-Korea",  oppFlag: "🇰🇷", venue: "A", score: "0-2", result: "L" },
    { date: "2025-11-15", opponent: "USA",        oppFlag: "🇺🇸", venue: "N", score: "1-2", result: "L" },
    { date: "2025-11-18", opponent: "Mexico",     oppFlag: "🇲🇽", venue: "N", score: "2-1", result: "W" },
    { date: "2026-03-27", opponent: "Hellas",     oppFlag: "🇬🇷", venue: "A", score: "1-0", result: "W" },
    { date: "2026-03-31", opponent: "Marokko",    oppFlag: "🇲🇦", venue: "N", score: "1-2", result: "L" },
  ],
  AUS: [
    { date: "2025-10-14", opponent: "USA",       oppFlag: "🇺🇸", venue: "A", score: "1-2", result: "L" },
    { date: "2025-11-14", opponent: "Venezuela", oppFlag: "🇻🇪", venue: "N", score: "0-1", result: "L" },
    { date: "2025-11-18", opponent: "Colombia",  oppFlag: "🇨🇴", venue: "N", score: "0-3", result: "L" },
    { date: "2026-03-27", opponent: "Kamerun",   oppFlag: "🇨🇲", venue: "H", score: "1-0", result: "W" },
    { date: "2026-03-31", opponent: "Curaçao",   oppFlag: "🇨🇼", venue: "H", score: "5-1", result: "W" },
  ],
  TUR: [
    { date: "2025-10-14", opponent: "Georgia",    oppFlag: "🇬🇪", venue: "H", score: "4-1", result: "W" },
    { date: "2025-11-15", opponent: "Bulgaria",   oppFlag: "🇧🇬", venue: "H", score: "2-0", result: "W" },
    { date: "2025-11-18", opponent: "Spania",     oppFlag: "🇪🇸", venue: "A", score: "2-2", result: "D" },
    { date: "2026-03-26", opponent: "Romania",    oppFlag: "🇷🇴", venue: "H", score: "1-0", result: "W" },
    { date: "2026-03-31", opponent: "Kosovo",     oppFlag: "🇽🇰", venue: "A", score: "1-0", result: "W" },
  ],

  // =====================================================================
  // GRUPPE E
  // =====================================================================
  GER: [
    { date: "2025-10-13", opponent: "Nord-Irland", oppFlag: "🇬🇧", venue: "A", score: "1-0", result: "W" },
    { date: "2025-11-14", opponent: "Luxembourg",  oppFlag: "🇱🇺", venue: "A", score: "2-0", result: "W" },
    { date: "2025-11-17", opponent: "Slovakia",    oppFlag: "🇸🇰", venue: "H", score: "6-0", result: "W" },
    { date: "2026-03-27", opponent: "Sveits",      oppFlag: "🇨🇭", venue: "A", score: "4-3", result: "W" },
    { date: "2026-03-30", opponent: "Ghana",       oppFlag: "🇬🇭", venue: "H", score: "2-1", result: "W" },
  ],
  CUW: [
    { date: "2025-10-14", opponent: "Trinidad og Tobago", oppFlag: "🇹🇹", venue: "H", score: "1-1", result: "D" },
    { date: "2025-11-13", opponent: "Bermuda",            oppFlag: "🇧🇲", venue: "A", score: "7-0", result: "W" },
    { date: "2025-11-18", opponent: "Jamaica",            oppFlag: "🇯🇲", venue: "A", score: "0-0", result: "D" },
    { date: "2026-03-27", opponent: "Kina",               oppFlag: "🇨🇳", venue: "N", score: "0-2", result: "L" },
    { date: "2026-03-31", opponent: "Australia",          oppFlag: "🇦🇺", venue: "A", score: "1-5", result: "L" },
  ],
  CIV: [
    { date: "2025-12-31", opponent: "Gabon",              oppFlag: "🇬🇦", venue: "N", score: "3-2", result: "W" },
    { date: "2026-01-06", opponent: "Burkina Faso",       oppFlag: "🇧🇫", venue: "N", score: "3-0", result: "W" },
    { date: "2026-01-10", opponent: "Egypt",              oppFlag: "🇪🇬", venue: "N", score: "2-3", result: "L" },
    { date: "2026-03-28", opponent: "Sør-Korea",          oppFlag: "🇰🇷", venue: "N", score: "4-0", result: "W" },
    { date: "2026-03-31", opponent: "Skottland",          oppFlag: "🏴", venue: "N", score: "1-0", result: "W" },
  ],
  ECU: [
    { date: "2025-10-14", opponent: "Mexico",     oppFlag: "🇲🇽", venue: "A", score: "1-1", result: "D" },
    { date: "2025-11-13", opponent: "Canada",     oppFlag: "🇨🇦", venue: "A", score: "0-0", result: "D" },
    { date: "2025-11-18", opponent: "New Zealand", oppFlag: "🇳🇿", venue: "N", score: "2-0", result: "W" },
    { date: "2026-03-27", opponent: "Marokko",    oppFlag: "🇲🇦", venue: "N", score: "1-1", result: "D" },
    { date: "2026-03-31", opponent: "Nederland",  oppFlag: "🇳🇱", venue: "A", score: "1-1", result: "D" },
  ],

  // =====================================================================
  // GRUPPE F
  // =====================================================================
  NED: [
    { date: "2025-10-12", opponent: "Finland",   oppFlag: "🇫🇮", venue: "H", score: "4-0", result: "W" },
    { date: "2025-11-14", opponent: "Polen",     oppFlag: "🇵🇱", venue: "A", score: "1-1", result: "D" },
    { date: "2025-11-17", opponent: "Litauen",   oppFlag: "🇱🇹", venue: "H", score: "4-0", result: "W" },
    { date: "2026-03-27", opponent: "Norge",     oppFlag: "🇳🇴", venue: "H", score: "2-1", result: "W" },
    { date: "2026-03-31", opponent: "Ecuador",   oppFlag: "🇪🇨", venue: "H", score: "1-1", result: "D" },
  ],
  JPN: [
    { date: "2025-10-14", opponent: "Brasil",    oppFlag: "🇧🇷", venue: "H", score: "3-2", result: "W" },
    { date: "2025-11-14", opponent: "Ghana",     oppFlag: "🇬🇭", venue: "H", score: "2-0", result: "W" },
    { date: "2025-11-18", opponent: "Bolivia",   oppFlag: "🇧🇴", venue: "H", score: "3-0", result: "W" },
    { date: "2026-03-28", opponent: "Skottland", oppFlag: "🏴", venue: "A", score: "1-0", result: "W" },
    { date: "2026-03-31", opponent: "England",   oppFlag: "🏴", venue: "A", score: "1-0", result: "W" },
  ],
  SWE: [
    { date: "2025-10-13", opponent: "Kosovo",     oppFlag: "🇽🇰", venue: "H", score: "0-1", result: "L" },
    { date: "2025-11-15", opponent: "Sveits",     oppFlag: "🇨🇭", venue: "A", score: "1-4", result: "L" },
    { date: "2025-11-18", opponent: "Slovenia",   oppFlag: "🇸🇮", venue: "H", score: "1-1", result: "D" },
    { date: "2026-03-26", opponent: "Ukraina",    oppFlag: "🇺🇦", venue: "A", score: "3-1", result: "W" },
    { date: "2026-03-31", opponent: "Polen",      oppFlag: "🇵🇱", venue: "H", score: "3-2", result: "W" },
  ],
  TUN: [
    { date: "2025-12-27", opponent: "Nigeria",    oppFlag: "🇳🇬", venue: "N", score: "2-3", result: "L" },
    { date: "2025-12-30", opponent: "Tanzania",   oppFlag: "🇹🇿", venue: "A", score: "1-1", result: "D" },
    { date: "2026-01-03", opponent: "Mali",       oppFlag: "🇲🇱", venue: "N", score: "1-1", result: "D" },
    { date: "2026-03-28", opponent: "Haiti",      oppFlag: "🇭🇹", venue: "N", score: "1-0", result: "W" },
    { date: "2026-03-31", opponent: "Canada",     oppFlag: "🇨🇦", venue: "A", score: "0-0", result: "D" },
  ],

  // =====================================================================
  // GRUPPE G
  // =====================================================================
  BEL: [
    { date: "2025-10-13", opponent: "Wales",           oppFlag: "🏴", venue: "A", score: "4-2", result: "W" },
    { date: "2025-11-15", opponent: "Kazakhstan",      oppFlag: "🇰🇿", venue: "A", score: "1-1", result: "D" },
    { date: "2025-11-18", opponent: "Liechtenstein",   oppFlag: "🇱🇮", venue: "H", score: "7-0", result: "W" },
    { date: "2026-03-28", opponent: "USA",             oppFlag: "🇺🇸", venue: "N", score: "5-2", result: "W" },
    { date: "2026-03-31", opponent: "Mexico",          oppFlag: "🇲🇽", venue: "N", score: "1-1", result: "D" },
  ],
  EGY: [
    { date: "2026-01-10", opponent: "Elfenbenskysten", oppFlag: "🇨🇮", venue: "N", score: "3-2", result: "W" },
    { date: "2026-01-14", opponent: "Senegal",         oppFlag: "🇸🇳", venue: "N", score: "0-1", result: "L" },
    { date: "2026-01-17", opponent: "Nigeria",         oppFlag: "🇳🇬", venue: "N", score: "0-0", result: "D" },
    { date: "2026-03-27", opponent: "Saudi-Arabia",    oppFlag: "🇸🇦", venue: "A", score: "4-0", result: "W" },
    { date: "2026-03-31", opponent: "Spania",          oppFlag: "🇪🇸", venue: "A", score: "0-0", result: "D" },
  ],
  IRN: [
    { date: "2025-10-14", opponent: "Tanzania",   oppFlag: "🇹🇿", venue: "N", score: "2-0", result: "W" },
    { date: "2025-11-13", opponent: "Kapp Verde", oppFlag: "🇨🇻", venue: "N", score: "0-0", result: "D" },
    { date: "2025-11-18", opponent: "Usbekistan", oppFlag: "🇺🇿", venue: "N", score: "0-0", result: "D" },
    { date: "2026-03-27", opponent: "Nigeria",    oppFlag: "🇳🇬", venue: "N", score: "1-2", result: "L" },
    { date: "2026-03-31", opponent: "Costa Rica", oppFlag: "🇨🇷", venue: "N", score: "5-0", result: "W" },
  ],
  NZL: [
    { date: "2025-10-14", opponent: "Norge",      oppFlag: "🇳🇴", venue: "A", score: "1-1", result: "D" },
    { date: "2025-11-15", opponent: "Colombia",   oppFlag: "🇨🇴", venue: "N", score: "1-2", result: "L" },
    { date: "2025-11-18", opponent: "Ecuador",    oppFlag: "🇪🇨", venue: "N", score: "0-2", result: "L" },
    { date: "2026-03-27", opponent: "Finland",    oppFlag: "🇫🇮", venue: "H", score: "0-2", result: "L" },
    { date: "2026-03-30", opponent: "Chile",      oppFlag: "🇨🇱", venue: "H", score: "4-1", result: "W" },
  ],

  // =====================================================================
  // GRUPPE H
  // =====================================================================
  ESP: [
    { date: "2025-10-14", opponent: "Bulgaria",  oppFlag: "🇧🇬", venue: "H", score: "4-0", result: "W" },
    { date: "2025-11-15", opponent: "Georgia",   oppFlag: "🇬🇪", venue: "A", score: "4-0", result: "W" },
    { date: "2025-11-18", opponent: "Tyrkia",    oppFlag: "🇹🇷", venue: "H", score: "2-2", result: "D" },
    { date: "2026-03-27", opponent: "Serbia",    oppFlag: "🇷🇸", venue: "H", score: "3-0", result: "W" },
    { date: "2026-03-31", opponent: "Egypt",     oppFlag: "🇪🇬", venue: "H", score: "0-0", result: "D" },
  ],
  CPV: [
    { date: "2025-10-13", opponent: "Eswatini",   oppFlag: "🇸🇿", venue: "H", score: "3-0", result: "W" },
    { date: "2025-11-13", opponent: "Iran",       oppFlag: "🇮🇷", venue: "N", score: "0-0", result: "D" },
    { date: "2025-11-17", opponent: "Egypt",        oppFlag: "🇪🇬", venue: "N", score: "1-1", result: "D" },
    { date: "2026-03-27", opponent: "Chile",      oppFlag: "🇨🇱", venue: "N", score: "2-4", result: "L" },
    { date: "2026-03-30", opponent: "Finland",    oppFlag: "🇫🇮", venue: "N", score: "1-1", result: "D" },
  ],
  KSA: [
    { date: "2025-12-11", opponent: "Palestina",                oppFlag: "🇵🇸", venue: "N", score: "2-1", result: "W" },
    { date: "2025-12-15", opponent: "Jordan",                   oppFlag: "🇯🇴", venue: "N", score: "0-1", result: "L" },
    { date: "2025-12-18", opponent: "Forente arabiske emirater", oppFlag: "🇦🇪", venue: "N", score: "0-0", result: "D" },
    { date: "2026-03-27", opponent: "Egypt",                    oppFlag: "🇪🇬", venue: "H", score: "0-4", result: "L" },
    { date: "2026-03-31", opponent: "Serbia",                   oppFlag: "🇷🇸", venue: "A", score: "1-2", result: "L" },
  ],
  URU: [
    { date: "2025-10-13", opponent: "Malaysia",   oppFlag: "🇲🇾", venue: "N", score: "2-1", result: "W" },
    { date: "2025-11-15", opponent: "Mexico",     oppFlag: "🇲🇽", venue: "A", score: "0-0", result: "D" },
    { date: "2025-11-18", opponent: "USA",        oppFlag: "🇺🇸", venue: "N", score: "1-5", result: "L" },
    { date: "2026-03-27", opponent: "England",    oppFlag: "🏴", venue: "A", score: "1-1", result: "D" },
    { date: "2026-03-31", opponent: "Algerie",    oppFlag: "🇩🇿", venue: "N", score: "0-0", result: "D" },
  ],

  // =====================================================================
  // GRUPPE I
  // =====================================================================
  FRA: [
    { date: "2025-10-13", opponent: "Island",    oppFlag: "🇮🇸", venue: "A", score: "2-2", result: "D" },
    { date: "2025-11-13", opponent: "Ukraina",   oppFlag: "🇺🇦", venue: "H", score: "4-0", result: "W" },
    { date: "2025-11-16", opponent: "Azerbaijan", oppFlag: "🇦🇿", venue: "A", score: "3-1", result: "W" },
    { date: "2026-03-26", opponent: "Brasil",    oppFlag: "🇧🇷", venue: "N", score: "2-1", result: "W" },
    { date: "2026-03-29", opponent: "Colombia",  oppFlag: "🇨🇴", venue: "N", score: "3-1", result: "W" },
  ],
  SEN: [
    { date: "2026-01-09", opponent: "Mali",       oppFlag: "🇲🇱", venue: "N", score: "1-0", result: "W" },
    { date: "2026-01-14", opponent: "Egypt",      oppFlag: "🇪🇬", venue: "N", score: "1-0", result: "W" },
    { date: "2026-01-18", opponent: "Marokko",    oppFlag: "🇲🇦", venue: "A", score: "1-0", result: "W" },
    { date: "2026-03-28", opponent: "Peru",       oppFlag: "🇵🇪", venue: "N", score: "2-0", result: "W" },
    { date: "2026-03-31", opponent: "Gambia",     oppFlag: "🇬🇲", venue: "H", score: "3-1", result: "W" },
  ],
  IRQ: [
    { date: "2025-12-03", opponent: "Bahrain",  oppFlag: "🇧🇭", venue: "N", score: "2-1", result: "W" },
    { date: "2025-12-06", opponent: "Sudan",    oppFlag: "🇸🇩", venue: "N", score: "2-0", result: "W" },
    { date: "2025-12-09", opponent: "Algerie",  oppFlag: "🇩🇿", venue: "N", score: "0-2", result: "L" },
    { date: "2025-12-12", opponent: "Jordan",   oppFlag: "🇯🇴", venue: "N", score: "0-1", result: "L" },
    { date: "2026-03-31", opponent: "Bolivia",  oppFlag: "🇧🇴", venue: "N", score: "2-1", result: "W" },
  ],
  NOR: [
    { date: "2025-10-14", opponent: "New Zealand", oppFlag: "🇳🇿", venue: "H", score: "1-1", result: "D" },
    { date: "2025-11-13", opponent: "Estland",     oppFlag: "🇪🇪", venue: "H", score: "4-1", result: "W" },
    { date: "2025-11-16", opponent: "Italia",      oppFlag: "🇮🇹", venue: "A", score: "4-1", result: "W" },
    { date: "2026-03-27", opponent: "Nederland",   oppFlag: "🇳🇱", venue: "A", score: "1-2", result: "L" },
    { date: "2026-03-31", opponent: "Sveits",      oppFlag: "🇨🇭", venue: "H", score: "0-0", result: "D" },
  ],

  // =====================================================================
  // GRUPPE J
  // =====================================================================
  ARG: [
    { date: "2025-10-10", opponent: "USA",        oppFlag: "🇺🇸", venue: "N", score: "1-0", result: "W" },
    { date: "2025-10-14", opponent: "Puerto Rico", oppFlag: "🇵🇷", venue: "N", score: "6-0", result: "W" },
    { date: "2025-11-14", opponent: "Angola",     oppFlag: "🇦🇴", venue: "A", score: "2-0", result: "W" },
    { date: "2026-03-27", opponent: "Mauritania", oppFlag: "🇲🇷", venue: "H", score: "2-1", result: "W" },
    { date: "2026-03-31", opponent: "Zambia",     oppFlag: "🇿🇲", venue: "H", score: "5-0", result: "W" },
  ],
  ALG: [
    { date: "2025-12-31", opponent: "DR Kongo",           oppFlag: "🇨🇩", venue: "N", score: "3-1", result: "W" },
    { date: "2026-01-06", opponent: "Ekvatorial-Guinea",  oppFlag: "🇬🇶", venue: "N", score: "1-0", result: "W" },
    { date: "2026-01-10", opponent: "Nigeria",            oppFlag: "🇳🇬", venue: "N", score: "0-2", result: "L" },
    { date: "2026-03-27", opponent: "Guatemala",          oppFlag: "🇬🇹", venue: "N", score: "7-0", result: "W" },
    { date: "2026-03-31", opponent: "Uruguay",            oppFlag: "🇺🇾", venue: "N", score: "0-0", result: "D" },
  ],
  AUT: [
    { date: "2025-10-12", opponent: "Romania",           oppFlag: "🇷🇴", venue: "A", score: "0-1", result: "L" },
    { date: "2025-11-15", opponent: "Kypros",            oppFlag: "🇨🇾", venue: "A", score: "2-0", result: "W" },
    { date: "2025-11-18", opponent: "Bosnia-Hercegovina", oppFlag: "🇧🇦", venue: "H", score: "1-1", result: "D" },
    { date: "2026-03-27", opponent: "Ghana",             oppFlag: "🇬🇭", venue: "H", score: "5-1", result: "W" },
    { date: "2026-03-31", opponent: "Sør-Korea",         oppFlag: "🇰🇷", venue: "H", score: "1-0", result: "W" },
  ],
  JOR: [
    { date: "2025-12-12", opponent: "Irak",       oppFlag: "🇮🇶", venue: "N", score: "1-0", result: "W" },
    { date: "2025-12-15", opponent: "Saudi-Arabia", oppFlag: "🇸🇦", venue: "N", score: "1-0", result: "W" },
    { date: "2025-12-18", opponent: "Marokko",    oppFlag: "🇲🇦", venue: "N", score: "2-3", result: "L" },
    { date: "2026-03-27", opponent: "Costa Rica", oppFlag: "🇨🇷", venue: "N", score: "2-2", result: "D" },
    { date: "2026-03-31", opponent: "Nigeria",    oppFlag: "🇳🇬", venue: "N", score: "2-2", result: "D" },
  ],

  // =====================================================================
  // GRUPPE K
  // =====================================================================
  POR: [
    { date: "2025-10-14", opponent: "Ungarn",  oppFlag: "🇭🇺", venue: "H", score: "2-2", result: "D" },
    { date: "2025-11-13", opponent: "Irland",  oppFlag: "🇮🇪", venue: "A", score: "0-2", result: "L" },
    { date: "2025-11-16", opponent: "Armenia", oppFlag: "🇦🇲", venue: "H", score: "9-1", result: "W" },
    { date: "2026-03-28", opponent: "Mexico",  oppFlag: "🇲🇽", venue: "A", score: "0-0", result: "D" },
    { date: "2026-03-31", opponent: "USA",     oppFlag: "🇺🇸", venue: "N", score: "2-0", result: "W" },
  ],
  COD: [
    { date: "2025-12-27", opponent: "Senegal",    oppFlag: "🇸🇳", venue: "N", score: "1-1", result: "D" },
    { date: "2025-12-31", opponent: "Botswana",   oppFlag: "🇧🇼", venue: "A", score: "3-0", result: "W" },
    { date: "2026-01-07", opponent: "Algerie",    oppFlag: "🇩🇿", venue: "N", score: "0-1", result: "L" },
    { date: "2026-03-25", opponent: "Bermuda",    oppFlag: "🇧🇲", venue: "N", score: "2-0", result: "W" },
    { date: "2026-03-31", opponent: "Jamaica",    oppFlag: "🇯🇲", venue: "N", score: "1-0", result: "W" },
  ],
  UZB: [
    { date: "2025-11-14", opponent: "Egypt",     oppFlag: "🇪🇬", venue: "N", score: "2-0", result: "W" },
    { date: "2025-11-18", opponent: "Iran",      oppFlag: "🇮🇷", venue: "N", score: "0-0", result: "D" },
    { date: "2026-01-26", opponent: "Kina",      oppFlag: "🇨🇳", venue: "N", score: "2-2", result: "D" },
    { date: "2026-03-27", opponent: "Gabon",     oppFlag: "🇬🇦", venue: "H", score: "3-1", result: "W" },
    { date: "2026-03-30", opponent: "Venezuela", oppFlag: "🇻🇪", venue: "H", score: "0-0", result: "D" },
  ],
  COL: [
    { date: "2025-10-14", opponent: "Canada",     oppFlag: "🇨🇦", venue: "N", score: "0-0", result: "D" },
    { date: "2025-11-15", opponent: "New Zealand", oppFlag: "🇳🇿", venue: "N", score: "2-1", result: "W" },
    { date: "2025-11-18", opponent: "Australia",  oppFlag: "🇦🇺", venue: "N", score: "3-0", result: "W" },
    { date: "2026-03-26", opponent: "Kroatia",    oppFlag: "🇭🇷", venue: "N", score: "1-2", result: "L" },
    { date: "2026-03-29", opponent: "Frankrike",  oppFlag: "🇫🇷", venue: "N", score: "1-3", result: "L" },
  ],

  // =====================================================================
  // GRUPPE L
  // =====================================================================
  ENG: [
    { date: "2025-10-14", opponent: "Latvia",   oppFlag: "🇱🇻", venue: "A", score: "5-0", result: "W" },
    { date: "2025-11-13", opponent: "Serbia",   oppFlag: "🇷🇸", venue: "H", score: "2-0", result: "W" },
    { date: "2025-11-16", opponent: "Albania",  oppFlag: "🇦🇱", venue: "A", score: "2-0", result: "W" },
    { date: "2026-03-27", opponent: "Uruguay",  oppFlag: "🇺🇾", venue: "H", score: "1-1", result: "D" },
    { date: "2026-03-31", opponent: "Japan",    oppFlag: "🇯🇵", venue: "H", score: "0-1", result: "L" },
  ],
  CRO: [
    { date: "2025-10-12", opponent: "Gibraltar",  oppFlag: "🇬🇮", venue: "H", score: "3-0", result: "W" },
    { date: "2025-11-14", opponent: "Montenegro", oppFlag: "🇲🇪", venue: "H", score: "3-1", result: "W" },
    { date: "2025-11-17", opponent: "Montenegro", oppFlag: "🇲🇪", venue: "A", score: "3-2", result: "W" },
    { date: "2026-03-26", opponent: "Colombia",   oppFlag: "🇨🇴", venue: "N", score: "2-1", result: "W" },
    { date: "2026-03-31", opponent: "Brasil",     oppFlag: "🇧🇷", venue: "N", score: "1-3", result: "L" },
  ],
  GHA: [
    { date: "2025-10-12", opponent: "Comoros",    oppFlag: "🇰🇲", venue: "H", score: "1-0", result: "W" },
    { date: "2025-11-14", opponent: "Japan",      oppFlag: "🇯🇵", venue: "A", score: "0-2", result: "L" },
    { date: "2025-11-18", opponent: "Sør-Korea",  oppFlag: "🇰🇷", venue: "A", score: "0-1", result: "L" },
    { date: "2026-03-27", opponent: "Østerrike",  oppFlag: "🇦🇹", venue: "A", score: "1-5", result: "L" },
    { date: "2026-03-30", opponent: "Tyskland",   oppFlag: "🇩🇪", venue: "A", score: "1-2", result: "L" },
  ],
  PAN: [
    { date: "2025-11-18", opponent: "El Salvador", oppFlag: "🇸🇻", venue: "H", score: "3-0", result: "W" },
    { date: "2026-01-18", opponent: "Bolivia",    oppFlag: "🇧🇴", venue: "N", score: "1-1", result: "D" },
    { date: "2026-01-22", opponent: "Mexico",     oppFlag: "🇲🇽", venue: "H", score: "0-1", result: "L" },
    { date: "2026-03-27", opponent: "Sør-Afrika", oppFlag: "🇿🇦", venue: "A", score: "1-1", result: "D" },
    { date: "2026-03-31", opponent: "Sør-Afrika", oppFlag: "🇿🇦", venue: "A", score: "2-1", result: "W" },
  ],
};
