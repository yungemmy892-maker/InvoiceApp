export const SEED_INVOICES = [
  {
    id: 'RT3080', status: 'paid', createdAt: '2021-08-18',
    paymentTerms: 1, paymentDue: '2021-08-19', description: 'Re-branding',
    billFrom: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    billTo:   { name: 'Jensen Huang', email: 'jensenh@mail.com', street: '106 Kendell Street', city: 'Sharrington', postCode: 'NR24 5WQ', country: 'United Kingdom' },
    items: [{ name: 'Brand Guidelines', qty: 1, price: 1800.90 }],
  },
  {
    id: 'XM9141', status: 'pending', createdAt: '2021-08-21',
    paymentTerms: 30, paymentDue: '2021-09-20', description: 'Graphic Design',
    billFrom: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    billTo:   { name: 'Alex Grim', email: 'alexgrim@mail.com', street: '84 Church Way', city: 'Bradford', postCode: 'BD1 9PB', country: 'United Kingdom' },
    items: [
      { name: 'Banner Design', qty: 1, price: 156.00 },
      { name: 'Email Design',  qty: 2, price: 200.00 },
    ],
  },
  {
    id: 'RG0314', status: 'paid', createdAt: '2021-09-01',
    paymentTerms: 30, paymentDue: '2021-10-01', description: 'Website Redesign',
    billFrom: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    billTo:   { name: 'John Morrison', email: 'jm@myco.com', street: '79 Dover Road', city: 'Westhall', postCode: 'IP19 3PF', country: 'United Kingdom' },
    items: [
      { name: 'Project Kickoff',  qty: 1, price: 2500.00 },
      { name: 'Design Mockups',   qty: 3, price: 3834.11 },
    ],
  },
  {
    id: 'RT2080', status: 'pending', createdAt: '2021-10-11',
    paymentTerms: 1, paymentDue: '2021-10-12', description: 'Logo Concept',
    billFrom: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    billTo:   { name: 'Alysa Werner', email: 'alysa@email.co.uk', street: '63 Warwick Road', city: 'Carlisle', postCode: 'CA20 2TG', country: 'United Kingdom' },
    items: [{ name: 'Logo Sketches', qty: 1, price: 102.04 }],
  },
  {
    id: 'AA1449', status: 'pending', createdAt: '2021-10-13',
    paymentTerms: 1, paymentDue: '2021-10-14', description: 'Re-branding',
    billFrom: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    billTo:   { name: 'Mellisa Clarke', email: 'mellisa.clarke@example.com', street: '46 Abbey Row', city: 'Cambridge', postCode: 'CB5 6EG', country: 'United Kingdom' },
    items: [
      { name: 'New Logo',         qty: 1, price: 1532.33 },
      { name: 'Brand Guidelines', qty: 1, price: 2500.00 },
    ],
  },
  {
    id: 'TY9141', status: 'pending', createdAt: '2021-10-30',
    paymentTerms: 1, paymentDue: '2021-10-31', description: 'Landing Page Design',
    billFrom: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    billTo:   { name: 'Thomas Wayne', email: 'thomas@dc.com', street: '3 Gotham City', city: 'Gotham', postCode: 'DC1 4AU', country: 'United Kingdom' },
    items: [{ name: 'Landing Page', qty: 1, price: 6155.91 }],
  },
  {
    id: 'FV2353', status: 'draft', createdAt: '2021-11-11',
    paymentTerms: 1, paymentDue: '2021-11-12', description: 'Logo Re-design',
    billFrom: { street: '19 Union Terrace', city: 'London', postCode: 'E1 3EZ', country: 'United Kingdom' },
    billTo:   { name: 'Anita Wainwright', email: '', street: '', city: '', postCode: '', country: '' },
    items: [{ name: 'Logo Re-design', qty: 1, price: 3102.04 }],
  },
]