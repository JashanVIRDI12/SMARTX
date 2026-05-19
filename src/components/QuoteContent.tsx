'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle, Clock, Shield, Users } from 'lucide-react';
import styles from './QuoteContent.module.css';

gsap.registerPlugin(ScrollTrigger);

const TRUST_ITEMS = [
  { icon: Clock, label: 'Response within 24 hours' },
  { icon: CheckCircle, label: 'Transparent, no-hidden-fee pricing' },
  { icon: Shield, label: 'Fully insured shipments' },
  { icon: Users, label: 'Dedicated account manager' },
];

export default function QuoteContent() {
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
      gsap.fromTo('.js-form-col',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.js-form-col', start: 'top 82%', once: true } }
      );
      gsap.fromTo('.js-info-col',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.js-info-col', start: 'top 82%', once: true } }
      );
      gsap.fromTo('.js-field',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.07,
          scrollTrigger: { trigger: '.js-form', start: 'top 75%', once: true } }
      );
      gsap.fromTo('.js-trust-item',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1,
          scrollTrigger: { trigger: '.js-trust', start: 'top 80%', once: true } }
      );
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
            Free Estimate
          </span>
          <div className={styles.titleLine}><h1 className={`js-hero-line ${styles.heroTitle}`}>Request a</h1></div>
          <div className={styles.titleLine}><h1 className={`js-hero-line ${styles.heroTitle} ${styles.heroTitleRed}`}>Quote</h1></div>
          <div className={styles.titleLine}><p className={`js-hero-sub ${styles.heroSub}`}>We&apos;ll get back to you within 24 hours with a competitive estimate</p></div>
        </div>
      </section>

      {/* ─── Form Section ─── */}
      <section className={styles.formSection}>
        <div className={`container ${styles.formGrid}`}>

          {/* Info */}
          <div className={`${styles.infoCol} js-info-col`}>
            <span className="eyebrow">Move Your Business Forward</span>
            <h2 className={styles.infoTitle}>Let&apos;s Move What<br />Matters to You</h2>
            <p className={styles.infoBody}>
              Smart X Logistics ships all goods via every form of transportation. Our standing link with an endless network of freight and distribution companies across North America allows us to quickly select the best service methods specific to your needs.
            </p>

            <div className={`${styles.trust} js-trust`}>
              {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                <div key={label} className={`${styles.trustItem} js-trust-item`}>
                  <Icon size={18} className={styles.trustIcon} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className={styles.contactQuick}>
              <p className={styles.contactQuickLabel}>Prefer to talk?</p>
              <a href="tel:4036811515" className={styles.contactQuickPhone}>(403) 681-1515</a>
            </div>
          </div>

          {/* Form */}
          <div className={`${styles.formCol} js-form-col`}>
            <div className={styles.formHeader}>
              <h3 className={styles.formTitle}>Shipment Details</h3>
              <p className={styles.formSubtitle}>Fill out the form and our team will respond within 24 hours.</p>
            </div>

            <form className={`${styles.form} js-form`}>
              <div className={styles.formRow}>
                <div className={`${styles.formGroup} js-field`}>
                  <label htmlFor="q-first" className="field-label">First Name</label>
                  <input type="text" id="q-first" className="field-input" placeholder="John" required />
                </div>
                <div className={`${styles.formGroup} js-field`}>
                  <label htmlFor="q-last" className="field-label">Last Name</label>
                  <input type="text" id="q-last" className="field-input" placeholder="Doe" required />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={`${styles.formGroup} js-field`}>
                  <label htmlFor="q-email" className="field-label">Email Address</label>
                  <input type="email" id="q-email" className="field-input" placeholder="john@company.com" required />
                </div>
                <div className={`${styles.formGroup} js-field`}>
                  <label htmlFor="q-phone" className="field-label">Phone Number</label>
                  <input type="tel" id="q-phone" className="field-input" placeholder="(123) 456-7890" required />
                </div>
              </div>
              <div className={`${styles.formGroup} js-field`}>
                <label htmlFor="q-company" className="field-label">Company Name</label>
                <input type="text" id="q-company" className="field-input" placeholder="Your Company" />
              </div>
              <div className={`${styles.formGroup} js-field`}>
                <label htmlFor="q-service" className="field-label">Service Required</label>
                <select id="q-service" className="field-input" required defaultValue="">
                  <option value="" disabled>Select a Service</option>
                  <option value="dryvans">Dryvans &amp; Reefers</option>
                  <option value="regional">Regional and Long Haul</option>
                  <option value="warehousing">Warehousing Service</option>
                </select>
              </div>
              <div className={`${styles.formGroup} js-field`}>
                <label htmlFor="q-origin" className="field-label">Origin Location</label>
                <input type="text" id="q-origin" className="field-input" placeholder="City, Province / State" />
              </div>
              <div className={`${styles.formGroup} js-field`}>
                <label htmlFor="q-dest" className="field-label">Destination</label>
                <input type="text" id="q-dest" className="field-input" placeholder="City, Province / State" />
              </div>
              <div className={`${styles.formGroup} js-field`}>
                <label htmlFor="q-details" className="field-label">Cargo Details</label>
                <textarea id="q-details" className={`field-input ${styles.textarea}`} rows={4} placeholder="Describe your cargo, weight, dimensions, special requirements..."></textarea>
              </div>
              <div className={`js-field`}>
                <button type="button" className={`btn-primary ${styles.submitBtn}`}>
                  <Send size={17} /> Submit Request
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>
    </>
  );
}
