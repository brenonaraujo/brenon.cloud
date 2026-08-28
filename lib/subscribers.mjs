function key(email, locale) {
  return `${locale === 'pt' ? 'pt' : 'en'}:${String(email).trim().toLowerCase()}`
}

export class MemorySubscriberStore {
  constructor() {
    this.rows = new Map()
  }

  async get(email, locale) {
    return this.rows.get(key(email, locale)) || null
  }

  async addConfirmed({ email, locale }) {
    const row = {
      email: String(email).trim().toLowerCase(),
      locale: locale === 'pt' ? 'pt' : 'en',
      confirmedAt: Date.now()
    }
    this.rows.set(key(row.email, row.locale), row)
    return row
  }

  async remove(email, locale) {
    this.rows.delete(key(email, locale))
  }

  list(locale) {
    const loc = locale === 'pt' ? 'pt' : 'en'
    return [...this.rows.values()].filter((row) => row.locale === loc)
  }

  async listConfirmed(locale) {
    return this.list(locale)
  }
}
