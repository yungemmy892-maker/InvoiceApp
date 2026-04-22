export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || '')

export const validateInvoice = (data, asDraft) => {
  const errs = []

  if (asDraft) {
    // Drafts only need at least something filled in
    return errs
  }

  if (!data.billFrom.street)  errs.push('Bill From street address is required')
  if (!data.billFrom.city)    errs.push('Bill From city is required')
  if (!data.billFrom.country) errs.push('Bill From country is required')
  if (!data.billTo.name)      errs.push("Client's name is required")
  if (!data.billTo.email || !isEmail(data.billTo.email))
    errs.push('Valid client email is required')
  if (!data.billTo.street)    errs.push("Client's street address is required")
  if (!data.billTo.city)      errs.push("Client's city is required")
  if (!data.billTo.country)   errs.push("Client's country is required")
  if (!data.description)      errs.push('Project description is required')
  if (!data.items.length)     errs.push('An item must be added')

  data.items.forEach((it, i) => {
    if (!it.name)
      errs.push(`Item ${i + 1}: name required`)
    if (isNaN(Number(it.price)) || Number(it.price) < 0)
      errs.push(`Item ${i + 1}: invalid price`)
    if (isNaN(Number(it.qty)) || Number(it.qty) <= 0)
      errs.push(`Item ${i + 1}: qty must be > 0`)
  })

  return errs
}

export const getFieldErrors = (data) => {
  const fe = {}
  if (!data.billFrom.street)  fe['billFrom.street']  = "can't be empty"
  if (!data.billFrom.city)    fe['billFrom.city']    = "can't be empty"
  if (!data.billFrom.country) fe['billFrom.country'] = "can't be empty"
  if (!data.billTo.name)      fe['billTo.name']      = "can't be empty"
  if (!data.billTo.email || !isEmail(data.billTo.email))
    fe['billTo.email'] = 'invalid email'
  if (!data.billTo.street)    fe['billTo.street']    = "can't be empty"
  if (!data.billTo.city)      fe['billTo.city']      = "can't be empty"
  if (!data.billTo.country)   fe['billTo.country']   = "can't be empty"
  if (!data.description)      fe['description']      = "can't be empty"
  return fe
}