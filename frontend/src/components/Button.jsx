import React from 'react';

// Using styling from index.css base styles and utility classes
export default function Button({ children, onClick, type = 'button', fullWidth = false, className = '' }) {
  const styles = {
    padding: '12px 24px',
    borderRadius: '100px', // ROUND_FULL from design system
    background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-primary-container) 100%)',
    color: 'var(--color-on-primary)',
    border: 'none',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    width: fullWidth ? '100%' : 'auto',
    transition: 'filter 0.2s ease, transform 0.1s ease',
    boxShadow: '0 4px 6px rgba(0, 109, 67, 0.2)'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      style={styles}
      className={className}
      onMouseOver={(e) => { e.currentTarget.style.filter = 'brightness(1.1)'; }}
      onMouseOut={(e) => { e.currentTarget.style.filter = 'none'; }}
      onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)'; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
    >
      {children}
    </button>
  );
}
