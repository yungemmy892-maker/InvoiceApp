import './Checkbox.css'

export default function Checkbox({ id, label, checked, onChange }) {
  return (
    <label className="checkbox-wrap" htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <span className="checkbox-label">{label}</span>
    </label>
  )
}