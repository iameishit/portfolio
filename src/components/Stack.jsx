import Reveal from './Reveal.jsx';
import skillGroups from '../data/skills.js';

export default function Stack() {
  return (
    <section id="stack">
      <div className="wrap">
        <div className="eyebrow">~/stack</div>
        <Reveal as="h2" className="sec-head">
          Tools of the <span>trade.</span>
        </Reveal>

        <Reveal className="stack-groups">
          {skillGroups.map((group) => (
            <div key={group.name}>
              <div className="stack-group-label">{group.name.toUpperCase()}</div>
              <div className="stack-chip-row">
                {group.skills.map((skill) => (
                  <span className="stack-chip" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
