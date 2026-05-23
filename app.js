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

  // ---------- simulation state ----------

  const STATE_KEY = "vm2026.sim.v1";
  const STATE_VERSION = 1;

  const teamsByGroup = (() => {
    const g = {};
    for (const t of DATA.teams) (g[t.group] = g[t.group] || []).push(t);
    return g;
  })();
  const teamByCode = Object.fromEntries(DATA.teams.map((t) => [t.code, t]));
  const ALL_GROUPS = Object.keys(teamsByGroup).sort();

  function loadState() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      if (parsed.version !== STATE_VERSION) return defaultState();
      return Object.assign(defaultState(), parsed);
    } catch (_) {
      return defaultState();
    }
  }

  function defaultState() {
    return {
      version: STATE_VERSION,
      groupOrder: {},
      thirdStats: {},
      matchWinners: {},
    };
  }

  let simState = loadState();

  // Seed default ordering (data.js order) for any group not yet ranked, so
  // the user gets an "out of the box" lineup they can refine instead of an
  // empty form.
  (function seedDefaultOrder() {
    let changed = false;
    for (const g of ALL_GROUPS) {
      const cur = simState.groupOrder[g];
      if (!Array.isArray(cur) || cur.length !== teamsByGroup[g].length) {
        simState.groupOrder[g] = teamsByGroup[g].map((t) => t.code);
        changed = true;
      }
    }
    if (changed) {
      try { localStorage.setItem(STATE_KEY, JSON.stringify(simState)); } catch (_) {}
    }
  })();

  function persist() {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(simState));
    } catch (_) {}
  }

  function resetState() {
    simState = defaultState();
    for (const g of ALL_GROUPS) {
      simState.groupOrder[g] = teamsByGroup[g].map((t) => t.code);
    }
    persist();
    route();
  }

  // Returns the user-defined or default order of teams in a group.
  function orderedGroup(g) {
    const codes = simState.groupOrder[g];
    if (Array.isArray(codes) && codes.length === teamsByGroup[g].length) {
      const lookup = new Map(teamsByGroup[g].map((t) => [t.code, t]));
      const seen = new Set();
      const out = [];
      for (const c of codes) {
        const t = lookup.get(c);
        if (t && !seen.has(c)) { out.push(t); seen.add(c); }
      }
      for (const t of teamsByGroup[g]) if (!seen.has(t.code)) out.push(t);
      return out;
    }
    return teamsByGroup[g].slice();
  }

  function isGroupRanked(g) {
    const codes = simState.groupOrder[g];
    return Array.isArray(codes) && codes.length === teamsByGroup[g].length;
  }

  function allGroupsRanked() {
    return ALL_GROUPS.every(isGroupRanked);
  }

  function thirdStatComplete(g) {
    const s = simState.thirdStats[g];
    return s && Number.isFinite(s.pts) && Number.isFinite(s.gd) && Number.isFinite(s.gf);
  }

  function allThirdStatsComplete() {
    return ALL_GROUPS.every(thirdStatComplete);
  }

  // Default any missing pts/gd/gf to 0 for ranked groups so the bracket can
  // be opened even if the user skipped the cutline form.
  function fillMissingThirdStats() {
    for (const g of ALL_GROUPS) {
      if (!isGroupRanked(g)) continue;
      const cur = simState.thirdStats[g] || {};
      simState.thirdStats[g] = {
        pts: Number.isFinite(cur.pts) ? cur.pts : 0,
        gd: Number.isFinite(cur.gd) ? cur.gd : 0,
        gf: Number.isFinite(cur.gf) ? cur.gf : 0,
      };
    }
    persist();
  }

  // Top eight third-placed teams, by pts -> gd -> gf -> group letter.
  function topEightThirds() {
    if (!allGroupsRanked() || !allThirdStatsComplete()) return null;
    const ranked = ALL_GROUPS.map((g) => {
      const code = simState.groupOrder[g][2];
      const stats = simState.thirdStats[g];
      return { group: g, code, ...stats };
    });
    ranked.sort((a, b) =>
      b.pts - a.pts ||
      b.gd - a.gd ||
      b.gf - a.gf ||
      a.group.localeCompare(b.group)
    );
    return ranked.slice(0, 8);
  }

  function thirdAllocation() {
    const top = topEightThirds();
    if (!top) return null;
    const key = top.map((r) => r.group).sort().join("");
    const table = window.THIRD_PLACE_ALLOCATION || {};
    return { advancing: top, mapping: table[key] || null };
  }

  // Resolve a slot ref (winner / runnerup / third / matchWinner / matchLoser)
  // to a team object, or null if not yet decided.
  function resolveRef(ref) {
    if (!ref) return null;
    switch (ref.kind) {
      case "winner": {
        if (!isGroupRanked(ref.group)) return null;
        return teamByCode[simState.groupOrder[ref.group][0]] || null;
      }
      case "runnerup": {
        if (!isGroupRanked(ref.group)) return null;
        return teamByCode[simState.groupOrder[ref.group][1]] || null;
      }
      case "third": {
        const alloc = thirdAllocation();
        if (!alloc || !alloc.mapping) return null;
        const tag = alloc.mapping[ref.slot]; // "3X"
        if (!tag) return null;
        const g = tag.slice(1);
        if (!isGroupRanked(g)) return null;
        return teamByCode[simState.groupOrder[g][2]] || null;
      }
      case "matchWinner": {
        const code = simState.matchWinners[ref.match];
        return code ? teamByCode[code] || null : null;
      }
      case "matchLoser": {
        const code = simState.matchWinners[ref.match];
        if (!code) return null;
        const fx = (window.BRACKET_FIXTURES || []).find((m) => m.id === ref.match);
        if (!fx) return null;
        const home = resolveRef(fx.home);
        const away = resolveRef(fx.away);
        if (!home || !away) return null;
        return code === home.code ? away : home;
      }
    }
    return null;
  }

  // Human-readable placeholder when a slot is not decided.
  function refPlaceholder(ref) {
    switch (ref.kind) {
      case "winner": return `Vinner gruppe ${ref.group}`;
      case "runnerup": return `Toer gruppe ${ref.group}`;
      case "third": {
        const groups = (window.THIRD_PLACE_SLOTS || {})[ref.slot] || [];
        return `3-er gruppe ${groups.join("/")}`;
      }
      case "matchWinner": return `Vinner kamp ${ref.match}`;
      case "matchLoser": return `Taper kamp ${ref.match}`;
    }
    return "?";
  }

  // When a match's teams change or a winner is no longer one of the two
  // teams, drop that winner pick and recursively any pick that depended on it.
  function pruneInvalidWinners() {
    const fixtures = window.BRACKET_FIXTURES || [];
    let changed = true;
    while (changed) {
      changed = false;
      for (const fx of fixtures) {
        const winnerCode = simState.matchWinners[fx.id];
        if (!winnerCode) continue;
        const home = resolveRef(fx.home);
        const away = resolveRef(fx.away);
        const validCodes = [home && home.code, away && away.code].filter(Boolean);
        if (!validCodes.includes(winnerCode)) {
          delete simState.matchWinners[fx.id];
          changed = true;
        }
      }
    }
  }

  // ---------- views ----------

  function renderOverview() {
    const root = h("div", { class: "overview" });

    root.appendChild(renderSimToolbar());

    for (const g of ALL_GROUPS) {
      root.appendChild(renderGroup(g));
    }

    return root;
  }

  function renderSimToolbar() {
    const ranked = allGroupsRanked();
    const ready = ranked && allThirdStatsComplete();
    const groupsDone = ALL_GROUPS.filter(isGroupRanked).length;
    const statsDone = ALL_GROUPS.filter(thirdStatComplete).length;

    const status = ready
      ? "Klar for sluttspill?"
      : !ranked
        ? `Ranger lagene i hver gruppe (${groupsDone}/12 ferdig).`
        : `Fyll inn poeng og målforskjell for tredjeplassene (${statsDone}/12 — manglende felt blir 0).`;

    const goToBracket = () => {
      if (ranked && !ready) fillMissingThirdStats();
    };

    const actions = [
      h(
        "a",
        {
          class: ranked ? "btn btn-primary" : "btn",
          href: "#/bracket",
          onclick: goToBracket,
        },
        ranked ? "Gå til bracket →" : "Inspiser bracket →"
      ),
      h(
        "button",
        {
          class: "btn btn-ghost",
          type: "button",
          onclick: () => {
            if (confirm("Nullstille all simulering (rangering, poeng, vinnere)?")) {
              resetState();
            }
          },
        },
        "Nullstill"
      ),
    ];

    return h("section", { class: "sim-toolbar" }, [
      h("div", { class: "sim-toolbar-text" }, [
        h("h2", {}, "Simuler VM"),
        h("p", {}, status),
      ]),
      h("div", { class: "sim-toolbar-actions" }, actions),
    ]);
  }

  function renderGroup(g) {
    const teams = orderedGroup(g);
    const ranked = isGroupRanked(g);

    const list = h(
      "div",
      {
        class: "team-grid rank-list",
        "data-group": g,
      },
      teams.map((t, idx) => renderRankCard(t, idx, g))
    );

    attachDragHandlers(list, g);

    const children = [
      h("div", { class: "group-header" }, [
        h("h2", { class: "group-title", "data-letter": g, "aria-label": `Gruppe ${g}` }),
      ]),
      list,
    ];

    if (ranked) {
      children.push(renderThirdStats(g, teams[2]));
    }

    return h("section", { class: "group" }, children);
  }

  function renderRankCard(team, idx, g) {
    const last5 = team.form.slice(-5);
    const sum = summarize(last5);

    const formStrip = h(
      "div",
      { class: "form-strip" },
      last5.map((m) =>
        h("span", { class: resultPillClass(m.result), title: `${m.opponent} ${m.score}` }, resultLetter(m.result))
      )
    );

    const card = h(
      "div",
      {
        class: "team-card rank-card",
        "data-code": team.code,
        "data-group": g,
        draggable: "true",
        tabindex: "0",
        role: "listitem",
        "aria-label": `Plass ${idx + 1}: ${team.name}`,
      },
      [
        h(
          "span",
          {
            class: `rank-badge rank-${idx + 1}`,
            "aria-label": `Plass ${idx + 1} — dra for å endre`,
            title: "Dra for å endre plassering",
          },
          String(idx + 1)
        ),
        h("div", { class: "rank-card-main" }, [
          h("div", { class: "team-card-top" }, [
            h("span", { class: "team-flag" }, team.flag),
            h("div", {}, [
              h("div", { class: "team-name" }, team.name),
              h("div", { class: "team-meta" }, team.coach),
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
        ]),
        h(
          "a",
          {
            class: "rank-detail-link",
            href: `#/team/${team.code}`,
            "aria-label": `Detaljer for ${team.name}`,
            title: "Åpne lagprofil",
          },
          "→"
        ),
      ]
    );

    card.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      e.preventDefault();
      const teams = orderedGroup(g).map((t) => t.code);
      const i = teams.indexOf(team.code);
      const j = e.key === "ArrowUp" ? i - 1 : i + 1;
      if (j < 0 || j >= teams.length) return;
      [teams[i], teams[j]] = [teams[j], teams[i]];
      simState.groupOrder[g] = teams;
      pruneInvalidWinners();
      persist();
      updateGroupInPlace(g);
      const next = document.querySelector(`.rank-card[data-group="${g}"][data-code="${team.code}"]`);
      if (next) next.focus();
    });

    return card;
  }

  function attachDragHandlers(listEl, g) {
    let draggedCode = null;

    listEl.addEventListener("dragstart", (e) => {
      const card = e.target.closest(".rank-card");
      if (!card || card.dataset.group !== g) return;
      draggedCode = card.dataset.code;
      card.classList.add("is-dragging");
      e.dataTransfer.effectAllowed = "move";
      try { e.dataTransfer.setData("text/plain", draggedCode); } catch (_) {}
    });

    listEl.addEventListener("dragend", () => {
      const el = listEl.querySelector(".is-dragging");
      if (el) el.classList.remove("is-dragging");
      listEl.querySelectorAll(".drop-target").forEach((n) => n.classList.remove("drop-target"));
      draggedCode = null;
    });

    listEl.addEventListener("dragover", (e) => {
      const card = e.target.closest(".rank-card");
      if (!card || card.dataset.group !== g) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      listEl.querySelectorAll(".drop-target").forEach((n) => n.classList.remove("drop-target"));
      card.classList.add("drop-target");
    });

    listEl.addEventListener("drop", (e) => {
      const card = e.target.closest(".rank-card");
      if (!card || card.dataset.group !== g) return;
      e.preventDefault();
      const targetCode = card.dataset.code;
      if (!draggedCode || draggedCode === targetCode) return;
      const order = orderedGroup(g).map((t) => t.code);
      const from = order.indexOf(draggedCode);
      const to = order.indexOf(targetCode);
      if (from < 0 || to < 0) return;
      order.splice(from, 1);
      order.splice(to, 0, draggedCode);
      simState.groupOrder[g] = order;
      pruneInvalidWinners();
      persist();
      updateGroupInPlace(g);
    });
  }

  // Reorder rank-cards in a group's DOM list and refresh dependent UI
  // (rank badges, third-place panel, sim toolbar) without triggering a full
  // re-render — keeps scroll position and avoids flicker.
  function updateGroupInPlace(g) {
    const list = document.querySelector(`.rank-list[data-group="${g}"]`);
    if (!list) return;
    const order = orderedGroup(g);

    for (const team of order) {
      const card = list.querySelector(`.rank-card[data-code="${team.code}"]`);
      if (card) list.appendChild(card);
    }

    Array.from(list.querySelectorAll(".rank-card")).forEach((card, idx) => {
      const team = order[idx];
      const badge = card.querySelector(".rank-badge");
      if (badge) {
        badge.textContent = String(idx + 1);
        badge.className = `rank-badge rank-${idx + 1}`;
      }
      card.setAttribute("aria-label", `Plass ${idx + 1}: ${team.name}`);
    });

    const groupSection = list.closest(".group");
    if (groupSection) {
      const oldStats = groupSection.querySelector(".third-stats");
      if (isGroupRanked(g)) {
        const newStats = renderThirdStats(g, order[2]);
        if (oldStats) oldStats.replaceWith(newStats);
        else groupSection.appendChild(newStats);
      } else if (oldStats) {
        oldStats.remove();
      }
    }

    const tb = document.querySelector(".sim-toolbar");
    if (tb) tb.replaceWith(renderSimToolbar());
  }

  function renderThirdStats(g, team) {
    const stats = simState.thirdStats[g] || {};
    const update = (field) => (e) => {
      const v = e.target.value === "" ? null : parseInt(e.target.value, 10);
      const cur = simState.thirdStats[g] || {};
      const next = { ...cur, [field]: Number.isFinite(v) ? v : undefined };
      simState.thirdStats[g] = next;
      persist();
      const banner = document.querySelector(".sim-toolbar");
      if (banner) banner.replaceWith(renderSimToolbar());
    };

    const input = (label, field, min, max) =>
      h("label", { class: "third-stat-field" }, [
        h("span", {}, label),
        h("input", {
          type: "number",
          inputmode: "numeric",
          min: min != null ? String(min) : null,
          max: max != null ? String(max) : null,
          step: "1",
          value: stats[field] != null ? String(stats[field]) : "",
          onchange: update(field),
          oninput: update(field),
        }),
      ]);

    return h("div", { class: "third-stats" }, [
      h("div", { class: "third-stats-head" }, [
        h("span", { class: "team-flag", style: "font-size:18px" }, team.flag),
        h("strong", {}, team.name),
      ]),
      h("div", { class: "third-stats-fields" }, [
        input("Poeng", "pts", 0, 9),
        input("Målforskjell", "gd", -20, 20),
        input("Mål for", "gf", 0, 30),
      ]),
    ]);
  }

  // ---------- bracket view ----------

  function renderBracket() {
    const fixtures = window.BRACKET_FIXTURES || [];
    const rounds = window.BRACKET_ROUNDS || [];

    const root = h("div", { class: "bracket-page" });

    root.appendChild(
      h("div", { class: "bracket-header" }, [
        h("a", { class: "back-link", href: "#/" }, "← Tilbake til gruppene"),
        h("button", {
          class: "btn btn-ghost",
          type: "button",
          onclick: () => {
            if (confirm("Nullstille alle vinnervalg i bracketen?")) {
              simState.matchWinners = {};
              persist();
              updateBracketInPlace();
            }
          },
        }, "Nullstill bracket"),
      ])
    );

    const champion = simState.matchWinners[104]
      ? teamByCode[simState.matchWinners[104]]
      : null;
    if (champion) {
      root.appendChild(
        h("section", { class: "champion-banner" }, [
          h("span", { class: "champion-trophy" }, "🏆"),
          h("div", {}, [
            h("div", { class: "champion-label" }, "Verdensmester 2026"),
            h("div", { class: "champion-name" }, [
              h("span", { class: "team-flag", style: "font-size:34px" }, champion.flag),
              h("span", {}, champion.name),
            ]),
          ]),
        ])
      );
    }

    const alloc = thirdAllocation();
    if (allGroupsRanked() && allThirdStatsComplete() && (!alloc || !alloc.mapping)) {
      root.appendChild(
        h("p", { class: "bracket-warning" }, "Klarte ikke å slå opp tredjeplass-kombinasjonen.")
      );
    }

    const grid = h("div", { class: "bracket-grid" });
    for (const r of rounds) {
      const matches = fixtures.filter((f) => f.round === r.id);
      const col = h("div", { class: `bracket-col bracket-col-${r.id}` }, [
        h("h3", { class: "bracket-col-title" }, r.title),
        ...matches.map(renderBracketMatch),
      ]);
      grid.appendChild(col);
    }
    root.appendChild(grid);

    return root;
  }

  function renderBracketMatch(fx) {
    const home = resolveRef(fx.home);
    const away = resolveRef(fx.away);
    const winnerCode = simState.matchWinners[fx.id];

    const teamRow = (team, ref, side) => {
      const placeholder = !team ? refPlaceholder(ref) : null;
      const isWinner = team && winnerCode === team.code;
      const isLoser = team && winnerCode && winnerCode !== team.code;
      const cls = [
        "bracket-team",
        team ? "is-resolved" : "is-pending",
        isWinner ? "is-winner" : "",
        isLoser ? "is-eliminated" : "",
      ]
        .filter(Boolean)
        .join(" ");

      return h(
        "button",
        {
          class: cls,
          type: "button",
          disabled: team ? null : "disabled",
          "data-side": side,
          onclick: () => team && pickWinner(fx.id, team.code),
        },
        [
          h("span", { class: "team-flag", style: "font-size:18px" }, team ? team.flag : "·"),
          h("span", { class: "bracket-team-name" }, team ? team.name : placeholder),
          isWinner ? h("span", { class: "bracket-tick" }, "✓") : null,
        ]
      );
    };

    return h("article", {
      class: `bracket-match round-${fx.round}`,
      "data-match-id": String(fx.id),
    }, [
      h("header", { class: "bracket-match-meta" }, [
        h("span", { class: "bracket-match-id" }, `#${fx.id}`),
        h("span", { class: "bracket-match-date" }, formatDate(fx.date)),
        h("span", { class: "bracket-match-venue", title: fx.venue }, fx.venue.split(",")[0]),
      ]),
      teamRow(home, fx.home, "home"),
      teamRow(away, fx.away, "away"),
    ]);
  }

  function pickWinner(matchId, code) {
    if (simState.matchWinners[matchId] === code) {
      delete simState.matchWinners[matchId];
    } else {
      simState.matchWinners[matchId] = code;
    }
    pruneInvalidWinners();
    persist();
    if ((location.hash || "#/") === "#/bracket") {
      updateBracketInPlace();
    } else {
      route();
    }
  }

  // Refresh bracket UI after a pick without full route() — keeps scroll position.
  function updateBracketInPlace() {
    const page = document.querySelector(".bracket-page");
    if (!page) {
      route();
      return;
    }

    const champion = simState.matchWinners[104]
      ? teamByCode[simState.matchWinners[104]]
      : null;
    const oldBanner = page.querySelector(".champion-banner");
    if (champion) {
      const banner = h("section", { class: "champion-banner" }, [
        h("span", { class: "champion-trophy" }, "🏆"),
        h("div", {}, [
          h("div", { class: "champion-label" }, "Verdensmester 2026"),
          h("div", { class: "champion-name" }, [
            h("span", { class: "team-flag", style: "font-size:34px" }, champion.flag),
            h("span", {}, champion.name),
          ]),
        ]),
      ]);
      if (oldBanner) oldBanner.replaceWith(banner);
      else page.insertBefore(banner, page.querySelector(".bracket-grid"));
    } else if (oldBanner) {
      oldBanner.remove();
    }

    const alloc = thirdAllocation();
    const warnNeeded =
      allGroupsRanked() && allThirdStatsComplete() && (!alloc || !alloc.mapping);
    const oldWarn = page.querySelector(".bracket-warning");
    if (warnNeeded) {
      const warn = h(
        "p",
        { class: "bracket-warning" },
        "Klarte ikke å slå opp tredjeplass-kombinasjonen."
      );
      if (oldWarn) oldWarn.replaceWith(warn);
      else page.insertBefore(warn, page.querySelector(".bracket-grid"));
    } else if (oldWarn) {
      oldWarn.remove();
    }

    const fixtures = window.BRACKET_FIXTURES || [];
    for (const fx of fixtures) {
      const article = page.querySelector(`.bracket-match[data-match-id="${fx.id}"]`);
      if (article) article.replaceWith(renderBracketMatch(fx));
    }
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
          h("div", { class: "team-meta" }, `Gruppe ${team.group} · ${team.coach} · ${team.squad.length} spillere`),
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
    } else if (hash === "#/bracket") {
      app.appendChild(renderBracket());
    } else {
      app.appendChild(renderOverview());
    }
  }

  window.addEventListener("hashchange", route);
  route();
})();
