import Link from 'next/link';
import styles from './card.module.scss';
import { Product } from '../featureData/data';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard = ({ product, onQuickView }: ProductCardProps) => {

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

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onQuickView(product);
  };

    const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(product);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div className={styles.productCard}>
      <Link href={`/products/${product.id}`}>
        <div className={styles.productLink}>
          <div className={styles.imageContainer}>
            <img 
              src={typeof product.imageUrl === 'string' ? product.imageUrl : product.imageUrl.src} 
              alt={product.name} 
              className={styles.productImage}
            />
            <div className={styles.badges}>
              {product.isNew && (
                <span className={`${styles.badge} ${styles.newBadge}`}>NEW</span>
              )}
              {product.isLimitedEdition && (
                <span className={`${styles.badge} ${styles.limitedBadge}`}>LIMITED</span>
              )}
              {product.discountPercentage && (
                <span className={`${styles.badge} ${styles.discountBadge}`}>
                  -{product.discountPercentage}%
                </span>
              )}
            </div>

            {/* Quick View Button */}
            <button 
              className={styles.quickViewButton}
              onClick={handleQuickViewClick}
              aria-label={`Quick view ${product.name}`}
            >
              Quick View
            </button>
          </div>

          <div className={styles.productInfo}>
            <h3 className={styles.productName}>{product.name}</h3>
            <p className={styles.productCategory}>{product.category}</p>
            <div className={styles.priceContainer}>
              {discountedPrice ? (
                <>
                  <span className={styles.discountedPrice}>{discountedPrice}</span>
                  <span className={styles.originalPrice}>{formattedPrice}</span>
                </>
              ) : (
                <span className={styles.price}>{formattedPrice}</span>
              )}
            </div>
                      <button 
            className={`${styles.addToCartButton} ${isAdding ? styles.adding : ''}`}
            onClick={handleAddToCart}
            disabled={isAdding}
            aria-label={`Add ${product.name} to cart`}
          >
            {isAdding ? 'Added!' : 'Add to Cart'}
          </button>
          </div>
        </div>
      </Link>
    </div>
  );
};