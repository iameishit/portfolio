// repo / repoLabel / repoStatus are optional — only set when a real,
// verifiable URL exists. Never invent a repository link.
// orgUrl/orgLabel render as a second, separate button (GitHub org page),
// distinct from the repo button — only added where the project has both.
//
// `summary` is intentionally proportional to how much verified detail
// exists for each project: Paldita, TRLM, and PPCL have real source
// material (READMEs, license text, status panels) to draw a real
// problem/solution paragraph from. UPNISO and Zeronix don't have that
// material yet, so their summaries stay honest and modest rather than
// padded out to match the others artificially.
const projects = [
  {
    number: '01',
    title: 'Paldita',
    alias: 'Sugar Cube',
    category: 'infra',
    categoryLabel: 'AI Developer Tooling & Infra',
    summary:
      'Paldita is a terminal-first AI coding agent built to close the gap between "AI writes code" and "AI code runs safely." Its core is Ghost Workspace, a sandboxed execution environment that lets an agent actually run and iterate on code without touching the host system directly, and every local-to-remote communication channel is HMAC-signed so a compromised or misbehaving process can\'t spoof commands between the agent and its workspace. It\'s the project this portfolio\'s own preloader and terminal aesthetic are drawn from.',
    badgePrimary: 'In active development',
    recognitionBadge: 'Swiggy Builders Club — MCP Integration Partner',
    recognitionNote:
      'Paldita is recognized as an MCP Integration Partner within the Swiggy Builders Club program.',
    tools: ['Go', 'TypeScript', 'Fastify', 'Ollama', 'WebSockets (HMAC)', 'PostgreSQL', 'SQLite'],
    size: 'lg',
    repo: null,
    repoStatus: 'Repository not yet public',
    orgUrl: 'https://github.com/Paldita',
    orgLabel: 'Paldita on GitHub',
  },
  {
    number: '02',
    title: 'TRLM',
    alias: 'Transactional Reliable Link Middleware',
    category: 'infra',
    categoryLabel: 'Durable Event & Webhook Delivery Infrastructure',
    summary:
      'TRLM (formerly Webhook Vault) sits between event sources — Stripe, GitHub, or a product\'s own backend — and the systems that need to receive them, solving the problem of webhook delivery silently failing during an outage. It durably persists every accepted event to Postgres before attempting delivery, so a receiver being down for an hour becomes a retry queue instead of lost data, with independent per-target delivery state, dead-letter inspection, and replay. It also enforces real controls rather than decorative ones: SSRF protection that DNS-pins immediately before each delivery attempt (closing the rebinding window), scoped API keys, and a sliding-window rate limiter — backed by 52 passing tests, including SSRF-blocking and multi-worker concurrency cases run against real PostgreSQL in CI.',
    badgePrimary: 'Open source, in development',
    recognitionBadge: null,
    recognitionNote: null,
    tools: ['Python 3.12+', 'PostgreSQL', 'Docker', 'Kubernetes', 'pytest', 'ruff', 'bandit'],
    size: 'lg',
    repo: 'https://github.com/Paldita/Paldita-TRLM',
    repoStatus: null,
  },
  {
    number: '03',
    title: 'UPNISO',
    alias: null,
    category: 'product',
    categoryLabel: 'Creator-First Social Network',
    summary:
      'UPNISO is an early-stage social platform concept built around creators rather than an algorithmic feed, currently in development on a React/Node/WebSocket stack. It\'s earlier-stage than Paldita or TRLM — the product direction is still being shaped, so this page intentionally stays at the level of what\'s verified (stack, status) rather than describing features that haven\'t been finalized yet.',
    badgePrimary: 'In development',
    recognitionBadge: null,
    recognitionNote: null,
    tools: ['React 18', 'Tailwind CSS', 'Node.js', 'WebSocket', 'PostgreSQL', 'Redis'],
    size: 'md',
    repo: null,
    repoStatus: null,
  },
  {
    number: '04',
    title: 'Zeronix Wearable',
    alias: null,
    category: 'concept',
    categoryLabel: 'Emotion-Aware Wearable AI',
    summary:
      'Zeronix Wearable is a concept/prototype exploring emotion-aware sensing on wearable hardware — reading signal data through sensor APIs and embedded systems rather than a phone-based sensor stack. It hasn\'t moved past the concept/prototype stage, and is listed here as an example of the hardware-adjacent direction explored alongside the software infrastructure work, not as a shipped product.',
    badgePrimary: 'Concept / prototype',
    recognitionBadge: null,
    recognitionNote: null,
    tools: ['Python', 'Signal Processing', 'Sensor APIs', 'Embedded Systems'],
    size: 'full',
    repo: null,
    repoStatus: null,
  },
  {
    number: '05',
    title: 'PPCL',
    alias: 'Paldita Public Copyleft License',
    category: 'license',
    categoryLabel: 'Open-Source License Framework',
    summary:
      'PPCL exists to close a specific gap in standard open-source licensing: a permissive or weak-copyleft license lets a company take open code, run it as a paid hosted service, and never contribute anything back. PPCL is a strong network-use copyleft license — if you run it as a service, you owe your users the source, not just if you distribute a copy — with no fees and no field-of-endeavor restriction. Paldita FairShare 1.0 is the deliberate alternative for the opposite case: a company that wants to keep its code closed pays a fee, signs an agreement, or gets a waiver instead. Both are jointly created and owned by Eishit Nigam and Paldita, currently at "community review" status — designed to meet OSI/FSF definitions but not yet formally submitted for that approval.',
    badgePrimary: 'Community review',
    recognitionBadge: null,
    recognitionNote: null,
    tools: ['Network-Use Copyleft', 'Source-Available', 'Commercial Alternative', 'Patent Retaliation'],
    size: 'full',
    repo: 'https://github.com/Paldita/ppcl-license',
    repoStatus: null,
  },
];

export default projects;
