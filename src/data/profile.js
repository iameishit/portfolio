const profile = {
  fullName: 'Eishit Nigam',
  roles: ['AI Product Engineer', 'Systems Architect', 'Builder'],
  heroTagline:
    'I turn AI ideas into shipped products — using LLMs, specialized tooling, and sandboxed execution environments rather than hand-writing model or agent code from scratch. My work is architecture and product judgment: deciding what to build, how it should behave under real use, and which infrastructure choices actually hold up once people depend on it.',
  aboutBody: [
    "I'm an AI Product Engineer, not primarily a model-training or agent-coding role — my job is turning an AI idea into an actual working product. That means product and architecture decisions come first: what the tool should do, where the risk sits, which parts need to be sandboxed or cryptographically verified, and how a person or another system should actually interact with it. LLMs and specialized developer tooling handle a lot of the execution; my responsibility is deciding what gets built and making sure it's correct once it's real.",
    "Concretely, that looks like designing the layer beneath the product: local sandboxed execution, HMAC-signed communication channels between local and remote processes, self-healing compilers, and the routing and permission decisions that determine whether a system is safe to actually run. These are the parts that don't demo well but decide whether everything else holds up once real users or real workloads hit it.",
    "Outside of infrastructure work, I've also scoped and designed consumer-facing products — a creator-first social platform, an emotion-aware wearable concept — always working through the same sequence: threat model and architecture first, interface second. The throughline across all of it is the same question: how do you design a system that behaves predictably at scale, whether that system is a coding agent, a social platform, or delivery infrastructure.",
  ],
  status: [
    { label: 'ROLE', value: 'Founder & Lead Architect' },
    { label: 'ORG', value: 'Paldita' },
    { label: 'BUILDING', value: 'Terminal-first AI coding agent' },
    { label: 'CORE', value: 'Ghost Workspace (sandboxed exec)' },
    { label: 'SECURITY', value: 'HMAC-signed local channels' },
    { label: 'RECOGNITION', value: 'Swiggy Builders Club — MCP Integration Partner' },
    { label: 'SINCE', value: '2026, present' },
  ],
};

export default profile;
