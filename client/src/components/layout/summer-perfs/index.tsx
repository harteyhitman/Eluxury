import React from "react";
import styles from "./summerperfs.module.scss";
import Model from "../../../../public/assets/img/favina-group.png";
import Model2 from "../../../../public/assets/img/favina-group-2.png";

import Image from "next/image";
// import { summerperfsdata } from "@/data";

const SummerPerfs = () => {
  return (
    <section className={`${styles.summerPerfsSection}`}>
      <div className="wrapper">
        <div className={styles.infoBlock}>
          <h2 className={styles.heading}>
            Top 4 Perfumes to
            <br />
            Wear This Summer
          </h2>
          <p className={styles.subtext}>
            Beat the heat with scents that sizzle! As the sun shines brighter,
            upgrade your fragrance game with our season’s alluring perfumes.
            From fresh florals to seductive orientals
          </p>
        </div>
        <div className={styles.visualBlock}>
          <Image className={styles.model1} src={Model} alt="model" />
          <Image className={styles.model2} src={Model2} alt="model" />
        </div>
      </div>
    </section>
  );
};

export default SummerPerfs;
