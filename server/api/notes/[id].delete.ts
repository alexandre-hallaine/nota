export default eventHandler(async (event) => {
    const { id } = getRouterParams(event)

    const deletedNote = await useDrizzle().delete(tables.notes).where(and(
      eq(tables.notes.id, Number(id))
    )).returning().get()

    if (!deletedNote) {
      throw createError({
        statusCode: 404,
        message: 'Note not found'
      })
    }
    return deletedNote
  })
