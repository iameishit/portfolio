import Reveal from './Reveal.jsx';
import profile from '../data/profile.js';

export default function About() {
  return (
    <section id="about">
      <div className="wrap">
        <div className="eyebrow">~/about</div>
        <Reveal as="h2" className="sec-head">
          The systems behind the software, <span>not just the surface of it.</span>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-body">
            {profile.aboutBody.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </Reveal>

          <Reveal className="status-panel">
            <div className="sp-head">
              <span>~/now.status</span>
              <span className="pulse" aria-hidden="true" />
            </div>
            {profile.status.map((row) => (
              <div className={`status-row${row.label === 'RECOGNITION' ? ' is-recognition' : ''}`} key={row.label}>
                <span className="k">{row.label}</span>
                <span className="v">{row.value}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
