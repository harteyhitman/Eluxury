'use client'

import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './slider.module.scss';
import { Slide } from '@/features';

const slides = [
  {
    id: 1,
    title: "Exquisite Luxury Watches",
    subtitle: "Timeless Elegance Redefined",
    imageUrl: 'https://res.cloudinary.com/ddguvwiyp/image/upload/v1752059138/watch1_p8d8kq.jpg',
    ctaText: "Discover Collection",
    ctaLink: "/collections/watches"
  },
  {
    id: 2,
    title: "Handcrafted Jewelry",
    subtitle: "Exceptional Pieces for Exceptional People",
    imageUrl: 'https://res.cloudinary.com/ddguvwiyp/image/upload/v1752059138/jewelry1_ubb4gb.jpg',
    ctaText: "View Masterpieces",
    ctaLink: "/collections/jewelry"
  },
  {
    id: 3,
    title: "Limited Edition Accessories",
    subtitle: "Exclusivity at Its Finest",
    imageUrl: 'https://res.cloudinary.com/ddguvwiyp/image/upload/v1752059138/accessories_sqscys.jpg',
    ctaText: "Explore Exclusives",
    ctaLink: "/collections/limited-editions"
  },
  {
    id: 4,
    title: "Limited Edition Accessories",
    subtitle: "Exclusivity at Its Finest",
    imageUrl: 'https://res.cloudinary.com/ddguvwiyp/image/upload/v1752059143/watch2_rvvsew.jpg',
    ctaText: "Explore Exclusives",
    ctaLink: "/collections/limited-editions"
  },
  {
    id: 5,
    title: "Limited Edition Accessories",
    subtitle: "Exclusivity at Its Finest",
    imageUrl: 'https://res.cloudinary.com/ddguvwiyp/image/upload/v1752059152/jewelry2_paw8pp.jpg',
    ctaText: "Explore Exclusives",
    ctaLink: "/collections/limited-editions"
  }
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Create an extended slides array for seamless looping
  const extendedSlides = [...slides, slides[0]];

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      // If we're at the last slide (which is a duplicate of first), 
      // immediately reset to first slide without animation
      if (prev === slides.length - 1) {
        setTimeout(() => {
          setCurrentSlide(0);
          setIsTransitioning(false);
        }, 50); // Tiny delay to ensure state update
        return prev + 1;
      }
      return prev + 1;
    });
    
    // Reset transitioning state after animation completes
    setTimeout(() => setIsTransitioning(false), 700);
  }, [slides.length]);

  const prevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => {
      if (prev === 0) {
        // If at first slide, jump to the duplicate last slide without animation
        setTimeout(() => {
          setCurrentSlide(slides.length - 1);
          setIsTransitioning(false);
        }, 50);
        return -1;
      }
      return prev - 1;
    });
    setTimeout(() => setIsTransitioning(false), 700);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => {
      setIsTransitioning(false);
      setIsAutoPlaying(true);
    }, 700);
  };

  useEffect(() => {
    if (!isAutoPlaying || isTransitioning) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isTransitioning, nextSlide]);

  const getRealIndex = (index: number) => {
    return index >= slides.length ? 0 : index;
  };

  return (
    <div className={styles.slideWrapper}>
      <div className={styles.overlay} />
      <div className={styles.heroSlider} ref={sliderRef}>
        <div 
          className={styles.slidesContainer}
          style={{ 
            transform: `translateX(-${currentSlide * 100}%)`,
            transition: isTransitioning ? 'transform 0.7s ease-in-out' : 'none'
          }}
        >
          {extendedSlides.map((slide, index) => (
            <Slide
              key={`${slide.id}-${index}`}
              {...slide}
              imageUrl={slide.imageUrl}
            />
          ))}
        </div>
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={prevSlide}
          aria-label="Previous slide"
          disabled={isTransitioning}
        >
          &larr;
        </button>
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextSlide}
          aria-label="Next slide"
          disabled={isTransitioning}
        >
          &rarr;
        </button>
        <div className={styles.pagination}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.paginationDot} ${
                getRealIndex(currentSlide) === index ? styles.active : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>
    </div>
  );
};