"use client";

import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import styles from "./input.module.scss";
import { Password, PasswordHide, RoundCancelIcon } from "../form-icons";

interface InputFieldProps {
  label?: string;
  value?: string;
  helperText?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  name?: string;
  trim?: boolean;
  maxLength?: number;
  styles?: React.CSSProperties;
  required?: boolean;
  size?: string;
  preffix?: string;
  error?: boolean;
  placeholder?: string;
  disabled?: boolean;
  active?: boolean;
  id?: string;
  placeInputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement>;
  noCancel?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value = "",
  helperText,
  type,
  onChange,
  name,
  trim,
  maxLength,
  styles: customStyles,
  required,
  preffix,
  error,
  placeholder,
  disabled,
  active,
  id,
  placeInputRef,
  noCancel = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const inputWrapRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState(value);
  const [showPassword, setShowPassword] = useState(false);

  const isActive = (inputValue && inputValue.length > 0) || isOpen || active;

  const handleClose = () => {
    setIsOpen(false);
    setInputValue("");
    if (inputRef.current) {
      const event = {
        target: {
          value: "",
          name: name || "",
        },
      } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
      onChange(event);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;

    if (trim) {
      value = value.replace(/[^a-zA-Z0-9]/g, "");
    }

    if (name === "firstName" || name === "lastName") {
      value = value.replace(/[^a-zA-Z\s-]/g, "");
    }

    setInputValue(value);
    onChange(e);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData("text");
    if (pastedText) {
      setInputValue(pastedText);
      const event = {
        target: {
          value: pastedText,
          name: name || "",
        },
      } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
      onChange(event);
    }
    e.preventDefault();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (disabled) return;
      if (
        inputWrapRef.current &&
        !inputWrapRef.current.contains(event.target as Node) &&
        inputValue?.length === 0
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [disabled, inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <>
      <div
        ref={inputWrapRef}
        className={`${styles.input_wrap} ${error && styles.error} ${
          !isOpen && styles.noActive
        }`}
        onClick={() => setIsOpen(true)}
      >
        <p
          className={`${styles.label} ${isOpen && styles.active} ${
            isActive && styles.active
          }`}
          onClick={() => inputRef.current?.focus()}
        >
          {label}
          {required && <i style={{ color: "red", marginLeft: "2px" }}>*</i>}
        </p>
        {type === "password" && (
          <div
            className={styles.cancel}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? <Password /> : <PasswordHide />}
          </div>
        )}
        {!disabled &&
          type !== "password" &&
          inputValue &&
          !noCancel &&
          inputValue.length > 0 && (
            <button
              type="button"
              className={styles.cancel}
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
            >
              <RoundCancelIcon />
            </button>
          )}

          <input
            name={name}
            type={showPassword ? "text" : type}
            onChange={handleInputChange}
            ref={(el) => {
              if (el) {
                inputRef.current = el;
                if (placeInputRef) {
                  (placeInputRef as React.MutableRefObject<HTMLInputElement>).current = el;
                }
              }
            }}
            value={inputValue}
            maxLength={maxLength}
            style={customStyles}
            className={styles.input}
            placeholder={placeholder}
            id={id}
            disabled={disabled}
            onPaste={handlePaste}
          />
        {preffix && isOpen && <i className={styles.preffix}>{preffix}</i>}
        {preffix && !isOpen && isActive && (
          <i className={styles.preffix}>{preffix}</i>
        )}
      </div>
      {helperText && (
        <span
          style={{
            marginTop: "5px",
            fontSize: "14px",
            marginBottom: "0px",
            textAlign: "left",
          }}
        >
          {helperText}
        </span>
      )}
    </>
  );
};

export default InputField;