import React from 'react'

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`rounded-lg shadow-md bg-white overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

export const CardContent = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>{children}</div>
)

export default Card
