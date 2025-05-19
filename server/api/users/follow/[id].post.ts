export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const { user } = await requireUserSession(event)
    return useDrizzle().insert(tables.follows).values({
        followerId: Number(user.id),
        followingId: Number(id),
    }).returning();
})
