'use client'

import React, { JSX } from 'react'
import styles from './typo.module.scss'
import clsx from 'clsx'

type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'caption'
  | 'label'
  | 'span' 

type Props<T extends keyof JSX.IntrinsicElements = 'p'> = {
  as?: T
  variant?: Variant
  color?: 'primary' | 'secondary' | 'error' | 'success' | 'gray' | 'white' | 'red'
  align?: 'left' | 'center' | 'right'
  weight?: 'light' | 'normal' | 'medium' | 'bold' | 'semibold'
  uppercase?: boolean
  italic?: boolean
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>


const Typography = ({
  as: Component = 'p',
  variant = 'body',
  color,
  align,
  weight,
  uppercase,
  italic,
  className,
  children,
}: Props) => {
  return (
    <Component
      className={clsx(
        styles.typography,
        styles[variant],
        color && styles[color],
        align && styles[`align-${align}`],
        weight && styles[`weight-${weight}`],
        uppercase && styles.uppercase,
        italic && styles.italic,
        className
      )}
    >
      {children}
    </Component>
  )
}
export default Typography