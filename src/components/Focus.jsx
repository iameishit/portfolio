import Reveal from './Reveal.jsx';
import focusAreas from '../data/focus.js';

export default function Focus() {
  return (
    <section id="do">
      <div className="wrap">
        <div className="eyebrow">~/focus</div>
        <Reveal as="h2" className="sec-head">
          Two disciplines, <span>one system.</span>
        </Reveal>

        <div className="do-grid">
          {focusAreas.map((card) => (
            <Reveal className="do-card" key={card.title}>
              <span className="corner tl" />
              <span className="corner br" />
              <div className="do-tag">{card.tag}</div>
              <h3>{card.title}</h3>
              <h4>{card.subtitle}</h4>
              <p>{card.body}</p>
              <div className="chip-row">
                {card.chips.map((chip) => (
                  <span className="chip" key={chip}>
                    {chip}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
