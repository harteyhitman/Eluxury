import styles from "./subfooter.module.scss";
import Favina from "/public/sub-footer-logo.svg";
import Image from "next/image";

const SubFooter = () => {
  return (
    <section className={`${styles.subFooterSection}`}>
      <div className="wrapper">
        <div className={styles.left}>
          <h2 className={styles.heading}>
            Uncover Your
            <br />
            Radiance.
          </h2>
          <p className={styles.subtext}>
            Our curated collection of high-end beauty
            <br />
            products is designed to help you unleash your
            <br />
            inner glow.
          </p>
        </div>
        <div className={styles.right}>
          {/* SVG logo stack */}
          <div className={styles.logoStack}>
            <Image
              src={Favina}
              alt="Favina stacked logo"
              fill
              className={styles.logoImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubFooter;
