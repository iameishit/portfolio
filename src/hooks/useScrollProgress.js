import { useEffect, useState } from 'react';

export default function useScrollProgress(sectionIds) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);

      const probe = scrollTop + window.innerHeight * 0.3;
      let current = null;
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      });
      setActiveId(current);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionIds]);

  return { progress, activeId };
}
