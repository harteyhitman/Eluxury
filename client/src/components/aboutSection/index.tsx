import styles from './about.module.scss';
import { BrandStory } from './brandStory';
import { Craftsmanship } from './craftsmanship';
import { Team } from './team';

export const AboutSection = () => {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Our Legacy of Excellence</h2>
        <p className={styles.sectionSubtitle}>
          For over three generations, we've curated the world's finest luxury goods
        </p>

        <BrandStory />
        <Craftsmanship />
        <Team />
      </div>
    </section>
  );
};