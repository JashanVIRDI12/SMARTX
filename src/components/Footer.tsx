import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';
import styles from './Footer.module.css';

const quickLinks = [
  { href: '/about-us', label: 'About Us' },
  { href: '/our-services', label: 'Our Services' },
  { href: '/safety-and-security', label: 'Safety & Security' },
  { href: '/request-a-quote', label: 'Request a Quote' },
  { href: '/contact-us', label: 'Contact Us' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topBar}>
        <div className="container">
          <span className={styles.topBarText}>
            North America&apos;s Trusted Freight Partner — Calgary Based, Continent Reaching
          </span>
          <Link href="/request-a-quote" className="btn-primary">
            Get a Free Quote <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className={styles.body}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.brand}>
            <Link href="/">
              <img src="/logosmartx.png" alt="Smart X Logistics" className={styles.logo} />
            </Link>
            <p className={styles.tagline}>
              Comprehensive transportation solutions from origin to door. We handle all pre-shipping, in-transit, and post-delivery needs.
            </p>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.links}>
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact Info</h4>
            <ul className={styles.contactList}>
              <li>
                <MapPin size={16} className={styles.icon} />
                <span>Suite #2, 9910 48th SE<br />Calgary, AB</span>
              </li>
              <li>
                <Phone size={16} className={styles.icon} />
                <a href="tel:4036811515">(403) 681-1515</a>
              </li>
              <li>
                <Mail size={16} className={styles.icon} />
                <a href="mailto:info@smartxlogistics.com">info@smartxlogistics.com</a>
              </li>
              <li>
                <Clock size={16} className={styles.icon} />
                <span>Mon – Sat: 8am – 5pm<br />Sunday: Closed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Smart X Logistics Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
