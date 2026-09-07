import { useEffect, useRef } from 'react';

const TALLY_SRC = 'https://tally.so/widgets/embed.js';
const TALLY_FORM_URL =
  'https://tally.so/embed/xX1gv9?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1';

export default function TallyEmbed() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const loadEmbeds = () => {
      if (typeof window.Tally !== 'undefined') {
        window.Tally.loadEmbeds();
        return;
      }
      document.querySelectorAll('iframe[data-tally-src]:not([src])').forEach((el) => {
        el.src = el.dataset.tallySrc;
      });
    };

    if (typeof window.Tally !== 'undefined') {
      loadEmbeds();
    } else if (!document.querySelector(`script[src="${TALLY_SRC}"]`)) {
      const script = document.createElement('script');
      script.src = TALLY_SRC;
      script.onload = loadEmbeds;
      script.onerror = loadEmbeds;
      document.body.appendChild(script);
    } else {
      loadEmbeds();
    }
  }, []);

  return (
    <iframe
      ref={iframeRef}
      data-tally-src={TALLY_FORM_URL}
      loading="lazy"
      width="100%"
      height="400"
      frameBorder="0"
      marginHeight="0"
      marginWidth="0"
      title="Contact Us"
    />
  );
}
