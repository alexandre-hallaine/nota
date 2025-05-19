export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const { user } = await requireUserSession(event)
    return useDrizzle().delete(tables.follows).where(and(
        eq(tables.follows.followerId, Number(user.id)),
        eq(tables.follows.followingId, Number(id))
    )).returning();
})
