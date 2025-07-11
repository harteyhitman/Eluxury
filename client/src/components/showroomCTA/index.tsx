'use client'
import styles from './showroomCTA.module.scss';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const ShowroomCTA = () => {
  return (
    <section className={styles.showroomCTA}>
      <div className={styles.backgroundImage}>
        <Image
          src="https://res.cloudinary.com/ddguvwiyp/image/upload/v1752076914/showroom_mvvxdr.jpg"
          alt="Luxury showroom"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <div className={styles.overlay} />
      </div>
      
      <motion.div 
        className={styles.content}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.title}>Experience Our Virtual Showroom</h2>
        <p className={styles.subtitle}>
          Immerse yourself in our world of luxury with our interactive 360° showroom
        </p>
        <div className={styles.buttons}>
          <button className={styles.primaryButton}>
            Explore Now
          </button>
          <button className={styles.secondaryButton}>
            Book Private Tour
          </button>
        </div>
      </motion.div>
    </section>
  );
};