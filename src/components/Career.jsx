import Reveal from './Reveal.jsx';
import career from '../data/career.js';

export default function Career() {
  return (
    <section id="career">
      <div className="wrap">
        <div className="eyebrow">~/career</div>
        <Reveal as="h2" className="sec-head">
          Built things, <span>then built the thing beneath them.</span>
        </Reveal>

        <div className="timeline">
          <div className="tl-line" aria-hidden="true" />
          {career.map((role, i) => (
            <Reveal
              as="div"
              className={`tl-item${i === career.length - 1 ? ' current' : ''}`}
              key={`${role.title}-${role.org}`}
            >
              <span className="tl-dot" aria-hidden="true" />
              {role.period && <span className="tl-date mono">{role.period}</span>}
              <div className="tl-role">
                <h3>{role.title}</h3>
                <h4>{role.org}</h4>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
