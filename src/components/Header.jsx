import { useState } from 'react';
import useScrollProgress from '../hooks/useScrollProgress.js';
import { useTheme } from '../hooks/useTheme.jsx';

const NAV_ITEMS = [
  { id: 'about', label: 'about' },
  { id: 'do', label: 'focus' },
  { id: 'career', label: 'career' },
  { id: 'work', label: 'work' },
  { id: 'stack', label: 'stack' },
  { id: 'certificates', label: 'certificates' },
  { id: 'contact', label: 'contact' },
];

export default function Header({ onOpenPalette }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toggleTheme } = useTheme();
  const { progress, activeId } = useScrollProgress(NAV_ITEMS.map((n) => n.id));

  return (
    <>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <header>
        <div className="nav-inner">
          <a className="logo" href="#hero" aria-label="Home">
            <span className="dot" aria-hidden="true" />
            EN_
          </a>

          <nav className="links" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-nav={item.id}
                className={activeId === item.id ? 'is-active' : ''}
                aria-current={activeId === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <div className="nav-status" aria-hidden="true">
              <span className="pulse" />
              <span>online</span>
            </div>
            <button
              className="icon-btn mono"
              onClick={onOpenPalette}
              aria-label="Open command palette"
              title="Command palette (Ctrl/Cmd+K)"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span className="kbd-hint">⌘K</span>
            </button>
            <button
              className="icon-btn theme-btn"
              id="themeBtn"
              onClick={toggleTheme}
              aria-label="Toggle color theme"
              title="Toggle theme"
            >
              <svg className="i-moon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
              <svg className="i-sun" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            </button>
            <button
              className="menu-btn"
              id="menuBtn"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className="mobile-nav"
          style={{
            position: 'fixed',
            top: 64,
            left: 0,
            right: 0,
            background: 'var(--panel)',
            borderBottom: '1px solid var(--line)',
            display: 'flex',
            flexDirection: 'column',
            padding: '12px 20px',
            zIndex: 99,
          }}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: 'var(--ink)',
                padding: '12px 0',
                borderBottom: '1px solid var(--line)',
                display: 'block',
              }}
            >
              / {item.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
