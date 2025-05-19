export default eventHandler(async (event) => {
    const {content, userId} = await readBody(event)
    return await useDrizzle().insert(tables.notes).values({content, userId, createdAt: new Date()}).returning()
})
