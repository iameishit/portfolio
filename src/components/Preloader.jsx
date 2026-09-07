import { useEffect, useRef, useState } from 'react';
import BackgroundText from './BackgroundText.jsx';

const SCRIPT = [
  {
    prompt: 'whoami',
    output: ['Eishit Nigam', '', 'AI Product Engineer', 'Systems Architect', 'Builder'],
  },
  {
    prompt: 'ls',
    output: ['Paldita/', 'UPNISO/', 'Zeronix/'],
  },
  {
    prompt: 'boot',
    output: ['Initializing...'],
    progress: true,
    after: ['Launching Portfolio...'],
  },
];

const PROMPT_SPEED = 34;
const OUTPUT_SPEED = 10;
const LINE_GAP = 90;
const STEP_GAP = 260;
const PROGRESS_STEPS = 28;
const PROGRESS_TICK = 32;
const FAILSAFE_MS = 9000;

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export default function Preloader({ onDone }) {
  const [lines, setLines] = useState([]);
  const [finished, setFinished] = useState(false);
  const [removed, setRemoved] = useState(false);
  const cancelledRef = useRef(false);
  const finishedRef = useRef(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setFinished(true);
    onDone?.();
    setTimeout(() => setRemoved(true), 650);
  };

  useEffect(() => {
    document.body.classList.add('is-loading');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const failsafe = setTimeout(finish, FAILSAFE_MS);

    const pushLine = (kind, text = '') => {
      setLines((prev) => [...prev, { kind, text }]);
    };

    const updateLast = (text) => {
      setLines((prev) => {
        if (prev.length === 0) return prev;
        const next = prev.slice();
        next[next.length - 1] = { ...next[next.length - 1], text };
        return next;
      });
    };

    const typeInto = async (kind, fullText) => {
      pushLine(kind, '');
      if (cancelledRef.current) return;
      if (reduced) {
        updateLast(fullText);
        return;
      }
      const speed = kind === 'prompt' ? PROMPT_SPEED : OUTPUT_SPEED;
      for (let i = 1; i <= fullText.length; i += 1) {
        if (cancelledRef.current) return;
        updateLast(fullText.slice(0, i));
        // eslint-disable-next-line no-await-in-loop
        await delay(speed);
      }
    };

    const runProgress = async () => {
      pushLine('progress', '');
      if (cancelledRef.current) return;
      if (reduced) {
        updateLast('█'.repeat(PROGRESS_STEPS));
        return;
      }
      for (let i = 1; i <= PROGRESS_STEPS; i += 1) {
        if (cancelledRef.current) return;
        updateLast('█'.repeat(i));
        // eslint-disable-next-line no-await-in-loop
        await delay(PROGRESS_TICK);
      }
    };

    const run = async () => {
      for (const step of SCRIPT) {
        if (cancelledRef.current) return;
        await typeInto('prompt', step.prompt);
        if (cancelledRef.current) return;
        await delay(LINE_GAP);

        for (const outLine of step.output) {
          if (cancelledRef.current) return;
          await typeInto('output', outLine || '\u00A0');
          if (cancelledRef.current) return;
          await delay(LINE_GAP);
        }

        if (step.progress) {
          await runProgress();
          if (cancelledRef.current) return;
          await delay(LINE_GAP * 2);
        }

        if (step.after) {
          for (const line of step.after) {
            if (cancelledRef.current) return;
            await typeInto('output', line);
            if (cancelledRef.current) return;
            await delay(LINE_GAP);
          }
        }

        if (cancelledRef.current) return;
        await delay(STEP_GAP);
      }

      if (cancelledRef.current) return;
      await delay(reduced ? 200 : 420);
      finish();
    };

    run();

    return () => {
      cancelledRef.current = true;
      clearTimeout(failsafe);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (removed) document.body.classList.remove('is-loading');
  }, [removed]);

  if (removed) return null;

  return (
    <div className={`preloader${finished ? ' done' : ''}`} id="preloader">
      <div className="preloader-bg" aria-hidden="true" />
      <div className="preloader-overlay" aria-hidden="true" />
      <BackgroundText />

      <div className="terminal-boot" role="status" aria-live="polite">
        <div className="term-titlebar">
          <span className="tl-btn tl-red" />
          <span className="tl-btn tl-yellow" />
          <span className="tl-btn tl-green" />
          <span className="term-title">eishit@portfolio: zsh</span>
        </div>
        <div className="term-body mono">
          {lines.map((line, i) => (
            <div className={`term-line term-line-${line.kind}`} key={i}>
              {line.kind === 'prompt' && <span className="term-sigil">$</span>}
              <span className="term-text">{line.text}</span>
              {i === lines.length - 1 && !finished && <span className="term-cursor" aria-hidden="true" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
