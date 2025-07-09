'use client';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './cartDrawer.module.scss';
import { CartItem } from '../cartItems/cartItems';
import { useCart } from '@/contexts/CartContext';

export const CartDrawer = () => {
  const { 
    cartItems, 
    cartTotal, 
    itemCount, 
    isCartOpen, 
    toggleCart 
  } = useCart();

  const formattedTotal = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0
  }).format(cartTotal);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.overlay}
            onClick={toggleCart}
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut' }}
            className={styles.drawer}
          >
            <div className={styles.header}>
              <h2 className={styles.title}>Your Luxury Selection</h2>
              <button 
                onClick={toggleCart}
                className={styles.closeButton}
                aria-label="Close cart"
              >
                &times;
              </button>
            </div>

            <div className={styles.content}>
              {cartItems.length === 0 ? (
                <div className={styles.emptyCart}>
                  <p>Your cart is currently empty</p>
                  <button 
                    onClick={toggleCart}
                    className={styles.continueShopping}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <>
                  <ul className={styles.itemsList}>
                    {cartItems.map(item => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </ul>

                  <div className={styles.summary}>
                    <div className={styles.summaryRow}>
                      <span>Subtotal</span>
                      <span>{formattedTotal}</span>
                    </div>
                    <div className={styles.summaryRow}>
                      <span>Shipping</span>
                      <span>Calculated at checkout</span>
                    </div>
                    <div className={styles.summaryRowTotal}>
                      <span>Total</span>
                      <span>{formattedTotal}</span>
                    </div>

                    <button className={styles.checkoutButton}>
                      Proceed to Checkout
                    </button>

                    <p className={styles.continueShopping}>
                      or <button onClick={toggleCart}>Continue Shopping</button>
                    </p>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};