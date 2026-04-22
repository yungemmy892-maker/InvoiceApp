export const generateId = () => {
  const L = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const r = (arr) => arr[Math.floor(Math.random() * arr.length)]
  return `${r(L)}${r(L)}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`
}

export const addDays = (dateStr, days) => {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  d.setDate(d.getDate() + Number(days))
  return d.toISOString().split('T')[0]
}

export const mkItem = () => ({
  _id: Date.now() + Math.random(),
  name: '',
  qty: 1,
  price: '',
})