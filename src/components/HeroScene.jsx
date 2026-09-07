import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Purely decorative, additive background animation for the hero section.
 * Reads its two colors directly from the page's existing CSS variables
 * (--accent, --copper) so it can never introduce a color outside the
 * current palette or drift out of sync with the light/dark theme toggle.
 * Renders nothing (component returns null → no canvas mounted at all) when
 * the user has requested reduced motion, matching how every other
 * animation on this site already behaves.
 */
export default function HeroScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return undefined;

    const container = containerRef.current;
    if (!container) return undefined;

    const styles = getComputedStyle(document.documentElement);
    const accentColor = new THREE.Color(styles.getPropertyValue('--accent').trim() || '#7c9cbf');
    const copperColor = new THREE.Color(styles.getPropertyValue('--copper').trim() || '#c08a4e');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    container.appendChild(renderer.domElement);

    // Wireframe icosahedron — the "system architecture" motif, low-poly and
    // line-only so it reads as a technical diagram, not decoration for its
    // own sake.
    const icoGeometry = new THREE.IcosahedronGeometry(2.4, 1);
    const edges = new THREE.EdgesGeometry(icoGeometry);
    const wireMaterial = new THREE.LineBasicMaterial({ color: accentColor, transparent: true, opacity: 0.5 });
    const wireframe = new THREE.LineSegments(edges, wireMaterial);
    wireframe.position.set(2.6, 0.4, 0);
    scene.add(wireframe);

    // Sparse particle field, copper-toned, drifting very slowly.
    const particleCount = 90;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: copperColor,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      sizeAttenuation: true,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    let raf;
    let disposed = false;

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const clock = new THREE.Clock();
    const animate = () => {
      if (disposed) return;
      const t = clock.getElapsedTime();
      wireframe.rotation.x = t * 0.08;
      wireframe.rotation.y = t * 0.12;
      particles.rotation.y = t * 0.015;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      wireMaterial.dispose();
      edges.dispose();
      icoGeometry.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className="hero-canvas" ref={containerRef} aria-hidden="true" />;
}
