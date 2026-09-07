import { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '../hooks/useTheme.jsx';
import { useToast } from '../hooks/useToast.jsx';
import focusAreas from '../data/focus.js';
import career from '../data/career.js';
import projects from '../data/projects.js';
import skillGroups from '../data/skills.js';

const NAV_COMMANDS = [
  { label: 'About', tag: 'section', href: '#about' },
  { label: 'Focus', tag: 'section', href: '#do' },
  { label: 'Career', tag: 'section', href: '#career' },
  { label: 'Work', tag: 'section', href: '#work' },
  { label: 'Stack', tag: 'section', href: '#stack' },
  { label: 'Certificates', tag: 'section', href: '#certificates' },
  { label: 'Contact', tag: 'section', href: '#contact' },
];

export default function CommandPalette({ isOpen, setIsOpen }) {
  const { toggleTheme } = useTheme();
  const showToast = useToast();
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);

  const actionCommands = useMemo(
    () => [
      {
        label: 'Copy email',
        tag: 'action',
        action: () =>
          navigator.clipboard
            .writeText('eishitnigam59@gmail.com')
            .then(() => showToast('Copied email'))
            .catch(() => showToast('Could not copy, long-press to select instead')),
      },
      {
        label: 'Open GitHub',
        tag: 'link',
        action: () => window.open('https://github.com/iameishit', '_blank', 'noopener'),
      },
      {
        label: 'Open LinkedIn',
        tag: 'link',
        action: () => window.open('https://www.linkedin.com/in/eishit-nigam?_l=en_US', '_blank', 'noopener'),
      },
      { label: 'Toggle theme', tag: 'action', action: toggleTheme },
    ],
    [toggleTheme, showToast]
  );

  const commands = useMemo(() => {
    const seen = new Set();
    const list = [];
    const add = (label, tag, href) => {
      const clean = (label || '').replace(/\s+/g, ' ').trim();
      const key = clean.toLowerCase();
      if (!clean || seen.has(key)) return;
      seen.add(key);
      list.push({ label: clean, tag, href });
    };

    NAV_COMMANDS.forEach((c) => {
      seen.add(c.label.toLowerCase());
      list.push(c);
    });
    actionCommands.forEach((c) => {
      seen.add(c.label.toLowerCase());
      list.push(c);
    });

    focusAreas.forEach((f) => add(f.title, 'focus', '#do'));
    career.forEach((r) => add(r.org ? `${r.title}, ${r.org}` : r.title, 'career', '#career'));
    projects.forEach((p) => add(p.alias ? `${p.title} (${p.alias})` : p.title, 'work', '#work'));
    skillGroups.forEach((g) => g.skills.forEach((s) => add(s, 'skill', '#stack')));

    return list;
  }, [actionCommands]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [query, isOpen]);

  useEffect(() => {
    if (isOpen) requestAnimationFrame(() => inputRef.current?.focus());
    else setQuery('');
  }, [isOpen]);

  const runCommand = (c) => {
    if (c.href) window.location.hash = c.href;
    if (c.action) c.action();
    setIsOpen(false);
  };

  useEffect(() => {
    const onKeyDown = (e) => {
      const isMeta = e.metaKey || e.ctrlKey;
      if (isMeta && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
      if (!isOpen) return;
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIdx((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIdx((i) => Math.max(i - 1, 0));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const c = filtered[selectedIdx];
        if (c) runCommand(c);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, filtered, selectedIdx]);

  if (!isOpen) return null;

  return (
    <div
      className="palette-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <div className="palette-input-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            className="mono"
            placeholder="jump to a section, or type a command..."
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd>esc</kbd>
        </div>
        <ul className="palette-list">
          {filtered.length === 0 ? (
            <li className="palette-empty">No matches for &quot;{query.trim()}&quot;. Try a section or skill name</li>
          ) : (
            filtered.map((c, i) => (
              <li
                key={c.label}
                role="option"
                aria-selected={i === selectedIdx}
                className={i === selectedIdx ? 'is-selected' : ''}
                onClick={() => runCommand(c)}
                onMouseEnter={() => setSelectedIdx(i)}
              >
                {c.label}
                <span className="p-tag">{c.tag}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
