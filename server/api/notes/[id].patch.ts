export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)
    const { completed } = await readBody(event)

    return await useDrizzle().update(tables.notes).set({
        completed
      }).where(eq(tables.notes.id, Number(id))).returning().get()
  })
