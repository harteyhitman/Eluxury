'use client'

import React from "react";
import styles from "./footer.module.scss";
import { FaFacebookF, FaInstagram } from "react-icons/fa6";
import Typography from "@/components/typos";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={`${styles.footer}`}>
      <div className={`${styles.topRow} wrapper`}>
        <div className={styles.left}>
          <Typography variant="h2" className={styles.heading}>
            Glow up. Glam up. Smell divine
          </Typography>
          <Typography variant="body" className={styles.subtitle}>
            Beat the heat with scents that sizzle! As the sun shines brighter,
            upgrade your fragrance game with our season’s alluring perfumes. From
            fresh florals to seductive orientals
          </Typography>
          <Link href="/products" className={styles.exploreBtn}>
            <span className={styles.exploreText}>EXPLORE ALL PRODUCT</span>
            <span className={styles.arrow}>&rarr;</span>
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.col}>
            <Typography variant="label" className={styles.colTitle}>
              SERVICES
            </Typography>
            <ul className={styles.linkList}>
              <li>
                <Link href="/products?cat=perfume" className={styles.link}>
                  Perfume
                </Link>
              </li>
              <li>
                <Link href="/products?cat=skincare" className={styles.link}>
                  Skincare
                </Link>
              </li>
              <li>
                <Link href="/products?cat=makeup" className={styles.link}>
                  Makeup
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.col}>
            <Typography variant="label" className={styles.colTitle}>
              RESOURCES
            </Typography>
            <ul className={styles.linkList}>
              <li>
                <Link href="/faqs" className={styles.link}>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/blog" className={styles.link}>
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.link}>
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.col}>
            <Typography variant="label" className={styles.colTitle}>
              CONTACT US
            </Typography>
            <ul className={styles.linkList}>
              <li>
                <a href="mailto:info@favina.com" className={styles.link}>
                  Email
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Social media
                </a>
              </li>
            </ul>
            <div className={styles.socials}>
              <a
                href="#"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
              >
                <FaFacebookF />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
