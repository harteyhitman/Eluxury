import { useState } from 'react';
import styles from './ProductCarousel.module.scss';
import Image from 'next/image';

export const ProductCarousel = ({
  products,
  currentProduct,
  onChange
}: {
  products: any[];
  currentProduct: any;
  onChange: (product: any) => void;
}) => {
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX;
    const diff = startX - x;
    if (Math.abs(diff) > 50) {
      const direction = diff > 0 ? 'next' : 'prev';
      navigate(direction);
      setIsDragging(false);
    }
  };

  const navigate = (direction: 'prev' | 'next') => {
    const currentIndex = products.findIndex(p => p.id === currentProduct.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % products.length;
    } else {
      newIndex = (currentIndex - 1 + products.length) % products.length;
    }
    onChange(products[newIndex]);
  };

  return (
    <div className={styles.carousel}>
      <button 
        className={styles.navButton}
        onClick={() => navigate('prev')}
        aria-label="Previous product"
      >
        &larr;
      </button>

      <div 
        className={styles.carouselItems}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
      >
        {products.map((product) => (
          <button
            key={product.id}
            className={`${styles.carouselItem} ${
              product.id === currentProduct.id ? styles.active : ''
            }`}
            onClick={() => onChange(product)}
            aria-label={`View ${product.name}`}
          >
            <div className={styles.carouselImageWrapper}>
              <Image
                src={product.images[0]}
                alt=""
                fill
                className={styles.carouselImage}
                 unoptimized
              />
            </div>
          </button>
        ))}
      </div>

      <button 
        className={styles.navButton}
        onClick={() => navigate('next')}
        aria-label="Next product"
      >
        &rarr;
      </button>
    </div>
  );
};