import { useEffect, useState } from 'react';
import styles from './modal.module.scss';
import { Product } from '../featureData/data';
import { useCart } from '@/contexts/CartContext';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export const QuickViewModal = ({ product, onClose }: QuickViewModalProps) => {
     const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(product.price);

  const discountedPrice = product.discountPercentage
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
      }).format(product.price * (1 - product.discountPercentage / 100))
    : null;

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button 
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className={styles.modalGrid}>
          <div className={styles.imageContainer}>
            <img 
              src={typeof product.imageUrl === 'string' ? product.imageUrl : product.imageUrl.src} 
              alt={product.name} 
              className={styles.productImage}
            />
          </div>

          <div className={styles.productDetails}>
            <h2 className={styles.productName}>{product.name}</h2>
            <p className={styles.productCategory}>{product.category}</p>

            <div className={styles.priceContainer}>
              {discountedPrice ? (
                <>
                  <span className={styles.discountedPrice}>{discountedPrice}</span>
                  <span className={styles.originalPrice}>{formattedPrice}</span>
                  <span className={styles.discountPercentage}>
                    Save {product.discountPercentage}%
                  </span>
                </>
              ) : (
                <span className={styles.price}>{formattedPrice}</span>
              )}
            </div>

            {product.isLimitedEdition && (
              <div className={styles.limitedBadge}>Limited Edition</div>
            )}

            <p className={styles.productDescription}>
              This exquisite piece showcases unparalleled craftsmanship with the finest materials. 
              Each detail has been meticulously designed to create a truly luxurious experience.
            </p>

            <div className={styles.actionButtons}>
    <button 
          className={`${styles.addToCartButton} ${isAdding ? styles.adding : ''}`}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? 'Added to Cart' : 'Add to Cart'}
        </button>              <button className={styles.viewDetailsButton}>View Full Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};