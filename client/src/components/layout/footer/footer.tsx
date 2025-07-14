import styles from './footer.module.scss';
import { GrInstagram } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.column}>
          <h3 className={styles.brand}>EXQUISITE</h3>
          <p className={styles.description}>
            Curating the world's finest luxury items for discerning clients.
          </p>
        </div>

        <div className={styles.column}>
          <h4 className={styles.heading}>SHOP</h4>
          <ul className={styles.list}>
            <li><a href="#" className={styles.link}>All Products</a></li>
            <li><a href="#" className={styles.link}>New Arrivals</a></li>
            <li><a href="#" className={styles.link}>Limited Editions</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.heading}>COMPANY</h4>
          <ul className={styles.list}>
            <li><a href="#" className={styles.link}>About Us</a></li>
            <li><a href="#" className={styles.link}>Contact</a></li>
            <li><a href="#" className={styles.link}>Privacy Policy</a></li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4 className={styles.heading}>CONNECT</h4>
          <div className={styles.social}>
            <a href="#" className={styles.icon}>
             <GrInstagram />
            </a>
            <a href="#" className={styles.icon}>
             <FaFacebook />
            </a>
            <a href="#" className={styles.icon}>
             <FaTwitter />
            </a>
            <a href="#" className={styles.icon}>
             <AiFillTikTok />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} EXQUISITE. All rights reserved.
      </div>
    </footer>
  );
};
