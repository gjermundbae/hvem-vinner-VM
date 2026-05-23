// Knockout-stage fixtures and slot rules for the 2026 FIFA World Cup.
// Match numbers and slot text follow bracket.txt verbatim.

(function () {
  "use strict";

  // R32 third-placed slots: which 5 groups are eligible candidates per slot
  // (used as label text before allocation, and as a sanity check after).
  window.THIRD_PLACE_SLOTS = {
    M74: ["A", "B", "C", "D", "F"],
    M77: ["C", "D", "F", "G", "H"],
    M79: ["C", "E", "F", "H", "I"],
    M80: ["E", "H", "I", "J", "K"],
    M81: ["B", "E", "F", "I", "J"],
    M82: ["A", "E", "H", "I", "J"],
    M85: ["E", "F", "G", "I", "J"],
    M87: ["D", "E", "I", "J", "L"],
  };

  // ref kinds:
  //   { kind:"winner",      group:"A" }       group winner (1st)
  //   { kind:"runnerup",    group:"A" }       group runner-up (2nd)
  //   { kind:"third",       slot:"M74" }      best-3rd allocation (Annex C)
  //   { kind:"matchWinner", match: 73 }       winner of an earlier match
  //   { kind:"matchLoser",  match: 101 }      loser of an earlier match
  const m = (id, round, date, kickoff, venue, home, away) => ({
    id,
    round,
    date,
    kickoff,
    venue,
    home,
    away,
  });

  const W = (group) => ({ kind: "winner", group });
  const R = (group) => ({ kind: "runnerup", group });
  const T = (slot) => ({ kind: "third", slot });
  const Mw = (match) => ({ kind: "matchWinner", match });
  const Ml = (match) => ({ kind: "matchLoser", match });

  window.BRACKET_FIXTURES = [
    // Round of 32
    m(73, "R32", "2026-06-28", "12:00 UTC−7", "SoFi Stadium, Inglewood", R("A"), R("B")),
    m(76, "R32", "2026-06-29", "12:00 UTC−5", "NRG Stadium, Houston", W("C"), R("F")),
    m(74, "R32", "2026-06-29", "16:30 UTC−4", "Gillette Stadium, Foxborough", W("E"), T("M74")),
    m(75, "R32", "2026-06-29", "19:00 UTC−6", "Estadio BBVA, Guadalupe", W("F"), R("C")),
    m(78, "R32", "2026-06-30", "12:00 UTC−5", "AT&T Stadium, Arlington", R("E"), R("I")),
    m(77, "R32", "2026-06-30", "17:00 UTC−4", "MetLife Stadium, East Rutherford", W("I"), T("M77")),
    m(79, "R32", "2026-06-30", "19:00 UTC−6", "Estadio Azteca, Mexico City", W("A"), T("M79")),
    m(80, "R32", "2026-07-01", "12:00 UTC−4", "Mercedes-Benz Stadium, Atlanta", W("L"), T("M80")),
    m(82, "R32", "2026-07-01", "13:00 UTC−7", "Lumen Field, Seattle", W("G"), T("M82")),
    m(81, "R32", "2026-07-01", "17:00 UTC−7", "Levi's Stadium, Santa Clara", W("D"), T("M81")),
    m(84, "R32", "2026-07-02", "12:00 UTC−7", "SoFi Stadium, Inglewood", W("H"), R("J")),
    m(83, "R32", "2026-07-02", "19:00 UTC−4", "BMO Field, Toronto", R("K"), R("L")),
    m(85, "R32", "2026-07-02", "20:00 UTC−7", "BC Place, Vancouver", W("B"), T("M85")),
    m(88, "R32", "2026-07-03", "13:00 UTC−5", "AT&T Stadium, Arlington", R("D"), R("G")),
    m(86, "R32", "2026-07-03", "18:00 UTC−4", "Hard Rock Stadium, Miami Gardens", W("J"), R("H")),
    m(87, "R32", "2026-07-03", "20:30 UTC−5", "Arrowhead Stadium, Kansas City", W("K"), T("M87")),

    // Round of 16
    m(90, "R16", "2026-07-04", "12:00 UTC−5", "NRG Stadium, Houston", Mw(73), Mw(75)),
    m(89, "R16", "2026-07-04", "17:00 UTC−4", "Lincoln Financial Field, Philadelphia", Mw(74), Mw(77)),
    m(91, "R16", "2026-07-05", "16:00 UTC−4", "MetLife Stadium, East Rutherford", Mw(76), Mw(78)),
    m(92, "R16", "2026-07-05", "18:00 UTC−6", "Estadio Azteca, Mexico City", Mw(79), Mw(80)),
    m(93, "R16", "2026-07-06", "14:00 UTC−5", "AT&T Stadium, Arlington", Mw(83), Mw(84)),
    m(94, "R16", "2026-07-06", "17:00 UTC−7", "Lumen Field, Seattle", Mw(81), Mw(82)),
    m(95, "R16", "2026-07-07", "12:00 UTC−4", "Mercedes-Benz Stadium, Atlanta", Mw(86), Mw(88)),
    m(96, "R16", "2026-07-07", "13:00 UTC−7", "BC Place, Vancouver", Mw(85), Mw(87)),

    // Quarterfinals
    m(97, "QF", "2026-07-09", "16:00 UTC−4", "Gillette Stadium, Foxborough", Mw(89), Mw(90)),
    m(98, "QF", "2026-07-10", "12:00 UTC−7", "SoFi Stadium, Inglewood", Mw(93), Mw(94)),
    m(99, "QF", "2026-07-11", "17:00 UTC−4", "Hard Rock Stadium, Miami Gardens", Mw(91), Mw(92)),
    m(100, "QF", "2026-07-11", "20:00 UTC−5", "Arrowhead Stadium, Kansas City", Mw(95), Mw(96)),

    // Semifinals
    m(101, "SF", "2026-07-14", "14:00 UTC−5", "AT&T Stadium, Arlington", Mw(97), Mw(98)),
    m(102, "SF", "2026-07-15", "15:00 UTC−4", "Mercedes-Benz Stadium, Atlanta", Mw(99), Mw(100)),

    // Third-place playoff
    m(103, "3PO", "2026-07-18", "17:00 UTC−4", "Hard Rock Stadium, Miami Gardens", Ml(101), Ml(102)),

    // Final
    m(104, "F", "2026-07-19", "15:00 UTC−4", "MetLife Stadium, East Rutherford", Mw(101), Mw(102)),
  ];

  window.BRACKET_ROUNDS = [
    { id: "R32", title: "Sluttspill: 16-delsfinaler" },
    { id: "R16", title: "Åttedelsfinaler" },
    { id: "QF", title: "Kvartfinaler" },
    { id: "SF", title: "Semifinaler" },
    { id: "3PO", title: "Bronsefinale" },
    { id: "F", title: "Finale" },
  ];
})();
