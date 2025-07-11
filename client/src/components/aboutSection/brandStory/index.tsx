import styles from './brandStory.module.scss';
import Image from 'next/image';

export const BrandStory = () => {
  return (
    <div className={styles.brandStory}>
      <div className={styles.content}>
        <h3 className={styles.title}>Our Heritage</h3>
        <p className={styles.text}>
          Founded in 1952 in Paris, our maison began as a small atelier crafting bespoke leather goods for discerning 
          clients. What began as a passion for exquisite craftsmanship has grown into a globally recognized symbol of 
          luxury and refinement.
        </p>
        <p className={styles.text}>
          Each generation has brought new vision while maintaining our unwavering commitment to quality. Today, we 
          continue this tradition, sourcing only the finest materials and working with master artisans around the world.
        </p>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src="https://res.cloudinary.com/ddguvwiyp/image/upload/v1752072152/male-CEO_lkajqt.jpg"
          alt="Our founder in the original workshop"
          width={600}
          height={400}
          className={styles.image}
        />
        <div className={styles.caption}>Our founder in the original Paris atelier, 1955</div>
      </div>
    </div>
  );
};