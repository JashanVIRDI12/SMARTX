'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  { href: '/our-services', label: 'Services' },
  { href: '/safety-and-security', label: 'Safety' },
  { href: '/contact-us', label: 'Contact' },
  { href: '/request-a-quote', label: 'Get a Quote' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  /* Initial entrance — only on the header bar, not the menu */
  useEffect(() => {
    gsap.fromTo(
      headerRef.current,
      { yPercent: -110, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 1.1, ease: 'power4.out', delay: 0.15 }
    );
  }, []);

  /* Scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll while menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  /* Close on route change */
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      {/*
        The header uses GSAP yPercent → sets CSS transform → creates a stacking context.
        Any position:fixed child would be trapped inside the 80px bar.
        Solution: mobile menu lives OUTSIDE <header> as a sibling.
      */}
      <header
        ref={headerRef}
        className={`${styles.header} ${scrolled || open ? styles.scrolled : ''}`}
      >
        <div className={`container ${styles.inner}`}>

          <Link href="/" className={styles.logo}>
            <img src="/logosmartx-white.png" alt="SmartX Logistics" className={styles.logoImg} />
          </Link>

          {/* Desktop-only nav */}
          <nav className={styles.desktopNav}>
            {NAV_LINKS.slice(0, 5).map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`${styles.link} ${pathname === href ? styles.linkActive : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <a href="tel:4036811515" className={styles.callBtn}>
            <Phone size={14} strokeWidth={2.5} />
            (403) 681-1515
          </a>

          <button
            className={styles.burger}
            onClick={() => setOpen(p => !p)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </header>

      {/* ─── Mobile menu — sibling of header, not a child ─── */}
      <div className={`${styles.mobileMenu} ${open ? styles.mobileMenuOpen : ''}`}>

        <nav className={styles.mobileNav}>
          {NAV_LINKS.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              className={`${styles.mobileLink} ${pathname === href ? styles.mobileLinkActive : ''}`}
            >
              <span className={styles.mobileNum}>0{i + 1}</span>
              <span className={styles.mobileLabel}>{label}</span>
              <span className={styles.mobileDash} />
            </Link>
          ))}
        </nav>

        <div className={styles.mobileCta}>
          <a href="tel:4036811515" className={styles.mobilePhone}>
            <Phone size={18} strokeWidth={2} />
            <div>
              <span className={styles.mobilePhoneLabel}>Call us directly</span>
              <span className={styles.mobilePhoneNum}>(403) 681-1515</span>
            </div>
          </a>
        </div>

      </div>
    </>
  );
}
