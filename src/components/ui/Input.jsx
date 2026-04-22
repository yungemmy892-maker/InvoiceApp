import './Input.css'

export default function Input({ label, id, error, className = '', ...props }) {
  return (
    <div className="form-field">
      {label && (
        <label
          htmlFor={id}
          className={`form-field__label${error ? ' form-field__label--error' : ''}`}
        >
          <span>{label}</span>
          {error && <span className="form-field__error-msg">{error}</span>}
        </label>
      )}
      <input
        id={id}
        className={`form-input${error ? ' is-error' : ''} ${className}`}
        {...props}
      />
    </div>
  )
}