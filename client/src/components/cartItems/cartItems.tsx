import styles from "./cartItems.module.scss";
import { useCart } from "@/contexts/CartContext";
import Image, { StaticImageData } from "next/image";

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    imageUrl: string | StaticImageData;
    quantity: number;
    discountPercentage?: number;
  };
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(item.price);

  const discountedPrice = item.discountPercentage
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
      }).format(item.price * (1 - item.discountPercentage / 100))
    : null;

  return (
    <li className={styles.cartItem}>
      <div className={styles.itemImage}>
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={100}
          height={100}
          objectFit="cover"
        />
      </div>

      <div className={styles.itemDetails}>
        <h3 className={styles.itemName}>{item.name}</h3>

        <div className={styles.priceContainer}>
          {discountedPrice ? (
            <>
              <span className={styles.discountedPrice}>{discountedPrice}</span>
              <span className={styles.originalPrice}>{formattedPrice}</span>
            </>
          ) : (
            <span className={styles.price}>{formattedPrice}</span>
          )}
        </div>

        <div className={styles.quantityControls}>
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className={styles.quantityButton}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className={styles.quantityButton}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={() => removeFromCart(item.id)}
        className={styles.removeButton}
        aria-label="Remove item"
      >
        &times;
      </button>
    </li>
  );
};
