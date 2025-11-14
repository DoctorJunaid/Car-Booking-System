import React from 'react'
import clsx from 'clsx'

const Button = ({ variant = 'primary', size = 'md', children, className = '', ...props }) => {
  const variants = {
    primary: 'btn-primary text-white',
    outline: 'btn-outline',
    ghost: 'btn-ghost'
  }

  const sizes = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg'
  }

  const base = 'btn rounded-lg'

  return (
    <button
      className={clsx(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
