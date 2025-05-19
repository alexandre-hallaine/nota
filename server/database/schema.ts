import {integer, sqliteTable, text} from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    bio: text('bio').notNull(),
})

export const notes = sqliteTable('notes', {
    id: integer('id').primaryKey({autoIncrement: true}),
    content: text('content').notNull(),
    userId: integer("user_id").references(() => users.id).notNull(),
    createdAt: integer('created_at', {mode: 'timestamp'}).notNull(),
})
