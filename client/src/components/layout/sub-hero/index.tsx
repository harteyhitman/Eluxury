import React from "react";
import styles from "./subhero.module.scss";
import Link from "next/link";

const cards = [
  {
    img: "//www.essenza.ng/cdn/shop/files/BOIS_PACIFIQUE.png?v=1740665461&width=800",
    link: "/products/tom-ford-bois-pacifique",
  },
  {
    img: "//www.essenza.ng/cdn/shop/files/11_Fenty_EDS_Essenza_Product_Carousel_Explore_Mobile_800_W_x_520_H_px_271dd89f-5ad1-46b5-bb35-62fde3438985.jpg?v=1707994165&width=1667",
    link: "/products/fenty-beauty-eaze-drop",
  },
  {
    img: "//www.essenza.ng/cdn/shop/files/ELIXIR_01_08f4c258-beb5-4bbe-a308-a3705f07e332.png?v=1709819791&width=701",
    link: "/products/elie-saab-elixir",
  },
];

export const SubHero = () => (
  <section className={styles.subHero}>
    <div className={styles.cards}>
      {cards.map((card, idx) => (
        <Link
          href={card.link}
          className={styles.card}
          key={idx}
          style={{ backgroundImage: `url(${card.img})` }}
        ></Link>
      ))}
    </div>
  </section>
);
