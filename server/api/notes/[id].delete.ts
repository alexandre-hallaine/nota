export default eventHandler((event) => {
    const {id} = getRouterParams(event)
    return useDrizzle().delete(tables.notes).where(eq(tables.notes.id, Number(id))).returning()
})
