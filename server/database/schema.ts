import {integer, sqliteTable, text} from 'drizzle-orm/sqlite-core'

export const notes = sqliteTable('notes', {
    id: integer('id').primaryKey({autoIncrement: true}),
    content: text('content').notNull(),
    userId: text('user_id').notNull(),
    createdAt: integer('created_at', {mode: 'timestamp'}).notNull(),
})
