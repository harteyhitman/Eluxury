import { useEffect, useRef } from 'react';
import styles from './ShowroomViewer.module.scss';
import Image from 'next/image';
import { ARButton } from './ARButton';

export const ShowroomViewer = ({
  environment,
  product,
  isFullscreen,
  onToggleFullscreen
}: {
  environment: any;
  product: any;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This would be where you'd integrate with a 3D library like Three.js
    // For now, we'll just position the product image
    if (productRef.current) {
      const pos = product.environmentPositions[environment.id];
      productRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, ${pos.z}px)`;
    }
  }, [environment, product]);

  return (
    <div 
      className={`${styles.viewer} ${isFullscreen ? styles.fullscreen : ''}`}
      ref={viewerRef}
    >
      <div className={styles.environment}>
        <Image
          src={environment.image}
          alt={environment.name}
          fill
          className={styles.environmentImage}
          quality={100}
          priority
        />
      </div>

      <div className={styles.product} ref={productRef}>
        <Image
          src={product.images[0]}
          alt={product.name}
          width={400}
          height={400}
          className={styles.productImage}
          quality={100}
        />
      </div>

 <div className={styles.controls}>
  <button 
    className={styles.fullscreenButton}
    onClick={onToggleFullscreen}
    aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
  >
        {isFullscreen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        )}
      </button>

      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productPrice}>
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0
          }).format(product.price)}
        </p>
      </div>
        <ARButton 
    modelUrl={`/models/${product.id}.glb`} 
    className={styles.arButton}
  />
  </div>
    </div>
  );
};