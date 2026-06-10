'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import styles from './HeroScrollSequence.module.css';

gsap.registerPlugin(ScrollTrigger);

// ─── Sequence config ─────────────────────────────────────────────────
const TOTAL_FRAMES = 543;
const frameSrc = (i: number) =>
  `/hero-sequence/frame_${String(i + 1).padStart(5, '0')}.jpg`;

// ─── Text segments ────────────────────────────────────────────────────
const SEGMENTS = [
  {
    side: 'left' as const,
    eyebrow: 'Live · 24/7 Network Operations',
    lines: ['Secure &', 'Reliable'],
    accent: 'Shipping',
    body: '100% fastest logistic transport solution — Smart X Logistics blends elite vehicles with cutting-edge technology to deliver your cargo safely, on time, every time.',
    ctas: true,
  },
  {
    side: 'right' as const,
    eyebrow: 'North America Coverage',
    lines: ['Canada &', 'United States'],
    accent: 'Door to Door',
    body: 'Regional and long-haul freight across borders — one pallet through to thousands, with real-time tracking on every mile.',
    ctas: false,
  },
];

// Divide 0→1 scroll progress into 3 equal thirds; last third = no segment
function segmentAt(p: number) {
  const s = Math.floor(p * 3);
  return s >= 2 ? -1 : s;
}

// ─── Component ────────────────────────────────────────────────────────
export default function HeroScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const textRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const fillRef    = useRef<HTMLDivElement>(null);

  const imgs        = useRef<(HTMLImageElement | null)[]>([]);
  const wantFrame   = useRef(-1);   // most recently requested frame index
  const drawnFrame  = useRef(-1);   // frame index currently on the canvas
  const activeSeg   = useRef(-1);   // current text segment

  useLayoutEffect(() => {
    const section = sectionRef.current!;
    const canvas  = canvasRef.current!;
    const ctx     = canvas.getContext('2d');
    if (!ctx) return;

    let alive = true;
    imgs.current = new Array(TOTAL_FRAMES).fill(null);

    // ── Image loading ─────────────────────────────────────────────
    const loadImg = (i: number) => {
      if (imgs.current[i]) return imgs.current[i]!;
      const img = new Image();
      img.src = frameSrc(i);
      imgs.current[i] = img;
      return img;
    };

    // Load first 40 frames immediately; remainder after a short delay
    for (let i = 0; i < Math.min(40, TOTAL_FRAMES); i++) loadImg(i);
    const preloadTimer = window.setTimeout(() => {
      for (let i = 40; i < TOTAL_FRAMES; i++) loadImg(i);
    }, 300);

    // ── Canvas sizing ─────────────────────────────────────────────
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w   = section.offsetWidth;
      const h   = section.offsetHeight;
      if (!w || !h) return;
      canvas.width  = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width  = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (drawnFrame.current >= 0) paint(drawnFrame.current, true);
    };

    // ── Paint a frame to the canvas ───────────────────────────────
    const paint = (idx: number, force = false) => {
      if (!alive) return;
      wantFrame.current = idx;

      const img = imgs.current[idx];

      if (!img || !img.complete || !img.naturalWidth) {
        // Not ready yet — ensure it's loading and wait
        const loading = loadImg(idx);
        if (idx > 0) loadImg(idx - 1);
        if (idx < TOTAL_FRAMES - 1) loadImg(idx + 1);
        loading.addEventListener('load', () => {
          if (alive && wantFrame.current === idx) paint(idx, true);
        }, { once: true });
        return;
      }

      if (!force && drawnFrame.current === idx) return; // already on screen
      drawnFrame.current = idx;

      const w = section.offsetWidth;
      const h = section.offsetHeight;
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth  * scale;
      const dh = img.naturalHeight * scale;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    // ── Text transitions ──────────────────────────────────────────
    const showSegment = (i: number) => {
      const el = textRefs.current[i];
      if (!el) return;
      const { side } = SEGMENTS[i];
      const titleLines = el.querySelectorAll(`.${styles.titleLine}`);
      const eyebrow    = el.querySelector(`.${styles.eyebrow}`);
      const body       = el.querySelector(`.${styles.body}`);
      const ctas       = el.querySelector(`.${styles.ctas}`);
      const bar        = el.querySelector(`.${styles.accentBar}`);

      gsap.killTweensOf([el, titleLines, eyebrow, body, ctas, bar]);
      gsap.set(el, { autoAlpha: 1, pointerEvents: 'auto' });
      gsap.fromTo(el,
        { x: side === 'right' ? 80 : -80 },
        { x: 0, duration: 0.9, ease: 'power4.out' },
      );
      if (eyebrow) gsap.fromTo(eyebrow,
        { autoAlpha: 0, y: -14 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 0.05 },
      );
      gsap.fromTo(titleLines,
        { yPercent: 110, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.95, ease: 'power4.out', stagger: 0.1, delay: 0.1 },
      );
      if (bar) gsap.fromTo(bar,
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power4.inOut', delay: 0.32 },
      );
      if (body) gsap.fromTo(body,
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.42 },
      );
      if (ctas) gsap.fromTo(ctas.children,
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1, delay: 0.56 },
      );
    };

    const hideSegment = (i: number) => {
      const el = textRefs.current[i];
      if (!el) return;
      gsap.killTweensOf(el);
      gsap.to(el, {
        autoAlpha: 0,
        x: SEGMENTS[i].side === 'right' ? 48 : -48,
        duration: 0.4,
        ease: 'power3.in',
        onComplete: () => gsap.set(el, { pointerEvents: 'none' }),
      });
    };

    const updateSegment = (progress: number) => {
      const next = segmentAt(progress);
      if (next === activeSeg.current) return;
      if (activeSeg.current >= 0) hideSegment(activeSeg.current);
      activeSeg.current = next;
      if (next >= 0) showSegment(next);
    };

    // ── Initial render ────────────────────────────────────────────
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const firstImg = loadImg(0);
    const initDraw = () => {
      if (!alive) return;
      paint(0);
      updateSegment(0);
    };

    if (firstImg.complete && firstImg.naturalWidth) {
      initDraw();
    } else {
      firstImg.addEventListener('load', initDraw, { once: true });
    }

    // ── Scroll-driven animation ───────────────────────────────────
    const gsapCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * 4.5)}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: () => resizeCanvas(),
        onUpdate(self) {
          const idx = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(self.progress * TOTAL_FRAMES),
          );
          paint(idx);
          updateSegment(self.progress);
          if (fillRef.current) {
            fillRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      });
    }, section);

    return () => {
      alive = false;
      window.clearTimeout(preloadTimer);
      window.removeEventListener('resize', resizeCanvas);
      gsapCtx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={styles.overlay} />

      <div className={styles.textLayer}>
        {SEGMENTS.map((seg, i) => (
          <div
            key={seg.eyebrow}
            ref={(el) => { textRefs.current[i] = el; }}
            className={`${styles.textBlock} ${seg.side === 'right' ? styles.textRight : styles.textLeft}`}
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <p className={styles.eyebrow}>
              <span className={styles.pulse} />
              {seg.eyebrow}
            </p>

            <div className={styles.titleWrap}>
              {seg.lines.map((line) => (
                <div key={line} className={styles.titleLine}>
                  <span className={styles.titleWord}>{line}</span>
                </div>
              ))}
              <div className={styles.titleLine}>
                <span className={`${styles.titleWord} ${styles.titleRed}`}>
                  {seg.accent}
                </span>
              </div>
            </div>

            <div className={styles.accentBar} />
            <p className={styles.body}>{seg.body}</p>

            {seg.ctas && (
              <div className={styles.ctas}>
                <Link href="/request-a-quote" className="btn-primary">
                  Request a Quote <ArrowRight size={17} />
                </Link>
                <Link href="/our-services" className="btn-outline">
                  Our Services
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.progress}>
        <div className={styles.track}>
          <div ref={fillRef} className={styles.fill} />
        </div>
        <span className={styles.label}>Scroll to explore</span>
      </div>
    </section>
  );
}
