import { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from './hooks/useTheme.jsx';
import { ToastProvider } from './hooks/useToast.jsx';
import Preloader from './components/Preloader.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Focus from './components/Focus.jsx';
import Career from './components/Career.jsx';
import Work from './components/Work.jsx';
import Stack from './components/Stack.jsx';
import Certificates from './components/Certificates.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import CommandPalette from './components/CommandPalette.jsx';
import profile from './data/profile.js';

export default function App() {
  const [heroReady, setHeroReady] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <ThemeProvider>
      <ToastProvider>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="grid-bg" aria-hidden="true" />
        <div className="vignette" aria-hidden="true" />

        <Preloader onDone={() => setHeroReady(true)} />
        <CustomCursor />

        <Header onOpenPalette={() => setPaletteOpen(true)} />

        <main id="main">
          <Hero profile={profile} ready={heroReady} />
          <About />
          <Focus />
          <Career />
          <Work />
          <Stack />
          <Certificates />
          <Contact />
        </main>

        <Footer />

        <CommandPalette isOpen={paletteOpen} setIsOpen={setPaletteOpen} />
        <Analytics />
      </ToastProvider>
    </ThemeProvider>
  );
}
