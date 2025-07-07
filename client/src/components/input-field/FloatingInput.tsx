import React from "react";
import styles from "./FloatingInput.module.scss";

interface FloatingInputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required,
  error,
}) => (
  <div className={styles.floatingInputWrapper}>
    {error && (
      <span className={styles.errorMessage} id={`${name}-error`}>
        {error}
      </span>
    )}
    <input
      className={`${styles.floatingInput} ${error ? styles.error : ''}`}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder=" " // single space to enable :placeholder-shown
      autoComplete="off"
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    <label className={styles.floatingLabel} htmlFor={name}>
      {label}
      {required && <i style={{ color: "red", marginLeft: "2px" }}>*</i>}
    </label>
  </div>
);

export default FloatingInput; 