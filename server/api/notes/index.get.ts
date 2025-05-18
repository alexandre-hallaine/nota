export default eventHandler((event) => {
    let query = useDrizzle().select().from(tables.notes);

    const { userId } = getQuery(event)
    if (userId) query = query.where(eq(tables.notes.userId, Number(userId)))

    return query.orderBy(desc(tables.notes.createdAt)).all();
})
