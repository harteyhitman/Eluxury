import styles from './footer.module.scss';

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
              <span className="sr-only">Instagram</span>
              <svg viewBox="0 0 24 24" fill="currentColor" className={styles.iconSvg}>
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07..." />
              </svg>
            </a>
            {/* Add other social icons here */}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} EXQUISITE. All rights reserved.
      </div>
    </footer>
  );
};
