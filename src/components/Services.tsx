import { Truck, Globe, PackageOpen } from 'lucide-react';
import styles from './Services.module.css';

const services = [
  {
    title: 'Dryvans & Reefers',
    description: 'We supply all the equipment and skills necessary to tackle just about every type of job our clients have for us. Consistently reliable service in a timely manner.',
    icon: Truck,
  },
  {
    title: 'Regional and Long Haul',
    description: 'Get the results you deserve with this quality service, and at an affordable price too! Our qualified team brings their experience to every job.',
    icon: Globe,
  },
  {
    title: 'Warehousing Service',
    description: 'Get this service done quickly and efficiently by our experts. We invest the time and energy to be well prepared for any unique requests.',
    icon: PackageOpen,
  }
];

export default function Services() {
  return (
    <section className={`section-padding ${styles.services}`}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>What We Do</h2>
          <div className={styles.divider}></div>
        </div>
        
        <div className={styles.grid}>
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className={`glass-panel ${styles.card}`}>
                <div className={styles.iconWrapper}>
                  <Icon size={32} className={styles.icon} />
                </div>
                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
                <a href="/our-services" className={styles.readMore}>
                  View Service
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
