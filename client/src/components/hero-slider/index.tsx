'use client'

import { useState, useEffect, useCallback } from 'react';
import styles from './slider.module.scss';
import { Slide } from '@/features';
import watch from  '../../../public/hero/watch1.jpg';
import jewelry from  '../../../public/hero/watch1.jpg';
import accessories from  '../../../public/hero/watch1.jpg';

const slides = [
  {
    id: 1,
    title: "Exquisite Luxury Watches",
    subtitle: "Timeless Elegance Redefined",
    imageUrl: watch,
    ctaText: "Discover Collection",
    ctaLink: "/collections/watches"
  },
  {
    id: 2,
    title: "Handcrafted Jewelry",
    subtitle: "Exceptional Pieces for Exceptional People",
    imageUrl: jewelry,
    ctaText: "View Masterpieces",
    ctaLink: "/collections/jewelry"
  },
  {
    id: 3,
    title: "Limited Edition Accessories",
    subtitle: "Exclusivity at Its Finest",
    imageUrl: accessories,
    ctaText: "Explore Exclusives",
    ctaLink: "/collections/limited-editions"
  }
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className={styles.heroSlider}>
      <div 
        className={styles.slidesContainer}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <Slide key={slide.id} {...slide} imageUrl={slide.imageUrl.src} />
        ))}
      </div>

      <button 
        className={`${styles.navButton} ${styles.prevButton}`}
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        &larr;
      </button>

      <button 
        className={`${styles.navButton} ${styles.nextButton}`}
        onClick={nextSlide}
        aria-label="Next slide"
      >
        &rarr;
      </button>

      <div className={styles.pagination}>
        {slides.map((_, index) => (
          <button
            key={index}
            className={`${styles.paginationDot} ${index === currentSlide ? styles.active : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};