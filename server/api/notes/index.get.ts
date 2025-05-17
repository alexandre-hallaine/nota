export default eventHandler(() => useDrizzle().select().from(tables.notes).all())
