// @/components/select-input/index.tsx
import React, { useState } from "react";
import styles from "./select.module.scss"; // Create corresponding SCSS file

interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  hidden?: boolean;
}

interface SelectInputProps {
  type?: "select";
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
  name?: string;
}

const SelectInput = React.forwardRef<HTMLSelectElement, SelectInputProps>(
  (
    {
      label,
      value,
      onChange,
      options,
      required = false,
      error = false,
      disabled = false,
      name = "",
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const isFloating = isFocused || (!!value && value !== "");
    return (
      <div className={styles.floatingSelectWrapper}>
        <select
          ref={ref}
          className={styles.floatingSelect}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          name={name}
          required={required}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              hidden={option.hidden}
            >
              {option.label}
            </option>
          ))}
        </select>
        <label
          className={
            isFloating
              ? styles.floatingLabel + " " + styles.filled
              : styles.floatingLabel
          }
        >
          {label}
          {required && <span style={{ color: "red", marginLeft: 2 }}>*</span>}
        </label>
        {error && (
          <span className={styles.errorMessage}>This field is required</span>
        )}
      </div>
    );
  },
);

SelectInput.displayName = "SelectInput";

export default SelectInput;
