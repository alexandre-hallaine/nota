export default eventHandler((event) => {
    const { userId } = getQuery(event);

    let query = useDrizzle()
        .select()
        .from(tables.notes)

    if (userId)
        query = query.where(eq(tables.notes.userId, Number(userId)));
    else
        query = query.leftJoin(tables.users, eq(tables.notes.userId, tables.users.id));

    return query.orderBy(desc(tables.notes.createdAt)).all();
})
