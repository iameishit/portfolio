const WORDS = [
  'EISHIT NIGAM',
  'AI PRODUCT ENGINEER',
  'SYSTEMS ARCHITECT',
  'BUILDER',
  'PALDITA',
  'LOCAL FIRST',
  'PRIVACY FIRST',
  'SANDBOX',
  'SELF HEALING',
  'COMPILERS',
  'TYPESCRIPT',
  'AUTONOMOUS AGENTS',
  'OPEN SOURCE',
  'INDIA',
];

const SEPARATOR = '   \u2022   ';

const RINGS = [
  { radius: 460, fontSize: 22, duration: 130, direction: 1, opacity: 0.05, wordOffset: 0 },
  { radius: 340, fontSize: 18, duration: 95, direction: -1, opacity: 0.07, wordOffset: 4 },
  { radius: 220, fontSize: 15, duration: 70, direction: 1, opacity: 0.09, wordOffset: 8 },
];

const CENTER = 500;

function ringPath(radius) {
  return `M ${CENTER - radius},${CENTER} a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 ${-radius * 2},0`;
}

function ringText(offset) {
  const rotated = [...WORDS.slice(offset), ...WORDS.slice(0, offset)];
  return Array(3).fill(rotated.join(SEPARATOR)).join(SEPARATOR);
}

export default function BackgroundText() {
  return (
    <svg className="bg-text" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        {RINGS.map((ring, i) => (
          <path key={i} id={`bg-ring-${i}`} d={ringPath(ring.radius)} fill="none" />
        ))}
      </defs>
      {RINGS.map((ring, i) => (
        <g
          key={i}
          className="bg-ring"
          style={{
            transformOrigin: `${CENTER}px ${CENTER}px`,
            animationDuration: `${ring.duration}s`,
            animationDirection: ring.direction === 1 ? 'normal' : 'reverse',
            opacity: ring.opacity,
          }}
        >
          <text fontSize={ring.fontSize} letterSpacing="6" className="bg-ring-text">
            <textPath href={`#bg-ring-${i}`} startOffset="0%">
              {ringText(ring.wordOffset)}
            </textPath>
          </text>
        </g>
      ))}
    </svg>
  );
}
