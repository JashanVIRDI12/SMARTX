'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Globe, MapPin, Plane, Ship, Truck, Warehouse,
  ShieldCheck, Users, Zap, ArrowRight, CheckCircle,
} from 'lucide-react';
import styles from './AboutContent.module.css';

gsap.registerPlugin(ScrollTrigger);

const TRANSPORT_MODES = [
  { icon: Plane,     title: 'Airplane Flight',  desc: 'We offer end-to-end logistics tailored for specific markets, providing swift air freight solutions with full cargo care.' },
  { icon: Ship,      title: 'Ocean Freight',     desc: 'We offer end-to-end logistics tailored for specific markets, delivering reliable overseas shipping with full visibility.' },
  { icon: Truck,     title: 'Road Freight',      desc: 'We offer end-to-end logistics tailored for specific markets, covering every highway across Canada and the United States.' },
  { icon: Warehouse, title: 'Warehouse',         desc: 'We offer end-to-end logistics tailored for specific markets, with secure modern warehousing at key distribution points.' },
];

const CONTRIBUTE_FEATURES = [
  { icon: ShieldCheck, title: 'Safe & Secure Delivery', desc: 'We offer end-to-end logistics tailored for specific markets, ensuring your cargo arrives intact and on schedule every time.' },
  { icon: Users,       title: 'Professional Services',   desc: 'We offer end-to-end logistics tailored for specific markets, backed by a team of certified, experienced logistics professionals.' },
];

const COVERAGE_POINTS = [
  'We Provide Services all over Canada and U.S.',
  'Service Quality — Uncompromising Standards',
  'Modern Transport Fleet',
  'One Pallet Through To Thousands',
  'Leaders in Logistics',
];

const TRUCKING_BRAND_SERVICES = [
  'Full Truckload (FTL) and Less-than-Truckload (LTL) Shipping',
  'Cross-Border Transportation',
  'Temperature-Controlled Freight',
  'Expedited and Time-Sensitive Shipments',
  'Specialized Freight Handling',
  'Warehousing and Distribution',
];

const WHY_CHOOSE = [
  {
    icon: Zap,
    title: 'Fast Worldwide Delivery',
    desc: 'We ensure rapid and reliable delivery across the globe, helping your business stay on schedule. Our extensive logistics network guarantees your shipments reach their destination without unnecessary delays.',
  },
  {
    icon: Globe,
    title: 'End-to-End Solution Available',
    desc: 'From pickup to final delivery, we manage the entire logistics process with precision and care. Our comprehensive services allow you to focus on your business while we handle the rest.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety & Compliance',
    desc: 'We prioritize the highest safety standards to protect your cargo and ensure secure transportation. Our operations strictly adhere to industry regulations and compliance requirements for your peace of mind.',
  },
];

const TESTIMONIALS = [
  {
    quote: 'Smart X Logistics has been a game-changer for our supply chain. On-time, every time — and their team is always reachable when we need them.',
    name: 'James T.',
    role: 'Operations Manager, Retail Co.',
  },
  {
    quote: 'We\'ve worked with many carriers. Smart X stands out for their professionalism and the care they take with temperature-sensitive freight.',
    name: 'Sara M.',
    role: 'Procurement Lead, Food Distribution',
  },
];

export default function AboutContent() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.js-hero-line',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.1, delay: 0.3 }
      );
      gsap.fromTo('.js-hero-sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.7 }
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
        const children = Array.from(group.children) as HTMLElement[];
        gsap.fromTo(children, { opacity: 0, y: 44 }, {
          opacity: 1, y: 0, duration: 0.85, ease: 'power3.out', stagger: 0.13,
          scrollTrigger: { trigger: group, start: 'top 80%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.js-img-reveal').forEach((el) => {
        gsap.fromTo(el,
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1.15, ease: 'power4.inOut',
            scrollTrigger: { trigger: el, start: 'top 80%', once: true } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src="/fleet_driving.png" alt="" className={styles.heroBgImg} />
          <div className={styles.heroBgOverlay} />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', display: 'inline-flex' }}>
            About Us
          </span>
          <div className={styles.titleLine}>
            <h1 className={`js-hero-line ${styles.heroTitle}`}>We Specialise in</h1>
          </div>
          <div className={styles.titleLine}>
            <h1 className={`js-hero-line ${styles.heroTitle} ${styles.heroTitleRed}`}>Transportation</h1>
          </div>
          <div className={styles.titleLine}>
            <p className={`js-hero-sub ${styles.heroSub}`}>We provide a full range global logistics solution</p>
          </div>
        </div>
      </section>

      {/* ─── Intro / Story ─── */}
      <section className={styles.intro}>
        <div className={`container ${styles.introInner}`}>
          <div className={`${styles.introText} js-reveal-left`}>
            <span className="eyebrow">Who We Are</span>
            <h2 className={styles.introTitle}>
              Your Trusted Partner in<br />
              <span className={styles.red}>Global Logistics</span>
            </h2>
            <p className={styles.introBody}>
              Are you interested in working with a professional Trucking Company? We supply all the equipment and skills necessary to tackle just about every type of job our clients have for us, no matter how big or small it may be.
            </p>
            <p className={styles.introBody}>
              We&apos;re committed to providing consistently reliable service in a timely and professional manner. You can take your freight &amp; logistics needs with a personal approach at Smart X Logistics.
            </p>

            <div className={`${styles.introHighlights} js-stagger-group`}>
              <div className={styles.introHighlight}>
                <Globe size={22} className={styles.introHighlightIcon} />
                <div>
                  <strong>Worldwide Service</strong>
                  <p>We offer end-to-end logistics tailored for specific markets.</p>
                </div>
              </div>
              <div className={styles.introHighlight}>
                <MapPin size={22} className={styles.introHighlightIcon} />
                <div>
                  <strong>Local Service</strong>
                  <p>We offer end-to-end logistics tailored for specific markets.</p>
                </div>
              </div>
            </div>

            <Link href="/request-a-quote" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
              Work With Us <ArrowRight size={17} />
            </Link>
          </div>

          <div className={styles.introImages}>
            <div className={`${styles.introImgMain} js-img-reveal`}>
              <img src="/city_truck.png" alt="Smart X truck" />
            </div>
            <div className={`${styles.introImgSub} js-img-reveal`}>
              <img src="/tech_logistics.png" alt="Logistics technology" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Transport Modes ─── */}
      <section className={styles.modes}>
        <div className="container">
          <div className={`${styles.modesHeader} js-reveal`}>
            <span className="eyebrow">Cost Efficient</span>
            <h2 className={styles.modesTitle}>We Offer Cost Effective<br /><span className={styles.red}>Transport Shipping</span></h2>
          </div>
          <div className={`${styles.modesGrid} js-stagger-group`}>
            {TRANSPORT_MODES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className={styles.modeCard}>
                <div className={styles.modeCardIcon}><Icon size={26} /></div>
                <h3 className={styles.modeCardTitle}>{title}</h3>
                <p className={styles.modeCardDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contribute / Coverage ─── */}
      <section className={styles.contribute}>
        <div className={`container ${styles.contributeInner}`}>
          <div className={`${styles.contributeText} js-reveal-left`}>
            <span className="eyebrow">Our Commitment</span>
            <h2 className={styles.contributeTitle}>
              We Aim to Contribute Well<br />
              <span className={styles.red}>to Your Company</span>
            </h2>
            <p className={styles.contributeBody}>
              We are very proud of our workforce and have worked hard to create a business that attracts those people who want to appreciate the importance. We strongly support best practice sharing across our operations around the world and across various industrial sectors.
            </p>

            <div className={`${styles.contributeFeatures} js-stagger-group`}>
              {CONTRIBUTE_FEATURES.map(({ icon: Icon, title, desc }) => (
                <div key={title} className={styles.contributeFeature}>
                  <div className={styles.contributeFeatureIcon}><Icon size={20} /></div>
                  <div>
                    <h4 className={styles.contributeFeatureTitle}>{title}</h4>
                    <p className={styles.contributeFeatureDesc}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.contributeRight}>
            <div className={`${styles.contributeImg} js-img-reveal`}>
              <img src="/aerial_fleet.png" alt="Fleet overview" />
            </div>
            <div className={`${styles.coverageList} js-stagger-group`}>
              {COVERAGE_POINTS.map((point) => (
                <div key={point} className={styles.coverageItem}>
                  <CheckCircle size={16} className={styles.coverageIcon} />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ─── */}
      <section className={styles.missionVision}>
        <div className="container">
          <div className={`${styles.mvGrid} js-stagger-group`}>
            <div className={styles.mvCard}>
              <span className={styles.mvNum}>01</span>
              <span className="eyebrow">Our Mission</span>
              <h2 className={styles.mvTitle}>Our Mission</h2>
              <p className={styles.mvBody}>
                At Smart X Logistics, our mission is to provide reliable, efficient, and customer-focused transportation and logistics solutions across Canada and the United States. We are committed to delivering freight safely and on time while maintaining the highest industry standards in service, technology, and sustainability. Through innovation, professionalism, and a dedication to excellence, we strive to build lasting partnerships and support businesses in achieving their logistics goals.
              </p>
            </div>
            <div className={`${styles.mvCard} ${styles.mvCardAlt}`}>
              <span className={styles.mvNum}>02</span>
              <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.45)' }}>Our Vision</span>
              <h2 className={styles.mvTitle}>Our Vision</h2>
              <p className={styles.mvBody}>
                Our vision is to be a leading force in the logistics and transportation industry, recognized for our reliability, innovation, and commitment to customer satisfaction. We aim to revolutionize freight services through cutting-edge technology, eco-friendly solutions, and a strong focus on safety and efficiency. By fostering a culture of excellence and continuous improvement, we aspire to set new industry benchmarks and be the preferred logistics partner for businesses across North America.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── The Trucking Brand ─── */}
      <section className={styles.brand}>
        <div className={`container ${styles.brandInner}`}>
          <div className={`${styles.brandText} js-reveal`}>
            <span className="eyebrow">What We Do</span>
            <h2 className={styles.brandTitle}>The Trucking Brand</h2>
            <p className={styles.brandBody}>
              We specialize in a wide range of transportation and logistics services, including but not limited to:
            </p>
            <ul className={`${styles.brandList} js-stagger-group`}>
              {TRUCKING_BRAND_SERVICES.map((s) => (
                <li key={s} className={styles.brandListItem}>
                  <ArrowRight size={14} className={styles.brandListIcon} />
                  {s}
                </li>
              ))}
            </ul>
            <Link href="/our-services" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
              View All Services <ArrowRight size={17} />
            </Link>
          </div>
          <div className={`${styles.brandImg} js-img-reveal`}>
            <img src="/warehouse.png" alt="Smart X warehousing" />
          </div>
        </div>
      </section>

      {/* ─── Why Choose Trucking ─── */}
      <section className={styles.whyChoose}>
        <div className="container">
          <div className={`${styles.whyHeader} js-reveal`}>
            <span className="eyebrow">Why Choose Trucking</span>
            <h2 className={styles.whyTitle}>Why Choose Smart X Logistics</h2>
          </div>
          <div className={`${styles.whyGrid} js-stagger-group`}>
            {WHY_CHOOSE.map(({ icon: Icon, title, desc }) => (
              <div key={title} className={styles.whyCard}>
                <div className={styles.whyCardIcon}><Icon size={26} /></div>
                <h3 className={styles.whyCardTitle}>{title}</h3>
                <p className={styles.whyCardDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className={styles.testimonials}>
        <div className="container">
          <div className={`${styles.testiHeader} js-reveal`}>
            <span className="eyebrow">Testimonial</span>
            <h2 className={styles.testiTitle}>What Our Customers Say</h2>
            <p className={styles.testiSub}>
              Smart X Logistics ships all goods via every form of transportation. Our standing link with an endless network of freight &amp; distribution companies across North America allows the company to quickly select the best service methods specific to your needs.
            </p>
          </div>
          <div className={`${styles.testiGrid} js-stagger-group`}>
            {TESTIMONIALS.map(({ quote, name, role }) => (
              <div key={name} className={styles.testiCard}>
                <div className={styles.testiQuoteMark}>&ldquo;</div>
                <p className={styles.testiQuote}>{quote}</p>
                <div className={styles.testiAuthor}>
                  <div className={styles.testiAuthorDot} />
                  <div>
                    <div className={styles.testiAuthorName}>{name}</div>
                    <div className={styles.testiAuthorRole}>{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
