export default eventHandler(async event => {
    const { user } = await requireUserSession(event)
    const { name, bio } = await readBody(event)
    return useDrizzle().update(tables.users).set({ name, bio }).where(eq(tables.users.id, Number(user.id))).returning();
})
