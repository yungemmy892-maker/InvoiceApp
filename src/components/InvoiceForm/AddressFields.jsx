import Input from '../ui/Input'

export default function AddressFields({ prefix, data, onChange, errors = {} }) {
  return (
    <>
      <div className="form-row">
        <Input
          id={`${prefix}-street`}
          label="Street Address"
          value={data.street}
          onChange={(e) => onChange('street', e.target.value)}
          error={errors[`${prefix}.street`]}
        />
      </div>
      <div className="form-grid-3 form-row">
        <Input
          id={`${prefix}-city`}
          label="City"
          value={data.city}
          onChange={(e) => onChange('city', e.target.value)}
          error={errors[`${prefix}.city`]}
        />
        <Input
          id={`${prefix}-postCode`}
          label="Post Code"
          value={data.postCode}
          onChange={(e) => onChange('postCode', e.target.value)}
        />
        <Input
          id={`${prefix}-country`}
          label="Country"
          value={data.country}
          onChange={(e) => onChange('country', e.target.value)}
          error={errors[`${prefix}.country`]}
        />
      </div>
    </>
  )
}