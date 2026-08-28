export function createBlobSubscriberStore(store) {
  const prefix = (locale) => `confirmed:${locale === 'pt' ? 'pt' : 'en'}:`
  const keyFor = (email, locale) => `${prefix(locale)}${String(email).trim().toLowerCase()}`

  return {
    async get(email, locale) {
      return (await store.get(keyFor(email, locale), { type: 'json' })) || null
    },
    async addConfirmed({ email, locale }) {
      const row = {
        email: String(email).trim().toLowerCase(),
        locale: locale === 'pt' ? 'pt' : 'en',
        confirmedAt: Date.now()
      }
      await store.setJSON(keyFor(row.email, row.locale), row)
      return row
    },
    async remove(email, locale) {
      await store.delete(keyFor(email, locale))
    },
    async listConfirmed(locale) {
      const listed = await store.list({ prefix: prefix(locale) })
      const blobs = listed.blobs || []
      const rows = []
      for (const blob of blobs) {
        const row = await store.get(blob.key, { type: 'json' })
        if (row) rows.push(row)
      }
      return rows
    }
  }
}
