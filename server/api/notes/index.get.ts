export default eventHandler(async (event) => {
    const {userId} = await readBody(event)
    return await useDrizzle().select().from(tables.notes).where(eq(tables.notes.userId, userId)).all();
})
