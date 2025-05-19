export default eventHandler((event) => {
    const { userId } = getQuery(event);

    let query = useDrizzle()
        .select()
        .from(tables.notes)
        .leftJoin(tables.users, eq(tables.notes.userId, tables.users.id));

    if (userId)
        query = query.where(eq(tables.notes.userId, Number(userId)));

    return query.orderBy(desc(tables.notes.createdAt)).all();
})
