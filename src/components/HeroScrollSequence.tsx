'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import {
  HERO_SEQUENCE,
  segmentIndexFromProgress,
} from '@/lib/heroSequenceConfig';
import styles from './HeroScrollSequence.module.css';

gsap.registerPlugin(ScrollTrigger);

const TEXT_SEGMENTS = [
  {
    side: 'left' as const,
    eyebrow: 'Live · 24/7 Network Operations',
    title: ['Secure &', 'Reliable'],
    titleAccent: 'Shipping',
    body: '100% fastest logistic transport solution — Smart X Logistics blends elite vehicles with cutting-edge technology to deliver your cargo safely, on time, every time.',
    showCtas: true,
  },
  {
    side: 'right' as const,
    eyebrow: 'North America Coverage',
    title: ['Canada &', 'United States'],
    titleAccent: 'Door to Door',
    body: 'Regional and long-haul freight across borders — one pallet through to thousands, with real-time tracking on every mile.',
    showCtas: false,
  },
];

function frameFromProgress(progress: number) {
  return Math.min(
    HERO_SEQUENCE.frameCount - 1,
    Math.floor(progress * (HERO_SEQUENCE.frameCount - 1)),
  );
}

export default function HeroScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const activeSegmentRef = useRef(-1);
  const drawnFrameRef = useRef(-1);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressFillRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const canvasCtx = canvas.getContext('2d');
    if (!canvasCtx) return;

    let mounted = true;
    let preloadTimeout: number | undefined;

    const images = Array.from({ length: HERO_SEQUENCE.frameCount }, (_, i) => {
      const img = new Image();
      img.decoding = 'async';
      return img;
    });
    imagesRef.current = images;

    const loadImage = (index: number) => {
      const img = images[index];
      if (!img || img.src) return;
      img.src = HERO_SEQUENCE.path(index);
    };

    const preloadAll = () => {
      for (let i = 0; i < HERO_SEQUENCE.frameCount; i += 1) {
        loadImage(i);
      }
    };

    for (let i = 0; i < Math.min(90, HERO_SEQUENCE.frameCount); i += 1) {
      loadImage(i);
    }
    preloadTimeout = window.setTimeout(preloadAll, 120);

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = section.offsetWidth || window.innerWidth;
      const h = section.offsetHeight || window.innerHeight;
      if (!w || !h) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvasCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (drawnFrameRef.current >= 0) {
        drawFrame(drawnFrameRef.current);
      }
    };

    const drawFrame = (frame: number) => {
      loadImage(frame);
      loadImage(Math.min(frame + 1, HERO_SEQUENCE.frameCount - 1));
      loadImage(Math.max(frame - 1, 0));

      const img = images[frame];
      if (!img?.complete || !img.naturalWidth) {
        if (img && !img.src) loadImage(frame);
        img?.addEventListener(
          'load',
          () => {
            if (drawnFrameRef.current === frame) drawFrame(frame);
          },
          { once: true },
        );
        return;
      }

      const width = canvas.offsetWidth || window.innerWidth;
      const height = canvas.offsetHeight || window.innerHeight;
      const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      const x = (width - drawW) / 2;
      const y = (height - drawH) / 2;

      canvasCtx.clearRect(0, 0, width, height);
      canvasCtx.drawImage(img, x, y, drawW, drawH);
      drawnFrameRef.current = frame;
    };

    const animateSegmentIn = (index: number) => {
      const el = textRefs.current[index];
      if (!el) return;

      const lines = el.querySelectorAll(`.${styles.titleLine}`);
      const eyebrow = el.querySelector(`.${styles.eyebrow}`);
      const body = el.querySelector(`.${styles.body}`);
      const ctas = el.querySelector(`.${styles.ctas}`);
      const accent = el.querySelector(`.${styles.accent}`);
      const side = TEXT_SEGMENTS[index].side;

      gsap.set(el, { autoAlpha: 1, pointerEvents: 'auto' });

      gsap.fromTo(
        el,
        { x: side === 'right' ? 80 : -80 },
        { x: 0, duration: 0.9, ease: 'power4.out' },
      );

      if (eyebrow) {
        gsap.fromTo(
          eyebrow,
          { autoAlpha: 0, y: -18 },
          { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.05 },
        );
      }

      gsap.fromTo(
        lines,
        { yPercent: 110, autoAlpha: 0 },
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1,
          ease: 'power4.out',
          stagger: 0.1,
          delay: 0.12,
        },
      );

      if (accent) {
        gsap.fromTo(
          accent,
          { scaleX: 0 },
          { scaleX: 1, duration: 1, ease: 'power4.inOut', delay: 0.35 },
        );
      }

      if (body) {
        gsap.fromTo(
          body,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.45 },
        );
      }

      if (ctas) {
        gsap.fromTo(
          ctas.children,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            stagger: 0.1,
            delay: 0.58,
          },
        );
      }
    };

    const animateSegmentOut = (index: number) => {
      const el = textRefs.current[index];
      if (!el) return;

      const side = TEXT_SEGMENTS[index].side;

      gsap.to(el, {
        autoAlpha: 0,
        x: side === 'right' ? 48 : -48,
        duration: 0.45,
        ease: 'power3.in',
        onComplete: () => {
          gsap.set(el, { pointerEvents: 'none' });
        },
      });
    };

    const updateTextForProgress = (progress: number) => {
      const nextSegment = segmentIndexFromProgress(progress);
      if (nextSegment === activeSegmentRef.current) return;

      if (activeSegmentRef.current >= 0) {
        animateSegmentOut(activeSegmentRef.current);
      }

      activeSegmentRef.current = nextSegment;
      if (nextSegment >= 0) {
        animateSegmentIn(nextSegment);
      }
    };

    window.addEventListener('resize', resizeCanvas);

    const firstImg = images[0];
    const onFirstLoad = () => {
      if (!mounted) return;
      drawFrame(0);
      updateTextForProgress(0);
    };

    const scrollEnd = () => `+=${Math.round(window.innerHeight * 4.5)}`;

    let rafId: number;
    const gsapCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: scrollEnd,
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onRefresh: () => {
          resizeCanvas();
        },
        onUpdate: (self) => {
          const frame = frameFromProgress(self.progress);
          drawFrame(frame);
          updateTextForProgress(self.progress);
          if (progressFillRef.current) {
            progressFillRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      });
    }, section);

    rafId = requestAnimationFrame(() => {
      if (!mounted) return;
      resizeCanvas();
      if (firstImg.complete && firstImg.naturalWidth) {
        onFirstLoad();
      } else {
        firstImg.addEventListener('load', onFirstLoad, { once: true });
        if (!firstImg.src) loadImage(0);
      }
      ScrollTrigger.refresh();
    });

    return () => {
      mounted = false;
      if (preloadTimeout) window.clearTimeout(preloadTimeout);
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resizeCanvas);
      gsapCtx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.sequenceHero}>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />

      <div className={styles.overlay} />

      <div className={styles.textLayer}>
        {TEXT_SEGMENTS.map((segment, index) => (
          <div
            key={segment.eyebrow}
            ref={(el) => {
              textRefs.current[index] = el;
            }}
            className={`${styles.textBlock} ${
              segment.side === 'right' ? styles.textRight : styles.textLeft
            }`}
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            <div className={styles.eyebrow}>
              <span className={styles.pulse} />
              <span>{segment.eyebrow}</span>
            </div>

            <div className={styles.titleWrap}>
              {segment.title.map((line) => (
                <div key={line} className={styles.titleLine}>
                  <span className={styles.titleWord}>{line}</span>
                </div>
              ))}
              {segment.titleAccent && (
                <div className={styles.titleLine}>
                  <span className={`${styles.titleWord} ${styles.titleAccent}`}>
                    {segment.titleAccent}
                  </span>
                </div>
              )}
            </div>

            <div className={styles.accent} />

            <p className={styles.body}>{segment.body}</p>

            {segment.showCtas && (
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
        <div className={styles.progressTrack}>
          <div ref={progressFillRef} className={styles.progressFill} />
        </div>
        <span className={styles.progressLabel}>Scroll to explore</span>
      </div>
    </section>
  );
}
