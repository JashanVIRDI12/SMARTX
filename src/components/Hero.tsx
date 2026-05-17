import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroBackground}>
        <img src="/hero_truck.png" alt="Logistics Truck" className={styles.bgImage} />
        <div className={styles.overlay}></div>
      </div>
      
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.textContent}>
          <span className={styles.subtitle}>SECURE & RELIABLE SHIPPING AROUND THE WORLD</span>
          <h1 className={styles.title}>
            100% FASTEST LOGISTIC<br />
            <span className="text-gradient">TRANSPORT SOLUTION</span>
          </h1>
          <p className={styles.description}>
            Smart X Logistics Inc. provides clients with reliable and flexible transport solutions, 
            delivering goods safely and on schedule across Canada and the US.
          </p>
          <div className={styles.actions}>
            <Link href="/our-services" className="btn-primary">
              VIEW SERVICES <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
