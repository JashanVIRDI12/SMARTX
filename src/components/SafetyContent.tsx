'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShieldCheck, Navigation, Lock, Activity,
  Truck, Coffee, ArrowRight, CheckCircle,
} from 'lucide-react';
import { SITE_IMAGES } from '@/lib/siteImages';
import styles from './SafetyContent.module.css';

gsap.registerPlugin(ScrollTrigger);

const CHECKLIST = [
  'Never leave a rig or semi unattended for long periods of time. If a driver must leave their truck unattended, choose a secure or authorized location with adequate lighting and security cameras. Park within view of the cameras.',
  'Lock it up. Whenever in transit, lock the tractor and trailer with a steering wheel lock, kingpin locks, glad-hand locks, and put industrial-strength padlocks on trailer doors.',
  'Take the keys. Eleven percent of stolen vehicles in the U.S. have the keys left inside.',
  'Encourage route planning. Your trucks are safest when you avoid remote areas, desolate routes, and poorly lit parking lots.',
];

const TIPS = [
  {
    icon: Truck,
    title: 'Maintaining Safe Distances',
    desc: 'Keeping a safe distance from other vehicles and obstacles is crucial in preventing collisions. This safety measure is especially important in congested areas and during reverse moving.',
  },
  {
    icon: ShieldCheck,
    title: 'Safe Unloading Practices',
    desc: 'Safe unloading practices are vital for preventing accidents during the moving of materials. Using the hydraulic lift system cautiously and avoiding raising the bed on uneven ground can prevent tipping.',
  },
  {
    icon: Coffee,
    title: 'Rest to be Best on the Roads',
    desc: 'Taking proper rest is one of the most effective truck safety tips every driver should be aware of. Driving requires focus, and nothing undermines your concentration like fatigue.',
  },
];

const PILLARS = [
  { icon: Navigation,   title: 'ELD Tracking',          desc: 'For tracking services we use ELD of Hutch Systems, monitoring speed, braking, routes, idling, and time working in real time.' },
  { icon: Lock,         title: 'Cargo Security',         desc: 'Secure yards, advanced locking mechanisms, and multi-layered security measures prevent theft and unauthorized access at every stage.' },
  { icon: Activity,     title: 'Satisfactory Rating',    desc: 'Our company carries a "Satisfactory" rating — the best available — with both U.S. and Canadian transportation regulators.' },
  { icon: ShieldCheck,  title: 'Driver Compliance',      desc: 'New driver hiring practices meet all Federal Motor Carrier Standards. We employ some of the most experienced, responsible operators available.' },
];

export default function SafetyContent() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.js-hero-line',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.1, delay: 0.3 }
      );
      gsap.fromTo('.js-hero-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.75 }
      );

      gsap.utils.toArray<HTMLElement>('.js-reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 48 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.js-reveal-left').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: -50 }, {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.js-stagger-group').forEach((group) => {
        gsap.fromTo(Array.from(group.children) as HTMLElement[],
          { opacity: 0, y: 44 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.13,
            scrollTrigger: { trigger: group, start: 'top 80%', once: true } }
        );
      });

      gsap.utils.toArray<HTMLElement>('.js-img-reveal').forEach((el) => {
        gsap.fromTo(el,
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.15, ease: 'power4.inOut',
            scrollTrigger: { trigger: el, start: 'top 80%', once: true } }
        );
      });

      /* Animate the "Satisfactory" badge counter */
      ScrollTrigger.create({
        trigger: '.js-badge',
        start: 'top 80%',
        once: true,
        onEnter: () => {
          gsap.fromTo('.js-badge',
            { scale: 0.6, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.4)' }
          );
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src={SITE_IMAGES.aerial} alt="" className={styles.heroBgImg} />
          <div className={styles.heroBgOverlay} />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', display: 'inline-flex' }}>
            Safety and Security Regulation
          </span>
          <div className={styles.titleLine}>
            <h1 className={`js-hero-line ${styles.heroTitle}`}>We Care About</h1>
          </div>
          <div className={styles.titleLine}>
            <h1 className={`js-hero-line ${styles.heroTitle} ${styles.heroTitleRed}`}>Safety &amp; Security</h1>
          </div>
          <div className={styles.titleLine}>
            <p className={`js-hero-sub ${styles.heroSub}`}>Keeping Your Trucks Safe in Transit</p>
          </div>
        </div>
      </section>

      {/* ─── Main Intro ─── */}
      <section className={styles.intro}>
        <div className={`container ${styles.introInner}`}>
          <div className={`${styles.introText} js-reveal-left`}>
            <span className="eyebrow">Our Approach</span>
            <h2 className={styles.introTitle}>
              Safety is Our<br />
              <span className={styles.red}>Top Priority</span>
            </h2>
            <p className={styles.introBody}>
              Smart X Logistics focuses on safety and security, both on and off the street. Our drivers meet and pass industry standards. Smart X Logistics emphasize not only on the drivers&apos; past driving records but also on the proper driving test and knowledge test.
            </p>
            <p className={styles.introBody}>
              Drivers need to pass the drug test to maintain the safety and security around. New recruited drivers start working with experienced drivers to learn company protocols and to gain experience driving across borders.
            </p>
            <p className={styles.introBody}>
              Not limiting to this, our team in office is always keeping a track of the drivers and the truck by using technology. Smart X Logistics tracks imperative driving insights — for example, speed, braking, routes, idling, and time working.
            </p>
            <p className={styles.introBody}>
              For tracking services we use <strong>ELD of Hutch Systems</strong>. We can also provide tracking services of our trucks to customers if they request to track their load.
            </p>
          </div>

          <div className={styles.introSide}>
            <div className={`${styles.introImg} js-img-reveal`}>
              <img src={SITE_IMAGES.fleetDawn} alt="Smart X fleet" />
            </div>
            <div className={`${styles.introBadge} js-badge`}>
              <ShieldCheck size={28} className={styles.introBadgeIcon} />
              <div className={styles.introBadgeText}>
                <strong>&ldquo;Satisfactory&rdquo; Rating</strong>
                <span>The best available — with U.S. &amp; Canadian regulators</span>
              </div>
            </div>
            <p className={styles.introSideNote}>
              Our new driver hiring practices meet all Federal Motor Carrier Standards. We are proud to employ some of the most experienced responsible operators available. We have one of the lowest collision and claim frequencies and are fully insured.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Safety Pillars ─── */}
      <section className={styles.pillars}>
        <div className="container">
          <div className={`${styles.pillarsHeader} js-reveal`}>
            <span className="eyebrow">Our Standards</span>
            <h2 className={styles.pillarsTitle}>How We Protect Every Load</h2>
          </div>
          <div className={`${styles.pillarsGrid} js-stagger-group`}>
            {PILLARS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className={styles.pillarCard}>
                <div className={styles.pillarIcon}><Icon size={24} /></div>
                <h3 className={styles.pillarTitle}>{title}</h3>
                <p className={styles.pillarDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Driver Checklist ─── */}
      <section className={styles.checklist}>
        <div className={`container ${styles.checklistInner}`}>
          <div className={`${styles.checklistText} js-reveal`}>
            <span className="eyebrow">Driver Checklist</span>
            <h2 className={styles.checklistTitle}>
              A Checklist for<br />
              <span className={styles.red}>Truck Drivers</span>
            </h2>
            <p className={styles.checklistBody}>
              Trucks are most vulnerable on the road, and the primary barrier between your trucks and criminals is the drivers themselves. Make sure to train your drivers on loss and theft prevention, so they&apos;ll know what to look for to keep themselves, their trucks, and their cargo safe.
            </p>
            <Link href="/contact-us" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
              Contact Our Team <ArrowRight size={17} />
            </Link>
          </div>

          <ul className={`${styles.checklistItems} js-stagger-group`}>
            {CHECKLIST.map((item, i) => (
              <li key={i} className={styles.checklistItem}>
                <CheckCircle size={18} className={styles.checklistIcon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Keep Country Running Banner ─── */}
      <section className={styles.banner}>
        <div className={styles.bannerBg}>
          <img src={SITE_IMAGES.highway} alt="" />
          <div className={styles.bannerOverlay} />
        </div>
        <div className={`container ${styles.bannerContent}`}>
          <div className={`js-reveal`}>
            <h2 className={styles.bannerTitle}>
              Trucks Keep the Country Running.<br />
              <span className={styles.red}>Keep Them Safe.</span>
            </h2>
            <p className={styles.bannerSub}>
              Trucking is the backbone of what keeps our country running. It&apos;s up to commercial business owners like you to keep it safe from thieves. With these tips, your drivers can feel safer on the road, and you can have greater peace of mind knowing you can meet your professional obligations without criminals standing in the way.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Safety Tips ─── */}
      <section className={styles.tips}>
        <div className="container">
          <div className={`${styles.tipsHeader} js-reveal`}>
            <span className="eyebrow">Best Practices</span>
            <h2 className={styles.tipsTitle}>Keeping Your Trucks Safe in Transit</h2>
          </div>
          <div className={`${styles.tipsGrid} js-stagger-group`}>
            {TIPS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className={styles.tipCard}>
                <div className={styles.tipCardIcon}><Icon size={26} /></div>
                <h3 className={styles.tipCardTitle}>{title}</h3>
                <p className={styles.tipCardDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Strip ─── */}
      <section className={styles.cta}>
        <div className={`container ${styles.ctaInner}`}>
          <div className="js-reveal">
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.45)' }}>Ship with Confidence</span>
            <h2 className={styles.ctaTitle}>Our Safety Record Speaks for Itself</h2>
            <p className={styles.ctaBody}>
              One of the lowest collision and claim frequencies in the industry. Fully insured. Satisfactory-rated by U.S. and Canadian regulators. Ready to move your cargo safely.
            </p>
          </div>
          <div className={styles.ctaBtns}>
            <Link href="/request-a-quote" className="btn-primary">
              Request a Quote <ArrowRight size={17} />
            </Link>
            <Link href="/contact-us" className="btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
