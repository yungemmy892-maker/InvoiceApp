import './Select.css'

export default function Select({ label, id, options, value, onChange, error }) {
  return (
    <div className="form-field">
      {label && (
        <label
          htmlFor={id}
          className={`form-field__label${error ? ' form-field__label--error' : ''}`}
        >
          {label}
        </label>
      )}
      <div className="form-select-wrap">
        <select
          id={id}
          className="form-select"
          value={value}
          onChange={onChange}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}