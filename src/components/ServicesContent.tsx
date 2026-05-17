'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Thermometer, Package, Truck, Layers, Warehouse,
  DollarSign, Navigation, ShieldCheck, ChevronDown, ArrowRight,
} from 'lucide-react';
import styles from './ServicesContent.module.css';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: 'refrigerated',
    num: '01',
    icon: Thermometer,
    title: 'Refrigerated Service',
    img: '/fleet_driving.png',
    body: 'SmartX is a leader in refrigerated trucking services throughout Western Canada. Our experienced drivers, state-of-the-art refrigerated equipment, and temperature monitoring solutions are designed to provide dependable, on-time deliveries throughout the year.',
  },
  {
    id: 'dry',
    num: '02',
    icon: Package,
    title: 'Dry Service',
    img: '/hero_truck.png',
    body: 'SmartX specializes in full truckload transportation within Western Canada (BC, Alberta, Saskatchewan and Manitoba). Although many of our customers use us for temperature-controlled shipments, several companies use us for dry shipments to take advantage of our tri-axle units.',
  },
  {
    id: 'triaxle',
    num: '03',
    icon: Truck,
    title: 'Tri-Axle Service',
    img: '/city_truck.png',
    body: 'Smart X has a fleet of tri-axle units. Most of these units are refrigerated trailers, and half of those units are dual temperature trailers. Although many of our customers use our services for temperature-controlled shipments, many others choose SmartX Logistics for dry shipments, taking advantage of our capacity to move heavier loads.',
  },
  {
    id: 'multitemp',
    num: '04',
    icon: Layers,
    title: 'Multi-Temp Service',
    img: '/aerial_fleet.png',
    body: 'Smart X Logistics has built our tri-axle fleet around an equal number of single temperature and multi-temperature trailers. These units provide the unique ability to ship products together, resulting in considerable cost savings year over year. But what really sets our services apart is our attention to detail and receptiveness to the needs of each client.',
  },
  {
    id: 'warehousing',
    num: '05',
    icon: Warehouse,
    title: 'Warehousing Service',
    img: '/warehouse.png',
    body: 'Get this service done quickly and efficiently by the experts here at Smart X Logistics. We understand how important it is to feel confident and worry free when it comes to the service we provide. Our dedicated staff invests the time and energy necessary to be well prepared for any unique requests or special concerns our clients may have.',
  },
];

const FEATURED = [
  {
    icon: DollarSign,
    title: 'Transparent Pricing',
    desc: 'We offer clear, upfront pricing with no hidden fees, so you always know exactly what you\'re paying for.',
  },
  {
    icon: Navigation,
    title: 'Real Time Tracking',
    desc: 'Our advanced tracking system lets you monitor your shipment\'s journey in real time, giving you full visibility and peace of mind.',
  },
  {
    icon: ShieldCheck,
    title: 'Warehouse Storage',
    desc: 'We provide secure, flexible warehouse storage solutions to keep your goods safe and ready for quick distribution.',
  },
];

const FAQS = [
  {
    q: 'What services does Smart X Logistics provide?',
    a: 'SmartX Logistics provides fast worldwide delivery, end-to-end logistics solutions, real-time tracking, warehouse storage, and strict safety and compliance measures.',
  },
  {
    q: 'What regions do you service?',
    a: 'We specialize in transportation throughout Western Canada (BC, Alberta, Saskatchewan and Manitoba) and provide services all over Canada and the US via our network of freight and distribution partners.',
  },
  {
    q: 'Do you offer temperature-controlled shipping?',
    a: 'Yes. We are a leader in refrigerated trucking services and also offer multi-temperature trailers that allow shipping products requiring different temperature ranges in a single unit — resulting in significant cost savings.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Simply visit our Request a Quote page, fill in your shipment details, and our team will get back to you within 24 hours with a competitive, transparent estimate.',
  },
];

export default function ServicesContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

      gsap.utils.toArray<HTMLElement>('.js-reveal-right').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: 50 }, {
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
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src="/hero_truck.png" alt="" className={styles.heroBgImg} />
          <div className={styles.heroBgOverlay} />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', display: 'inline-flex' }}>
            Our Services
          </span>
          <div className={styles.titleLine}>
            <h1 className={`js-hero-line ${styles.heroTitle}`}>Our Transportation</h1>
          </div>
          <div className={styles.titleLine}>
            <h1 className={`js-hero-line ${styles.heroTitle} ${styles.heroTitleRed}`}>Services</h1>
          </div>
          <div className={styles.titleLine}>
            <p className={`js-hero-sub ${styles.heroSub}`}>
              We offer you a wide range of expert transportation services, which will make your delivery process easy and quick. All our SmartX transportation solutions are presented here.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Services List ─── */}
      <section className={styles.servicesList}>
        <div className="container">
          {SERVICES.map(({ id, num, icon: Icon, title, img, body }, i) => (
            <div
              key={id}
              className={`${styles.serviceRow} ${i % 2 !== 0 ? styles.serviceRowAlt : ''}`}
            >
              <div className={`${styles.serviceRowImg} js-img-reveal`}>
                <img src={img} alt={title} />
                <div className={styles.serviceRowImgNum}>{num}</div>
              </div>
              <div className={`${styles.serviceRowText} js-reveal`}>
                <div className={styles.serviceRowIcon}><Icon size={26} /></div>
                <h2 className={styles.serviceRowTitle}>{title}</h2>
                <p className={styles.serviceRowBody}>{body}</p>
                <Link href="/request-a-quote" className="btn-primary">
                  Get a Quote <ArrowRight size={17} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Featured Qualities ─── */}
      <section className={styles.featured}>
        <div className="container">
          <div className={`${styles.featuredHeader} js-reveal`}>
            <span className="eyebrow">Our Featured</span>
            <h2 className={styles.featuredTitle}>
              Unique Qualities That Make<br />
              <span className={styles.red}>Smart X Logistics</span> Special
            </h2>
          </div>
          <div className={`${styles.featuredGrid} js-stagger-group`}>
            {FEATURED.map(({ icon: Icon, title, desc }) => (
              <div key={title} className={styles.featuredCard}>
                <div className={styles.featuredCardIcon}><Icon size={28} /></div>
                <h3 className={styles.featuredCardTitle}>{title}</h3>
                <p className={styles.featuredCardDesc}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className={styles.faq}>
        <div className={`container ${styles.faqInner}`}>
          <div className={`${styles.faqLeft} js-reveal`}>
            <span className="eyebrow">FAQ</span>
            <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            <p className={styles.faqSub}>
              Smart X Logistics ships all goods via every form of transportation. Our standing link with an endless network of freight &amp; distribution companies across North America allows the company to quickly select the best service methods specific to your needs.
            </p>
            <Link href="/contact-us" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>
              Ask Us Anything <ArrowRight size={17} />
            </Link>
          </div>

          <div className={`${styles.faqRight} js-reveal-right`}>
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className={`${styles.faqItem} ${openFaq === i ? styles.faqItemOpen : ''}`}>
                <button
                  className={styles.faqQuestion}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{q}</span>
                  <ChevronDown size={18} className={styles.faqChevron} />
                </button>
                <div className={styles.faqAnswer}>
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
