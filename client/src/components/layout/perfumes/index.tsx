"use client";

import React, { useRef } from "react";
import styles from "./perfumes.module.scss";
import ProductCard from "@/components/product-card";
import { useProductStore } from "@/stores/productStore";
import Link from "next/link";

export default function NewProducts() {
  const { products } = useProductStore();
  const perfumes = products.filter(
    (product) => product.category?.name === "Perfumes",
  );
  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <section className={styles.productsSection}>
      <div className={styles.sliderHeader}>
        <div className={styles.headerText}>
          <h2 className={styles.heading}>Perfumes</h2>
          <p>
            Beat the heat with scents that sizzle! As the sun shines brighter,
            upgrade your fragrance game with our seasons alluring perfumes. From
            fresh florals to seductive orientals
          </p>
        </div>

        <div className={styles.slider_conts}>
          <Link href={`/products`} className={styles.seeMoreLink}>
            See more
          </Link>
        </div>
      </div>
      <div className={styles.sliderWrap}>
        <div className={styles.slider} ref={sliderRef}>
          {perfumes.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })}
        </div>
      </div>
    </section>
  );
}
