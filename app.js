(function () {
  "use strict";

  const DATA = window.TOURNAMENT_DATA;
  const QUAL_TABLES = window.QUALIFICATION_TABLES || {};
  const TEAM_QUAL = window.TEAM_QUALIFICATION || {};
  const TEAM_FORM = window.TEAM_FORM || {};

  // Merge form data into team objects; TEAM_FORM overrides empty form arrays.
  for (const t of DATA.teams) {
    const f = TEAM_FORM[t.code];
    if (Array.isArray(f) && f.length && (!t.form || t.form.length === 0)) {
      t.form = f;
    }
  }
  const app = document.getElementById("app");
  const sub = document.getElementById("tournament-sub");
  sub.textContent = `${DATA.tournament.name} · ${DATA.tournament.host}`;

  const POS_LABELS = {
    GK: "Keeper",
    DEF: "Forsvar",
    MID: "Midtbane",
    FWD: "Angrep",
  };
  const POS_ORDER = ["GK", "DEF", "MID", "FWD"];

  // ---------- utils ----------

  const h = (tag, attrs = {}, children = []) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") el.className = v;
      else if (k === "html") el.innerHTML = v;
      else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
      else if (v !== null && v !== undefined) el.setAttribute(k, v);
    }
    const kids = Array.isArray(children) ? children : [children];
    for (const c of kids) {
      if (c == null || c === false) continue;
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return el;
  };

  const parseScore = (s) => {
    const [a, b] = s.split("-").map((n) => parseInt(n, 10));
    return [a, b];
  };

  const resultPillClass = (r) => (r === "W" ? "pill pill-w" : r === "L" ? "pill pill-l" : "pill pill-d");
  const resultLetter = (r) => (r === "W" ? "V" : r === "L" ? "T" : "U");

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString("no-NO", { day: "2-digit", month: "short" });
  };

  const summarize = (form) => {
    let w = 0, d = 0, l = 0, gf = 0, ga = 0;
    for (const m of form) {
      const [a, b] = parseScore(m.score);
      gf += a; ga += b;
      if (m.result === "W") w++;
      else if (m.result === "L") l++;
      else d++;
    }
    return { w, d, l, gf, ga };
  };

  function rowHasFullStats(row) {
    return row.won != null && row.drawn != null && row.lost != null && row.gf != null && row.ga != null;
  }

  function rowHasExtendedStats(row) {
    return row.won != null && row.drawn != null && row.lost != null && row.gd != null;
  }

  function formatGd(gd) {
    return gd > 0 ? `+${gd}` : String(gd);
  }

  function renderQualification(team) {
    const qual = TEAM_QUAL[team.code];
    if (!qual) return null;

    const children = [
      h("h2", { class: "section-title" }, "Kvalifisering"),
      h("p", { class: "qual-outcome" }, qual.outcome),
    ];

    if (qual.type === "host") {
      children.push(
        h("div", { class: "qual-host" }, "Vertnasjon — automatisk kvalifisert til VM 2026")
      );
      return h("section", { class: "qualification" }, children);
    }

    const table = QUAL_TABLES[qual.tableId];
    if (!table) return h("section", { class: "qualification" }, children);

    if (table.type === "knockout" && table.matches) {
      const matches = table.matches.map((m) =>
        h("div", { class: "qual-knockout-match" }, [
          h("span", { class: "qual-knockout-round" }, m.round),
          h("span", { class: "qual-knockout-date" }, formatDate(m.date)),
          h("span", { class: "qual-knockout-teams" }, [
            h("span", {}, `${m.homeFlag} ${m.home}`),
            h("strong", {}, ` ${m.score} `),
            h("span", {}, `${m.away} ${m.awayFlag}`),
          ]),
        ])
      );
      children.push(h("div", { class: "qual-knockout" }, matches));
    } else if (table.rows?.length) {
      const sample = table.rows[0];
      const full = rowHasFullStats(sample);
      const extended = !full && rowHasExtendedStats(sample);
      const headCells = full
        ? ["#", "Lag", "K", "V", "U", "T", "MF", "MI", "MD", "P"]
        : extended
          ? ["#", "Lag", "K", "V", "U", "T", "MD", "P"]
          : ["#", "Lag", "K", "P"];
      const thead = h(
        "thead",
        {},
        h("tr", {}, headCells.map((c) => h("th", {}, c)))
      );
      const tbody = h(
        "tbody",
        {},
        table.rows.map((row) => {
          const highlight = row.code === team.code;
          const nameCell = h("td", { class: "qual-team" }, [
            h("span", { class: "team-flag" }, row.flag),
            h("span", {}, row.name),
          ]);
          const cells = full
            ? [
                h("td", {}, String(row.pos)),
                nameCell,
                h("td", {}, String(row.played)),
                h("td", {}, String(row.won)),
                h("td", {}, String(row.drawn)),
                h("td", {}, String(row.lost)),
                h("td", {}, String(row.gf)),
                h("td", {}, String(row.ga)),
                h("td", {}, formatGd(row.gd)),
                h("td", {}, String(row.pts)),
              ]
            : extended
              ? [
                  h("td", {}, String(row.pos)),
                  nameCell,
                  h("td", {}, String(row.played)),
                  h("td", {}, String(row.won)),
                  h("td", {}, String(row.drawn)),
                  h("td", {}, String(row.lost)),
                  h("td", {}, formatGd(row.gd)),
                  h("td", {}, String(row.pts)),
                ]
              : [
                  h("td", {}, String(row.pos)),
                  nameCell,
                  h("td", {}, String(row.played)),
                  h("td", {}, String(row.pts)),
                ];
          return h("tr", { class: highlight ? "qual-row-highlight" : "" }, cells);
        })
      );
      children.push(
        h("div", { class: "qual-table-wrap" }, [
          h("table", { class: "qual-table" }, [thead, tbody]),
        ])
      );
      if (table.note) {
        children.push(h("p", { class: "qual-note" }, table.note));
      }
    }

    if (table.source) {
      children.push(
        h("p", { class: "qual-source" }, [
          h("span", {}, "Kilde: "),
          h("a", { href: table.source, target: "_blank", rel: "noopener" }, "Wikipedia"),
        ])
      );
    }

    return h("section", { class: "qualification" }, children);
  }

  // ---------- views ----------

  function renderOverview() {
    const groups = {};
    for (const t of DATA.teams) {
      (groups[t.group] = groups[t.group] || []).push(t);
    }
    const groupKeys = Object.keys(groups).sort();

    const root = h("div", { class: "overview" });

    for (const g of groupKeys) {
      const teams = groups[g];
      const groupEl = h("section", { class: "group" }, [
        h("div", { class: "group-header" }, [
          h("h2", { class: "group-title", "data-letter": g }, `Gruppe ${g}`),
          h("span", { class: "group-hint" }, `${teams.length} lag`),
        ]),
        h(
          "div",
          { class: "team-grid" },
          teams.map((t) => renderTeamCard(t))
        ),
      ]);
      root.appendChild(groupEl);
    }

    return root;
  }

  function renderTeamCard(team) {
    const last5 = team.form.slice(-5);
    const sum = summarize(last5);

    const formStrip = h(
      "div",
      { class: "form-strip" },
      last5.map((m) => h("span", { class: resultPillClass(m.result), title: `${m.opponent} ${m.score}` }, resultLetter(m.result)))
    );

    return h(
      "a",
      { class: "team-card", href: `#/team/${team.code}` },
      [
        h("div", { class: "team-card-top" }, [
          h("span", { class: "team-flag" }, team.flag),
          h("div", {}, [
            h("div", { class: "team-name" }, team.name),
            h("div", { class: "team-meta" }, `Trener: ${team.coach}`),
          ]),
        ]),
        h("div", { class: "team-card-bottom" }, [
          formStrip,
          h("span", {
            class: "gd",
            title: `${sum.w} seire, ${sum.d} uavgjort, ${sum.l} tap`,
            html: `<strong>${sum.gf}</strong>–<strong>${sum.ga}</strong>`,
          }),
        ]),
      ]
    );
  }

  function renderTeamDetail(code) {
    const team = DATA.teams.find((t) => t.code === code);
    if (!team) {
      return h("div", {}, [
        h("a", { class: "back-link", href: "#/" }, "← Tilbake til oversikt"),
        h("p", {}, `Fant ikke lag «${code}».`),
      ]);
    }

    return h("div", { class: "team-detail" }, [
      h("a", { class: "back-link", href: "#/" }, "← Tilbake til oversikt"),
      h("header", { class: "team-header" }, [
        h("span", { class: "team-flag" }, team.flag),
        h("div", {}, [
          h("h1", {}, team.name),
          h("div", { class: "team-meta" }, `Gruppe ${team.group} · Trener: ${team.coach} · ${team.squad.length} spillere`),
        ]),
      ]),
      renderQualification(team),
      h("div", { class: "detail-grid" }, [
        renderSquad(team),
        renderForm(team),
      ]),
    ]);
  }

  function renderSquad(team) {
    const byPos = {};
    for (const p of team.squad) (byPos[p.pos] = byPos[p.pos] || []).push(p);

    const groups = POS_ORDER.filter((p) => byPos[p]).map((p) => {
      const players = byPos[p].slice().sort((a, b) => a.number - b.number);
      return h("div", { class: "pos-group" }, [
        h("h3", { class: "pos-label" }, `${POS_LABELS[p]} · ${players.length}`),
        ...players.map(renderPlayer),
      ]);
    });

    const empty =
      team.squad.length === 0
        ? h("p", { class: "squad-empty" }, "Troppen er ikke kunngjort ennå.")
        : null;

    return h("section", { class: "squad" }, [
      h("h2", { class: "section-title" }, "Tropp"),
      empty,
      ...groups,
    ]);
  }

  function renderPlayer(p) {
    return h("div", { class: "player-row" }, [
      h("span", { class: "player-num" }, String(p.number)),
      h("div", {}, [
        h("span", { class: "player-name" }, p.name),
        h("span", { class: "player-club" }, p.club),
      ]),
      h("span", { class: "player-stats" }, `${p.age} år · ${p.caps} k · ${p.goals} m`),
    ]);
  }

  function renderForm(team) {
    const sum = summarize(team.form);
    const summary = h("div", { class: "form-summary" }, [
      h("span", { class: "label" }, `Siste ${team.form.length}`),
      h("span", { html: `<strong>${sum.w}</strong>V <strong>${sum.d}</strong>U <strong>${sum.l}</strong>T` }),
      h("span", { class: "label" }, "·"),
      h("span", { html: `<strong>${sum.gf}</strong>–<strong>${sum.ga}</strong>` }),
    ]);

    const matches = team.form
      .slice()
      .reverse()
      .map((m) => renderMatch(m));

    return h("section", { class: "form" }, [
      h("h2", { class: "section-title" }, "Form"),
      summary,
      h("div", { class: "matches" }, matches),
    ]);
  }

  function renderMatch(m) {
    const hasScorers = Array.isArray(m.scorers) && m.scorers.length > 0;
    const scorersHtml = hasScorers
      ? m.scorers.map((s) => `${s.name}<sup>${s.minute}'${s.pen ? " p" : ""}</sup>`).join(", ")
      : null;

    const venueTitle = m.venue === "H" ? "Hjemme" : m.venue === "N" ? "Nøytral bane" : "Borte";

    return h("div", { class: "match" }, [
      h("div", { class: "match-date" }, formatDate(m.date)),
      h("div", { class: "match-main" }, [
        h("div", { class: "match-opp" }, [
          h("span", { class: "team-flag", style: "font-size:16px" }, m.oppFlag || "🏳️"),
          h("span", {}, m.opponent),
          h("span", { class: "pill pill-venue", title: venueTitle }, m.venue),
        ]),
        scorersHtml ? h("div", { class: "match-scorers", html: scorersHtml }) : null,
      ]),
      h("div", { class: "match-result" }, [
        h("span", {}, m.score),
        h("span", { class: resultPillClass(m.result) }, resultLetter(m.result)),
      ]),
    ]);
  }

  // ---------- router ----------

  function route() {
    const hash = location.hash || "#/";
    app.innerHTML = "";
    window.scrollTo(0, 0);

    const teamMatch = hash.match(/^#\/team\/([A-Z]{2,4})$/i);
    if (teamMatch) {
      app.appendChild(renderTeamDetail(teamMatch[1].toUpperCase()));
    } else {
      app.appendChild(renderOverview());
    }
  }

  window.addEventListener("hashchange", route);
  route();
})();
