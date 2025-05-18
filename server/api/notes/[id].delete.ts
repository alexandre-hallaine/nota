export default eventHandler(async (event) => {
    const {id} = getRouterParams(event)
    return await useDrizzle().delete(tables.notes).where(eq(tables.notes.id, Number(id))).returning().get().catch(() => {
        throw createError({
            statusCode: 404,
            message: 'Note not found'
        })
    })
})
