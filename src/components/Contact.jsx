import Reveal from './Reveal.jsx';
import TallyEmbed from './TallyEmbed.jsx';
import { useToast } from '../hooks/useToast.jsx';

const EMAIL = 'eishitnigam59@gmail.com';

export default function Contact() {
  const showToast = useToast();

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      showToast('Copied: email');
    } catch {
      showToast('Could not copy, long-press to select instead');
    }
  };

  return (
    <section id="contact">
      <div className="wrap">
        <div className="eyebrow">~/contact</div>
        <Reveal as="h2" className="sec-head">
          Let&rsquo;s build <span>something that holds up.</span>
        </Reveal>

        <div className="contact-grid">
          <Reveal className="contact-panel">
            <div className="contact-row">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 6l-10 7L2 6" />
                <path d="M2 6h20v12H2z" />
              </svg>
              <div>
                <span className="ck">Email</span>
                <a className="cv" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </div>
              <button className="copy-btn" onClick={copyEmail} aria-label="Copy email">
                ⧉
              </button>
            </div>
          </Reveal>

          <Reveal className="social-col">
            <a
              className="social-link"
              href="https://github.com/iameishit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <div className="sl-name">GitHub</div>
                <div className="sl-sub">@iameishit</div>
              </div>
              <span aria-hidden="true">→</span>
            </a>
            <a
              className="social-link"
              href="https://www.linkedin.com/in/eishit-nigam?_l=en_US"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div>
                <div className="sl-name">LinkedIn</div>
                <div className="sl-sub">Eishit Nigam</div>
              </div>
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>

          <Reveal className="contact-form tally-panel">
            <TallyEmbed />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
