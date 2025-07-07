import React from "react";
import styles from "./trending.module.scss";
import TrendMg1 from "/public/trending/pickf1.svg";
import TrendMg2 from "/public/trending/pickf2.svg";
import TrendMg3 from "/public/trending/pickf3.svg";
import Thumb from "/public/trending/thumbnail.svg";
import Image from "next/image";
import { CartIcon } from "@/components/icons/cartIcon";

const products = [
  {
    name: "Flawless Finish Concealer",
    image: TrendMg2,
    className: styles.card2,
  },
  {
    name: "Rosewater Tonic",
    image: TrendMg3,
    className: styles.card1,
  },

  {
    name: "GlowRush Highlight",
    image: TrendMg1,
    className: styles.card3,
    description: "Ultra-fine shimmer powder for a glass-skin glow.",
    price: "₦8,000",
    button: true,
    thumb: Thumb,
  },
];

const Trending = () => (
  <div className={`${styles.trending}`}>
    <div className={`${styles.trendingTexts} wrapper`}>
      <h1 className={styles.trendingTitle}>Trending Now</h1>
      <p className={styles.trendingDesc}>
        Beat the heat with scents that sizzle! As the sun shines brighter,
        upgrade your fragrance game with our season’s alluring perfumes. From
        fresh florals to seductive orientals
      </p>
    </div>
    <div className={styles.trendingSection}>
      {products.map((p, i) => (
        <div
          className={`${styles.card} ${p.className} ${
            i === 2 ? styles.expanded : ""
          }`}
          key={i}
          tabIndex={0}
        >
          <Image src={p.image} alt={p.name} className={styles.cardImg} />
          <div className={styles.overlay}>
            <div className={styles.content}>
              <h2 className={styles.title}>{p.name}</h2>
              {p.description && <p className={styles.desc}>{p.description}</p>}
              {p.price && (
                <div className={styles.priceRow}>
                  <span className={styles.price}>{p.price}</span>
                  {p.button && (
                    <button className={styles.cartBtn}>
                      ADD TO CART
                      <CartIcon />
                    </button>
                  )}
                </div>
              )}
            </div>
            {p.thumb && (
              <div className={styles.thumbWrapper}>
                <Image
                  src={p.thumb}
                  alt=""
                  className={styles.thumb}
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Trending;
