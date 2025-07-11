import Link from 'next/link';
import styles from './slider.module.scss';

interface SlideProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

export const Slide = ({ title, subtitle, imageUrl, ctaText, ctaLink }: SlideProps) => {
  return (
    <div 
      className={styles.slide}
      style={{ backgroundImage: `url(${imageUrl})`,  zIndex: 10000 }}
    >
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <Link href={ctaLink}>
          <div className={styles.ctaButton}>{ctaText}</div>
        </Link>
      </div>
    </div>
  );
};