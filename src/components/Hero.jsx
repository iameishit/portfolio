import { lazy, Suspense } from 'react';
import profile from '../data/profile.js';

// Code-split: the three.js scene is a large, purely decorative dependency.
// Loading it in the main bundle would delay first paint on mobile for a
// background animation — lazy-loading it means the hero text, role, and
// CTA buttons render immediately, and the WebGL background fades in
// separately once its chunk arrives.
const HeroScene = lazy(() => import('./HeroScene.jsx'));

function KineticWords({ text, startDelay = 0, step = 0.05 }) {
  const words = text.split(' ');
  return words.map((word, i) => (
    <span
      className="hero-word"
      key={`${word}-${i}`}
      style={{ animationDelay: `${startDelay + i * step}s` }}
    >
      {word}
    </span>
  ));
}

export default function Hero({ ready }) {
  const { fullName, roles, heroTagline, status } = profile;
  const [first, ...rest] = fullName.toUpperCase().split(' ');
  const lastName = rest.join(' ');

  return (
    <section className={`hero${ready ? ' ready' : ''}`} id="hero">
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>
      <div className="wrap hero-grid-wrap">
        <div className="hero-copy">
          <h1>
            <KineticWords text={first} startDelay={0} />
            <br />
            <span>
              <KineticWords text={lastName} startDelay={0.12} />
            </span>
          </h1>

          <div className="hero-role">
            {roles.map((role, i) => (
              <span key={role} style={{ display: 'contents' }}>
                <b>{role}</b>
                {i < roles.length - 1 && <span className="sep">/</span>}
              </span>
            ))}
          </div>

          <p className="hero-tag">{heroTagline}</p>

          <div className="hero-cta">
            <a className="btn btn-primary" href="#work">
              View systems <span aria-hidden="true">&rarr;</span>
            </a>
            <a className="btn btn-ghost" href="#contact">
              Get in touch
            </a>
          </div>
        </div>

        <div className="signal-panel" aria-label="Current status">
          <div className="signal-head">
            <span>system.status</span>
            <span className="live">
              <span className="live-dot" aria-hidden="true" />
              live
            </span>
          </div>
          {status.map((row) => (
            <div className={`signal-row${row.label === 'RECOGNITION' ? ' is-recognition' : ''}`} key={row.label}>
              <span className="sk mono">{row.label}</span>
              <span className="sv">{row.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
