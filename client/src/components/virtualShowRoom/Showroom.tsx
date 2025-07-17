import { useState } from 'react';
import styles from './Showroom.module.scss';
import { ShowroomViewer } from './ShowroomViewer/ShowroomViewer';
import { ProductCarousel } from './productCarousel/ProductCarousel';
import { EnvironmentSelector } from './EnvironmentSelector/EnvironmentSelector';
const environments = [
  {
    id: 'modern-penthouse',
    name: 'Modern Penthouse',
    image: 'https://res.cloudinary.com/ddguvwiyp/image/upload/v1752667415/Penthouse_tbs2wh.jpg',
    description: 'Contemporary luxury setting with panoramic city views'
  },
  {
    id: 'classic-library',
    name: 'Classic Library',
    image: 'https://res.cloudinary.com/ddguvwiyp/image/upload/v1752667405/library_w3m9ft.jpg',
    description: 'Timeless elegance in a wood-paneled heritage setting'
  },
  {
    id: 'luxury-yacht',
    name: 'Luxury Yacht',
    image: 'https://res.cloudinary.com/ddguvwiyp/image/upload/v1752667421/yacht_lefa7m.jpg',
    description: 'Nautical sophistication with ocean views'
  }
];

const products = [
  {
    id: 'platinum-watch',
    name: 'Platinum Chronograph',
    price: 125000,
    images: [
      'https://res.cloudinary.com/ddguvwiyp/image/upload/v1752667417/watch1_lvhls4.jpg',
      'https://res.cloudinary.com/ddguvwiyp/image/upload/v1752667420/watch2_npuejm.jpg',
      'https://res.cloudinary.com/ddguvwiyp/image/upload/v1752667421/watch3_xgq5hi.jpg'
    ],
    environmentPositions: {
      'modern-penthouse': { x: 15, y: 0, z: 0 },
      'classic-library': { x: 0, y: 0, z: 5 },
      'luxury-yacht': { x: -10, y: 0, z: 0 }
    }
  },
  // Additional products...
];

export const Showroom = () => {
  const [currentEnvironment, setCurrentEnvironment] = useState(environments[0]);
  const [currentProduct, setCurrentProduct] = useState(products[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  
  return (
    <section className={`${styles.showroom} ${isFullscreen ? styles.fullscreen : ''}`}>
      <div className={styles.controls}>
        <h2 className={styles.title}>Virtual Luxury Showroom</h2>
        <p className={styles.subtitle}>Experience our collection in exquisite settings</p>
        
        <EnvironmentSelector
          environments={environments}
          currentEnvironment={currentEnvironment}
          onChange={setCurrentEnvironment}
        />
      </div>

      <div className={styles.viewerContainer}>
        <ShowroomViewer
          environment={currentEnvironment}
          product={currentProduct}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => setIsFullscreen(!isFullscreen)}
        />

        {!isFullscreen && (
          <ProductCarousel
            products={products}
            currentProduct={currentProduct}
            onChange={setCurrentProduct}
          />
        )}
      </div>
    </section>
  );
};