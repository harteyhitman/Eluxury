import React from "react";
import styles from "./product-card.module.scss";
import { commaFormatted } from "@/helpers";
import Link from "next/link";
import Image from "next/image";
import Button from "@/components/buttons";
import { Product } from "@/app/actions/admin/product";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
  size?: "compact" | "regular";
  className?: string;
}

const ProductCard = ({
  product,
  viewMode = "grid",
  size = "regular",
  className = "",
}: ProductCardProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
    });
    toast.success(`${product.name} added to cart!`);
  };

  if (viewMode === "list") {
    return (
      <div className={styles.listCard}>
        <div className={styles.listLeft}>
          <Image
            src={product.images?.[0] || ""}
            alt={product.name}
            className={styles.listImage}
            width={64}
            height={64}
          />
          <div className={styles.listInfo}>
            <div className={styles.category} style={{ marginBottom: 4 }}>
              {typeof product.category === "string"
                ? product.category
                : product.category?.name || ""}
            </div>
            <div className={styles.listName}>{product.name}</div>
            {product.description && (
              <div className={styles.listDesc}>{product.description}</div>
            )}
          </div>
        </div>
        <div className={styles.listRight}>
          <div className={styles.listPriceRow}>
            <span className={styles.listPrice}>
              ₦{commaFormatted(product.price)}
            </span>
            {product.salePrice && product.salePrice !== product.price && (
              <span className={styles.listOldPrice}>
                ₦{commaFormatted(product.salePrice)}
              </span>
            )}
          </div>
          <button
            className={styles.listBtn}
            onClick={() => handleAddToCart(product)}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    );
  }

  const cardClasses = `${styles.card} ${
    size === "compact" ? styles.cardCompact : ""
  } ${className}`;

  return (
    <div className={cardClasses} key={product.id} data-product-card>
      <Link href={`/products/${product.id}`}>
        <div className={styles.imageWrap}>
          {/* <button className={styles.wishlistBtn}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </button> */}
          <Image
            src={product.images?.[0] || ""}
            alt={product.name}
            className={styles.image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className={styles.cardInner}>
          <div className={styles.cardContent}>
            <div className={styles.category}>
              <p>{product.category?.name}</p>
            </div>
            <div className={styles.name}>{product.name}</div>
            <div className={styles.priceRow}>
              <span className={styles.price}>
                ₦{commaFormatted(product.price)}
              </span>
              {product.salePrice && product.salePrice !== product.price && (
                <span className={styles.oldPrice}>
                  ₦{commaFormatted(product.salePrice)}
                </span>
              )}
            </div>
            <div className={styles.addToCart}>
              <Button
                size="md"
                className={styles.shopNowBtn}
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
