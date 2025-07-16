"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./navbar.module.scss";
import { useCart } from "@/contexts/CartContext";
import Button from "../button";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount, toggleCart } = useCart();
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.inner}>
          {/* Logo */}
          <div className={styles.logo}>
            <Link href="/" className={styles.brand}>
              EXQUISITE
            </Link>
          </div>
          {/* Desktop Navigation */}
          <div className={styles.navButton}>
            <div className={styles.desktopMenu}>
              <Link href="/shop" className={styles.link}>
                Shop Now
              </Link>
              <Link href="/featured" className={styles.link}>
                Featured Products
              </Link>
              <Link href="/about" className={styles.link}>
                About Us
              </Link>
              <Link href="/showroom" className={styles.link}>
                Virtual Showroom
              </Link>
              <button className={styles.cartButton} onClick={toggleCart}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.cartIcon}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                {itemCount > 0 && (
                  <span className={styles.cartBadge}>{itemCount}</span>
                )}
              </button>
            </div>
            <Button variant="primary">
              <Link href="/auths/login" className={styles.login}>
                Login Here
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className={styles.mobileToggle}>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={styles.toggleBtn}
            >
              {!isMenuOpen ? (
                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={styles.mobileMenu}
          >
            <Link href="/shop" className={styles.mobileLink}>
              Shop Now
            </Link>
            <Link href="/featured" className={styles.mobileLink}>
              Featured Products
            </Link>
            <Link href="/about" className={styles.mobileLink}>
              About Us
            </Link>
            <Link href="/showroom" className={styles.mobileLink}>
              Virtual Showroom
            </Link>
            <div className={styles.mobileCart}>
              <svg
                className={styles.cartIconSmall}
                viewBox="0 0 24 24"
                stroke="currentColor"
                fill="none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span>Cart ({itemCount})</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
