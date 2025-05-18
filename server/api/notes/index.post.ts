export default eventHandler(async (event) => {
    const {title} = await readBody(event)
    return await useDrizzle().insert(tables.notes).values({
        title,
        createdAt: new Date()
    }).returning().get()
})
