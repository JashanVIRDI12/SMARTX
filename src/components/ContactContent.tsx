'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import styles from './ContactContent.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ContactContent() {
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

      gsap.utils.toArray<HTMLElement>('.js-stagger-group').forEach((group) => {
        gsap.fromTo(Array.from(group.children) as HTMLElement[],
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.12,
            scrollTrigger: { trigger: group, start: 'top 82%', once: true } }
        );
      });

      /* Form fields stagger */
      gsap.fromTo('.js-field',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: '.js-form', start: 'top 80%', once: true } }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src="/warehouse.png" alt="" className={styles.heroBgImg} />
          <div className={styles.heroBgOverlay} />
        </div>
        <div className={`container ${styles.heroInner}`}>
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', display: 'inline-flex' }}>
            Get In Touch
          </span>
          <div className={styles.titleLine}><h1 className={`js-hero-line ${styles.heroTitle}`}>Let&apos;s Talk</h1></div>
          <div className={styles.titleLine}><p className={`js-hero-sub ${styles.heroSub}`}>Our team is ready to assist with any question or shipment need</p></div>
        </div>
      </section>

      {/* ─── Contact Section ─── */}
      <section className={styles.contactSection}>
        <div className={`container ${styles.contactGrid}`}>

          {/* Info Column */}
          <div className={`${styles.infoCol} js-reveal`}>
            <span className="eyebrow">Contact Details</span>
            <h2 className={styles.infoTitle}>We&apos;re Here<br />For You</h2>
            <p className={styles.infoDesc}>
              Have questions about our services or need support with an ongoing shipment? Our team is ready to assist. Reach out via phone, email, or the contact form.
            </p>

            <div className={`${styles.contactItems} js-stagger-group`}>
              <div className={styles.contactItem}>
                <div className={styles.contactItemIcon}><Phone size={20} /></div>
                <div>
                  <div className={styles.contactItemLabel}>Call Us</div>
                  <a href="tel:4036811515" className={styles.contactItemValue}>(403) 681-1515</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactItemIcon}><Mail size={20} /></div>
                <div>
                  <div className={styles.contactItemLabel}>Email Us</div>
                  <a href="mailto:info@smartxlogistics.com" className={styles.contactItemValue}>info@smartxlogistics.com</a>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactItemIcon}><MapPin size={20} /></div>
                <div>
                  <div className={styles.contactItemLabel}>Head Office</div>
                  <span className={styles.contactItemValue}>Suite #2, 9910 48th SE<br />Calgary, AB</span>
                </div>
              </div>
              <div className={styles.contactItem}>
                <div className={styles.contactItemIcon}><Clock size={20} /></div>
                <div>
                  <div className={styles.contactItemLabel}>Business Hours</div>
                  <span className={styles.contactItemValue}>Mon – Sat: 8am – 5pm<br />Sunday: Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className={`${styles.formCol} js-reveal js-form`}>
            <h3 className={styles.formTitle}>Send Us a Message</h3>
            <form className={styles.form}>
              <div className={`${styles.formGroup} js-field`}>
                <label htmlFor="c-name" className="field-label">Full Name</label>
                <input type="text" id="c-name" className="field-input" placeholder="Your Name" required />
              </div>
              <div className={`${styles.formGroup} js-field`}>
                <label htmlFor="c-email" className="field-label">Email Address</label>
                <input type="email" id="c-email" className="field-input" placeholder="your@email.com" required />
              </div>
              <div className={`${styles.formGroup} js-field`}>
                <label htmlFor="c-phone" className="field-label">Phone Number</label>
                <input type="tel" id="c-phone" className="field-input" placeholder="(403) 000-0000" />
              </div>
              <div className={`${styles.formGroup} js-field`}>
                <label htmlFor="c-subject" className="field-label">Subject</label>
                <input type="text" id="c-subject" className="field-input" placeholder="How can we help?" required />
              </div>
              <div className={`${styles.formGroup} js-field`}>
                <label htmlFor="c-message" className="field-label">Message</label>
                <textarea id="c-message" className={`field-input ${styles.textarea}`} rows={5} placeholder="Write your message here..."></textarea>
              </div>
              <div className={`js-field`}>
                <button type="button" className={`btn-primary ${styles.submitBtn}`}>
                  <Send size={17} /> Send Message
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* ─── Map placeholder ─── */}
      <div className={styles.mapStrip}>
        <MapPin size={32} color="var(--red)" />
        <span>Calgary, Alberta — Suite #2, 9910 48th SE</span>
      </div>
    </>
  );
}
