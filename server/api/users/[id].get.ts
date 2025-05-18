export default eventHandler((event) => {
    const {id} = getRouterParams(event)
    return useDrizzle().select().from(tables.users).where(eq(tables.users.id, Number(id))).get();
})
