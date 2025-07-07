"use client";

import React, { useRef, useEffect } from "react";
import styles from "./category-products.module.scss";
import ProductSkeleton from "../../ProductSkeleton/ProductSkeleton";
import { useProductStore } from "@/stores/productStore";
import ProductCard from "@/components/product-card";
import Link from "next/link";
import { generateSlug } from "@/helpers";

const CategoryProducts = () => {
  const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const { productsByCategory, isInitialLoading, categoryLoading } =
    useProductStore();

  // Check scroll state for a specific category
  const checkScrollState = (categoryName: string) => {
    const sliderRef = sliderRefs.current[categoryName];
    if (!sliderRef) return;

    // const { scrollLeft, scrollWidth, clientWidth } = sliderRef;
    // const canScrollLeft = scrollLeft > 0;
    // const canScrollRight = scrollLeft < scrollWidth - clientWidth - 1; // -1 for rounding errors
  };

  // Add scroll event listeners
  useEffect(() => {
    const currentSliderRefs = sliderRefs.current;

    // Add scroll listeners to all sliders
    Object.keys(currentSliderRefs).forEach((categoryName) => {
      const slider = currentSliderRefs[categoryName];
      if (slider) {
        const handleScroll = () => checkScrollState(categoryName);
        slider.addEventListener("scroll", handleScroll);
        // Initial check
        checkScrollState(categoryName);

        // Store the handler for cleanup
        slider.dataset.scrollHandler = "true";
      }
    });

    return () => {
      // Cleanup scroll listeners
      Object.keys(currentSliderRefs).forEach((categoryName) => {
        const slider = currentSliderRefs[categoryName];
        if (slider && slider.dataset.scrollHandler) {
          const handleScroll = () => checkScrollState(categoryName);
          slider.removeEventListener("scroll", handleScroll);
        }
      });
    };
  }, [productsByCategory]);

  return (
    <div className="wrapper">
      <section className={`${styles.productsSection}`}>
        {Object.entries(productsByCategory).map(
          ([categoryName, categoryProducts]) => {
            if (!categoryProducts || categoryProducts.length === 0) return null;
            const isCategoryLoading = categoryLoading[categoryName];
            // const scrollState = scrollStates[categoryName] || {
            //   canScrollLeft: false,
            //   canScrollRight: false,
            // };
            return (
              <div key={categoryName}>
                <div className={styles.sliderHeader}>
                  <h2 className={styles.heading}>{categoryName}</h2>
                  <Link
                    href={`/products/category/${generateSlug(categoryName)}`}
                    className={styles.seeMoreLink}
                  >
                    See more
                  </Link>
                </div>
                <div className={styles.sliderWrap}>
                  <div
                    className={styles.slider}
                    ref={(el) => {
                      sliderRefs.current[categoryName] = el;
                      // Check scroll state when ref is set
                      if (el) {
                        setTimeout(() => checkScrollState(categoryName), 100);
                      }
                    }}
                  >
                    {categoryProducts.map((product) => (
                      <ProductCard
                        size="compact"
                        product={product}
                        key={product.id}
                      />
                    ))}
                  </div>
                  {isCategoryLoading && (
                    <div style={{ marginTop: "1rem" }}>
                      <ProductSkeleton count={2} />
                    </div>
                  )}
                </div>
              </div>
            );
          },
        )}
        {isInitialLoading && <ProductSkeleton count={4} />}
      </section>
    </div>
  );
};

export default CategoryProducts;
