import React from 'react';

export default function Input({ label, type = 'text', placeholder, value, onChange, id, required = false }) {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '16px',
    width: '100%',
    textAlign: 'left'
  };

  const labelStyle = {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: 'var(--color-on-surface-variant)'
  };

  const inputStyle = {
    padding: '16px',
    borderRadius: '16px', // md rounded corners from design system
    border: '1px solid var(--color-outline)',
    backgroundColor: 'var(--color-surface-lowest)',
    color: 'var(--color-on-surface)',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div style={containerStyle}>
      {label && <label htmlFor={id} style={labelStyle}>{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        style={inputStyle}
        onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--color-outline)'}
      />
    </div>
  );
}
