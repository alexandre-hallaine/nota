export default eventHandler(async event => {
    const { id } = getRouterParams(event)

    return useDrizzle().query.users.findFirst({
        where: eq(tables.users.id, Number(id)),
        with: { following: { columns: { followingId: true } }, followers:  { columns: { followerId: true } } }
    });
})