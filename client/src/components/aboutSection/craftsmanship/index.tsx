import styles from './craftsmanship.module.scss';
import Image from 'next/image';

export const Craftsmanship = () => {
  return (
    <div className={styles.craftsmanship}>
      <div className={styles.imageContainer}>
        <Image
          src="https://res.cloudinary.com/ddguvwiyp/image/upload/v1752069458/craftmanship_dozaj6.jpg"
          alt="Master artisan at work"
          width={600}
          height={400}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>The Art of Craftsmanship</h3>
        <p className={styles.text}>
          Every piece in our collection is a testament to the skill of our master artisans. We maintain relationships 
          with workshops that have been perfecting their crafts for generations, from Swiss watchmakers to Italian 
          leatherworkers.
        </p>
        <ul className={styles.craftList}>
          <li>Hand-selected materials of exceptional quality</li>
          <li>Traditional techniques combined with modern precision</li>
          <li>Rigorous quality control at every stage</li>
          <li>Sustainable and ethical sourcing practices</li>
        </ul>
      </div>
    </div>
  );
};