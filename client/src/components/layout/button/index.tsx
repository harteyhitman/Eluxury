import React from "react";
import styles from "@/styles/button.module.scss";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  fullWidth?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  fullWidth = false,
  loading = false,
  className,
  ...props
}) => {
  const btnClass = classNames(
    styles.button,
    styles[variant],
    {
      [styles.fullWidth]: fullWidth,
      [styles.loading]: loading,
    },
    className
  );

  return (
    <button className={btnClass} disabled={loading || props.disabled} {...props}>
      {loading ? <span className={styles.loader} /> : children}
    </button>
  );
};

export default Button;