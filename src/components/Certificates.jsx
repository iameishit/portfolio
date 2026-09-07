import Reveal from './Reveal.jsx';
import certificates from '../data/certificates.js';

export default function Certificates() {
  if (!certificates.length) return null;

  return (
    <section id="certificates">
      <div className="wrap">
        <div className="eyebrow">~/certificates</div>
        <Reveal as="h2" className="sec-head">
          Certificates <span>&amp; learning.</span>
        </Reveal>
        <Reveal as="p" className="cert-lede">
          Continuous learning, not a credentials list — kept visually secondary
          to the actual engineering work above.
        </Reveal>

        <div className="cert-grid">
          {certificates.map((c) => (
            <Reveal
              as="div"
              className="cert-card"
              key={`${c.issuer}-${c.title}`}
              itemScope
              itemType="https://schema.org/EducationalOccupationalCredential"
            >
              {c.image && (
                <img
                  className="cert-image"
                  src={c.image}
                  alt={c.imageAlt || `${c.title} certificate from ${c.issuer}`}
                  loading="lazy"
                  width="1300"
                  height="731"
                />
              )}
              <div className="cert-issuer mono">{c.issuer}</div>
              <h3 itemProp="name">{c.title}</h3>
              {c.subject && <div className="cert-subject">{c.subject}</div>}
              <dl className="cert-meta">
                <div>
                  <dt>Completed</dt>
                  <dd>{c.completionDate || 'Date not listed on certificate'}</dd>
                </div>
                <div>
                  <dt>Credential ID</dt>
                  <dd>{c.credentialId || 'Not issued'}</dd>
                </div>
                {c.signatory && (
                  <div>
                    <dt>Issued by</dt>
                    <dd>{c.signatory}</dd>
                  </div>
                )}
              </dl>
              {c.verificationUrl && (
                <a className="cert-verify" href={c.verificationUrl} target="_blank" rel="noopener noreferrer">
                  Verify credential →
                </a>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
