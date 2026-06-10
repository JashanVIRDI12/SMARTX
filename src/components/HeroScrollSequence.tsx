'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { segmentIndexFromProgress } from '@/lib/heroSequenceConfig';
import styles from './HeroScrollSequence.module.css';

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC = '/hf_20260607_173704_311ea426-af4e-4f46-b163-0ddbb3ea95d2.mp4';
const VIDEO_DURATION = 9.06;

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

export default function HeroScrollSequence() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const activeSegmentRef = useRef(-1);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const progressFillRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    let mounted = true;
    let gsapCtx: ReturnType<typeof gsap.context> | null = null;

    video.pause();
    video.currentTime = 0;

    // ── Text animations ───────────────────────────────────────────────
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
      gsap.fromTo(el, { x: side === 'right' ? 80 : -80 }, { x: 0, duration: 0.9, ease: 'power4.out' });
      if (eyebrow) {
        gsap.fromTo(eyebrow, { autoAlpha: 0, y: -18 }, { autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out', delay: 0.05 });
      }
      gsap.fromTo(lines, { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 1, ease: 'power4.out', stagger: 0.1, delay: 0.12 });
      if (accent) {
        gsap.fromTo(accent, { scaleX: 0 }, { scaleX: 1, duration: 1, ease: 'power4.inOut', delay: 0.35 });
      }
      if (body) {
        gsap.fromTo(body, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.85, ease: 'power3.out', delay: 0.45 });
      }
      if (ctas) {
        gsap.fromTo(ctas.children, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.75, ease: 'power3.out', stagger: 0.1, delay: 0.58 });
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
        onComplete: () => gsap.set(el, { pointerEvents: 'none' }),
      });
    };

    const updateTextForProgress = (progress: number) => {
      const nextSegment = segmentIndexFromProgress(progress);
      if (nextSegment === activeSegmentRef.current) return;
      if (activeSegmentRef.current >= 0) animateSegmentOut(activeSegmentRef.current);
      activeSegmentRef.current = nextSegment;
      if (nextSegment >= 0) animateSegmentIn(nextSegment);
    };

    // ── ScrollTrigger setup ───────────────────────────────────────────
    const setup = () => {
      if (!mounted) return;
      const duration = isFinite(video.duration) && video.duration > 0
        ? video.duration
        : VIDEO_DURATION;

      updateTextForProgress(0);

      const scrollEnd = () => `+=${Math.round(window.innerHeight * 4.5)}`;

      gsapCtx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: scrollEnd,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            video.currentTime = self.progress * duration;
            updateTextForProgress(self.progress);
            if (progressFillRef.current) {
              progressFillRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        });
      }, section);
    };

    // Wait for video metadata so we have the real duration
    if (video.readyState >= 1) {
      setup();
    } else {
      video.addEventListener('loadedmetadata', setup, { once: true });
    }

    return () => {
      mounted = false;
      gsapCtx?.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.sequenceHero}>
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <video
        ref={videoRef}
        className={styles.video}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      <div className={styles.overlay} />

      <div className={styles.textLayer}>
        {TEXT_SEGMENTS.map((segment, index) => (
          <div
            key={segment.eyebrow}
            ref={(el) => { textRefs.current[index] = el; }}
            className={`${styles.textBlock} ${segment.side === 'right' ? styles.textRight : styles.textLeft}`}
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
