"use client";

import React, { useRef } from "react";
import styles from "./skincare.module.scss";
import { Product } from "@/app/actions/admin/product";
import ProductCard from "@/components/product-card";
import Link from "next/link";

interface NewProductsProps {
  skincare: Product[];
  title?: string;
  subtitle?: string;
}

export default function NewProducts({
  skincare,
  title = "Skincare",
  subtitle,
}: NewProductsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.productsSection}>
      <div className={styles.sliderHeader}>
        <div className={styles.headerText}>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>

        <div className={styles.slider_conts}>
          <Link href={`/products`} className={styles.seeMoreLink}>
            See more
          </Link>
        </div>
      </div>
      <div className={styles.sliderWrap}>
        <div
          className={styles.slider}
          ref={sliderRef}
          onScroll={() => {
            if (sliderRef.current) {
              // Scroll handler - currently no action needed
            }
          }}
        >
          {skincare.map((product) => (
            <ProductCard key={product.id} product={product} size="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
