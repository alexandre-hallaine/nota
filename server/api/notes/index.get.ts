export default eventHandler(async (event) => {
    const {userId} = getQuery(event)
    return useDrizzle().select().from(tables.notes).where(eq(tables.notes.userId, Number(userId))).orderBy(desc(tables.notes.createdAt)).all();
})
