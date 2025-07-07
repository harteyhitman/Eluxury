import React from "react";
import styles from "./ProductSkeleton.module.scss";

interface ProductSkeletonProps {
  count?: number;
}

const ProductSkeleton: React.FC<ProductSkeletonProps> = ({ count = 4 }) => {
  return (
    <div className={styles.skeletonSection}>
      <div className={styles.skeletonHeader}>
        <div className={styles.headerText}>
          <div className={styles.headingSkeleton} />
          <div className={styles.subheadingSkeleton} />
        </div>
        {/* <div className={styles.sliderControls}>
          <div className={styles.arrowSkeleton} />
          <div className={styles.arrowSkeleton} />
        </div> */}
      </div>

      <div className={styles.skeletonSlider}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className={styles.skeletonCard}>
            <div className={styles.imageSkeleton} />
            <div className={styles.contentSkeleton}>
              <div className={styles.categorySkeleton} />
              <div className={styles.nameSkeleton} />
              <div className={styles.priceRowSkeleton}>
                <div className={styles.priceSkeleton} />
                <div className={styles.oldPriceSkeleton} />
              </div>
            </div>
            <div className={styles.buttonSkeleton} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSkeleton;
