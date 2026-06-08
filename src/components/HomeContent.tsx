'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, Truck, Globe, PackageOpen,
  Navigation, DollarSign, ShieldCheck, CreditCard, LifeBuoy, Scale, Phone,
} from 'lucide-react';
import HeroScrollSequence from './HeroScrollSequence';
import { SITE_IMAGES } from '@/lib/siteImages';
import styles from './HomeContent.module.css';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    num: '01',
    icon: Truck,
    title: 'Dryvans & Reefer Units',
    brief: 'Are you interested in working with a professional Trucking Company?',
    desc: 'We supply all the equipment and skills necessary to tackle just about every type of job our clients have for us, no matter how big or small it may be. We\'re committed to providing consistently reliable service in a timely and professional manner.',
    img: SITE_IMAGES.fleetDawn,
  },
  {
    num: '02',
    icon: Globe,
    title: 'Regional and Long Haul',
    brief: 'Get the results you deserve with this quality service, and at an affordable price too!',
    desc: 'Our qualified team of professionals bring their experience and know-how with them on every job. What really sets our services apart is our attention to detail and receptiveness to the unique needs of each client.',
    img: SITE_IMAGES.highway,
  },
  {
    num: '03',
    icon: PackageOpen,
    title: 'Warehousing',
    brief: 'Get this service done quickly and efficiently by the experts here at Smart X Logistics.',
    desc: 'We understand how important it is to feel confident and worry-free when it comes to storage. Our dedicated staff invests the time and energy necessary to be well prepared for any unique requests or special concerns.',
    img: SITE_IMAGES.warehouse,
  },
];

const WHO_WE_ARE_POINTS = [
  'We Provide Services all over Canada and U.S.',
  'Service Quality — Uncompromising Standards',
  'Modern Transport Fleet',
  'One Pallet Through To Thousands',
  'Leaders in Logistics',
];

const CAPABILITIES = [
  { icon: Navigation,   title: 'Real Time Tracking',  desc: 'State-of-the-art GPS and telematics systems monitor your shipment around the clock so you always know where your cargo is.' },
  { icon: DollarSign,   title: 'Reasonable Price',     desc: 'Competitive, transparent rates with no hidden fees — we work with your budget to find the best solution for your needs.' },
  { icon: ShieldCheck,  title: 'Security for Cargo',   desc: 'Multi-layered physical and digital security protocols protect your freight from origin to delivery, every single time.' },
  { icon: CreditCard,   title: 'Easy Payments',        desc: 'Streamlined invoicing and flexible payment options make working with Smart X Logistics effortless from start to finish.' },
  { icon: LifeBuoy,     title: 'End Solutions',        desc: 'Comprehensive transportation services from the point of origin to the recipient\'s door — we handle everything in between.' },
  { icon: Scale,        title: 'Responsibility',        desc: 'Our mission is to design innovative solutions while building and nurturing long-term relationships with every client we serve.' },
];

export default function HomeContent() {
  const rootRef = useRef<HTMLDivElement>(null);
  const tickerInnerRef = useRef<HTMLDivElement>(null);
  const parallaxImgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {

      /* ─── Ticker ─── */
      if (tickerInnerRef.current) {
        gsap.to(tickerInnerRef.current, {
          xPercent: -50, duration: 30, ease: 'none', repeat: -1,
        });
      }

      /* ─── Progress bars ─── */
      document.querySelectorAll<HTMLElement>('.js-bar').forEach((bar) => {
        const target = bar.dataset.target || '0';
        ScrollTrigger.create({
          trigger: bar, start: 'top 85%', once: true,
          onEnter: () => {
            gsap.fromTo(bar,
              { width: '0%' },
              { width: `${target}%`, duration: 1.6, ease: 'power2.out' }
            );
          },
        });
      });

      /* ─── Scroll reveals ─── */
      gsap.utils.toArray<HTMLElement>('.js-reveal').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 50 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.js-reveal-left').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: -60 }, {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.js-stagger-group').forEach((group) => {
        const children = Array.from(group.children) as HTMLElement[];
        gsap.fromTo(children, { opacity: 0, y: 48 }, {
          opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.13,
          scrollTrigger: { trigger: group, start: 'top 80%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.js-img-reveal').forEach((el) => {
        gsap.fromTo(el,
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.1, ease: 'power4.inOut',
            scrollTrigger: { trigger: el, start: 'top 80%', once: true } }
        );
      });

      /* ─── Parallax CTA ─── */
      if (parallaxImgRef.current) {
        gsap.to(parallaxImgRef.current, {
          yPercent: 18, ease: 'none',
          scrollTrigger: {
            trigger: parallaxImgRef.current.parentElement,
            start: 'top bottom', end: 'bottom top', scrub: true,
          },
        });
      }

    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef}>
      {/* ══════════════════════ HERO SEQUENCE ═════════════════ */}
      <HeroScrollSequence />

      {/* ══════════════════════ TICKER ════════════════════════ */}
      <div className={styles.ticker}>
        <div ref={tickerInnerRef} className={styles.tickerInner}>
          {[1, 2].map((i) => (
            <div key={i} className={styles.tickerTrack}>
              {['SECURE & RELIABLE SHIPPING', '100% FASTEST LOGISTICS', 'CANADA & USA COVERAGE', 'DOOR-TO-DOOR SOLUTIONS', 'DRYVANS & REEFERS', 'REGIONAL & LONG HAUL', 'WAREHOUSING SERVICES'].map((item) => (
                <span key={item} className={styles.tickerItem}>
                  <span className={styles.tickerDot}>◆</span>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════ SERVICES PREVIEW ═════════════════ */}
      <section className={styles.servicePreview}>
        <div className="container">
          <div className={`${styles.servicePreviewHeader} js-reveal`}>
            <span className="eyebrow">What We Offer</span>
            <h2 className={styles.servicePreviewTitle}>
              We Offer Best in Class and<br />
              <span className={styles.redText}>Cost Effective</span> Transport Services
            </h2>
          </div>

          <div className={`${styles.servicePreviewGrid} js-stagger-group`}>
            {SERVICES.map(({ num, icon: Icon, title, brief, img }) => (
              <div key={num} className={styles.spCard}>
                <div className={styles.spCardImg}>
                  <img src={img} alt={title} />
                  <div className={styles.spCardImgOverlay} />
                  <span className={styles.spCardNum}>{num}</span>
                </div>
                <div className={styles.spCardBody}>
                  <Icon size={20} className={styles.spCardIcon} />
                  <h3 className={styles.spCardTitle}>{title}</h3>
                  <p className={styles.spCardBrief}>{brief}</p>
                  <Link href="/our-services" className={styles.spCardLink}>
                    Learn more <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ WHAT WE DO (Dryvans Deep Dive) ════ */}
      <section className={styles.whatWeDo}>
        <div className={`container ${styles.whatWeDoInner}`}>
          <div className={`${styles.whatWeDoImg} js-img-reveal`}>
            <img src={SITE_IMAGES.fleetDawn} alt="Dryvans and Reefer Units" />
            <div className={styles.whatWeDoImgBadge}>
              <span className={styles.whatWeDoImgBadgeNum}>01</span>
              <span className={styles.whatWeDoImgBadgeLabel}>Featured Service</span>
            </div>
          </div>

          <div className={`${styles.whatWeDoText} js-reveal-left`}>
            <span className="eyebrow">What We Do</span>
            <h2 className={styles.whatWeDoTitle}>Dryvans &amp; Reefers</h2>
            <p className={styles.whatWeDoBody}>
              Are you interested in working with a professional Trucking Company? We supply all the equipment and skills necessary to tackle just about every type of job our clients have for us, no matter how big or small it may be.
            </p>
            <p className={styles.whatWeDoBody}>
              We&apos;re committed to providing consistently reliable service in a timely and professional manner. Our fleet is modern, our drivers are certified, and our commitment to your cargo is absolute.
            </p>
            <Link href="/our-services" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
              All Services <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ WHO WE ARE ════════════════════════ */}
      <section className={styles.whoWeAre}>
        <div className={`container ${styles.whoWeAreInner}`}>
          <div className={`${styles.whoWeAreText} js-reveal-left`}>
            <span className="eyebrow">Who We Are</span>
            <h2 className={styles.whoWeAreTitle}>
              Professional and Reliable<br />
              <span className={styles.redText}>Transport Services</span>
            </h2>
            <p className={styles.whoWeAreBody}>
              Smart X Logistics is a Calgary, Alberta based Trucking and Logistics company, providing transportation services all over Canada and US. Smart X Logistics Inc. provides clients with reliable and flexible transport solutions, delivering goods safely and on schedule.
            </p>
            <p className={styles.whoWeAreBody}>
              We have the vehicles, facilities, and personnel to accommodate all your transportation needs. Whether it&apos;s one pallet or thousands, we handle all pre-shipping, in transit and post delivery needs.
            </p>

            <ul className={`${styles.whoWeArePoints} js-stagger-group`}>
              {WHO_WE_ARE_POINTS.map((point) => (
                <li key={point} className={styles.whoWeArePoint}>
                  <span className={styles.whoWeArePointDot} />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.whoWeAreImages}>
            <div className={`${styles.whoWeAreImgMain} js-img-reveal`}>
              <img src={SITE_IMAGES.highway} alt="Smart X fleet" />
            </div>
            <div className={styles.whoWeAreImgSide}>
              <div className={`${styles.whoWeAreImgSmall} js-img-reveal`}>
                <img src={SITE_IMAGES.aerial} alt="Aerial fleet view" />
              </div>
              <div className={styles.whoWeAreCard}>
                <div className={`stat-num ${styles.whoWeAreCardNum}`}>15+</div>
                <div className={styles.whoWeAreCardLabel}>Years of Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ AFFILIATIONS / STATS ═════════════ */}
      <section className={styles.affiliations}>
        <div className={`container ${styles.affiliationsInner}`}>
          <div className={`${styles.affiliationsText} js-reveal`}>
            <span className="eyebrow">Affiliations</span>
            <h2 className={styles.affiliationsTitle}>Comprehensive Transportation — Origin to Door</h2>
            <p className={styles.affiliationsBody}>
              Comprehensive transportation services are provided from the point of origin to the recipient&apos;s door. Smart X Logistics handles all pre-shipping, in transit and post delivery needs.
            </p>
            <p className={styles.affiliationsBody}>
              Smart X Logistics ships all goods via every form of transportation. Our standing link with an endless network of freight &amp; distribution companies across North America allows the company to quickly select the best service methods specific to your needs.
            </p>

            <div className={styles.affiliationsBars}>
              <div className={styles.barRow}>
                <div className={styles.barMeta}>
                  <span className={styles.barLabel}>Shipping</span>
                  <span className={styles.barPct}>85%</span>
                </div>
                <div className={styles.barTrack}>
                  <div className={`js-bar ${styles.barFill}`} data-target="85" />
                </div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barMeta}>
                  <span className={styles.barLabel}>Management</span>
                  <span className={styles.barPct}>90%</span>
                </div>
                <div className={styles.barTrack}>
                  <div className={`js-bar ${styles.barFill}`} data-target="90" />
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.affiliationsCallout} js-reveal`}>
            <div className={styles.calloutBox}>
              <div className={styles.calloutIcon}><Phone size={28} /></div>
              <p className={styles.calloutLabel}>Give us a call on</p>
              <a href="tel:4036811515" className={styles.calloutPhone}>(403) 681-1515</a>
              <div className={styles.calloutHours}>Mon – Sat: 8am – 5pm</div>
              <Link href="/request-a-quote" className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
                Request a Quote <ArrowRight size={17} />
              </Link>
            </div>
            <div className={`${styles.affiliationsImg} js-img-reveal`}>
              <img src={SITE_IMAGES.wireframe} alt="Logistics technology" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ SAFETY BANNER ════════════════════ */}
      <section className={styles.safetyBanner}>
        <div className={`container ${styles.safetyBannerInner}`}>
          <div className={`js-reveal`}>
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Services</span>
            <h2 className={styles.safetyBannerTitle}>We Care About<br /><span className={styles.redText}>Safety and Security</span></h2>
          </div>
          <div className={`${styles.safetyBannerRight} js-reveal`}>
            <p>
              We strongly support best practice sharing across our operations around the world and across various transportation sectors. Our mission is to design innovative solutions while building and nurturing long-term client relationships.
            </p>
            <Link href="/safety-and-security" className="btn-outline">
              Our Safety Standards <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ CAPABILITIES ═════════════════════ */}
      <section className={styles.capabilities}>
        <div className="container">
          <div className={`${styles.capHeader} js-reveal`}>
            <span className="eyebrow">Capabilities</span>
            <h2 className={styles.capTitle}>Services That Help Our Customers Meet Their Goals</h2>
          </div>
          <div className={`${styles.capGrid} js-stagger-group`}>
            {CAPABILITIES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className={styles.capCard}>
                <div className={styles.capCardIcon}><Icon size={24} /></div>
                <h3 className={styles.capCardTitle}>{title}</h3>
                <p className={styles.capCardDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ PARALLAX CTA ═════════════════════ */}
      <section className={styles.parallaxSection}>
        <div ref={parallaxImgRef} className={styles.parallaxBg}>
          <img src={SITE_IMAGES.fleetDawn} alt="" />
        </div>
        <div className={styles.parallaxOverlay} />
        <div className={`container ${styles.parallaxContent}`}>
          <div className={`${styles.parallaxBox} js-reveal`}>
            <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>Request a Quote</span>
            <h2 className={styles.parallaxTitle}>
              Ready to Move<br />What Matters?
            </h2>
            <p className={styles.parallaxDesc}>
              Smart X Logistics ships all goods via every form of transportation. Our standing link with an endless network of freight &amp; distribution companies across North America allows us to quickly select the best service methods for your needs.
            </p>
            <Link href="/request-a-quote" className="btn-primary">
              Request a Free Quote <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
