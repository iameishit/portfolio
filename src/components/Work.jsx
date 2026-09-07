import { useMemo, useState } from 'react';
import Reveal from './Reveal.jsx';
import projects from '../data/projects.js';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'infra', label: 'Infra & Tooling' },
  { id: 'product', label: 'Product' },
  { id: 'concept', label: 'Concept' },
  { id: 'license', label: 'Licensing' },
];

export default function Work() {
  const [filter, setFilter] = useState('all');

  const visible = useMemo(
    () => (filter === 'all' ? projects : projects.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <section id="work">
      <div className="wrap">
        <div className="eyebrow">~/work</div>
        <Reveal as="h2" className="sec-head">
          Systems shipped, <span>and systems still being built.</span>
        </Reveal>

        <div className="filter-row reveal in" role="tablist" aria-label="Filter projects by category">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              className={`filter-chip${filter === f.id ? ' is-active' : ''}`}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="work-grid">
          {visible.map((p) => (
            <Reveal
              as="article"
              className={`work-card work-card--${p.size || 'md'}`}
              key={p.title}
              itemScope
              itemType="https://schema.org/SoftwareApplication"
            >
              <span className="corner tl" />
              <span className="corner br" />
              <div className="work-num mono">{p.number}</div>
              <h3 itemProp="name">
                {p.title} {p.alias && <span className="work-alias">({p.alias})</span>}
              </h3>
              <div className="work-cat" itemProp="applicationCategory">
                {p.categoryLabel}
              </div>
              {p.badgePrimary && (
                <div className="work-badge" itemProp="applicationStatus">
                  {p.badgePrimary}
                </div>
              )}
              {p.recognitionBadge && (
                <div className="work-recognition">
                  <div className="work-recognition-eyebrow">Recognition</div>
                  <div className="work-badge-recognition">{p.recognitionBadge}</div>
                  {p.recognitionNote && <p className="work-recognition-note">{p.recognitionNote}</p>}
                </div>
              )}
              {p.summary && (
                <p className="work-summary" itemProp="description">
                  {p.summary}
                </p>
              )}
              <div className="work-tools-label">TOOLS &amp; FEATURES</div>
              <div className="chip-row">
                {p.tools.map((tool) => (
                  <span className="chip" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
              {(p.repo || p.repoStatus || p.orgUrl) && (
                <div className="work-links">
                  {p.repo && (
                    <a className="work-link-btn" href={p.repo} target="_blank" rel="noopener noreferrer" itemProp="url">
                      Visit repository →
                    </a>
                  )}
                  {p.orgUrl && (
                    <a className="work-link-btn work-link-btn--ghost" href={p.orgUrl} target="_blank" rel="noopener noreferrer">
                      {p.orgLabel || 'GitHub org →'}
                    </a>
                  )}
                  {!p.repo && p.repoStatus && <span className="work-repo-note">{p.repoStatus}</span>}
                </div>
              )}
            </Reveal>
          ))}
        </div>
        {visible.length === 0 && <p className="empty-state">No systems in this category yet.</p>}
      </div>
    </section>
  );
}
