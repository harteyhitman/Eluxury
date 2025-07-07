// components/ui/Button.tsx
import React from 'react'
import clsx from 'clsx'
import styles from './button.module.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'filled'
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'primary', loading = false, disabled, size = 'md', className, ...props }, ref) => {
    const isDisabled = disabled || loading

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={clsx(styles.btn, styles[variant], styles[size], className, {
          [styles.loading]: loading,
          [styles.disabled]: isDisabled,
        })}
        {...props}
      >
        {loading ? <span className={styles.spinner}>⏳</span> : children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button
