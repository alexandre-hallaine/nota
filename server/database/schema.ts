import { integer, primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    bio: text('bio').notNull(),
});

export const notes = sqliteTable('notes', {
    id: integer('id').primaryKey({autoIncrement: true}),
    content: text('content').notNull(),
    userId: integer("user_id").references(() => users.id).notNull(),
    createdAt: integer('created_at', {mode: 'timestamp'}).notNull(),
});

export const follows = sqliteTable('follows', {
    followerId: integer('follower_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
    followingId: integer('following_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
}, (table) => [
    primaryKey({ columns: [table.followerId, table.followingId] }),
]);

export const usersRelations = relations(users, ({ many }) => ({
    notes: many(notes),
    following: many(follows, { relationName: 'userFollowing' }),
    followers: many(follows, { relationName: 'userFollowers' }),
}));

export const notesRelations = relations(notes, ({ one }) => ({
    user: one(users, {
        fields: [notes.userId],
        references: [users.id],
    }),
}));

export const followsRelations = relations(follows, ({ one }) => ({
    follower: one(users, {
        fields: [follows.followerId],
        references: [users.id],
        relationName: 'userFollowing',
    }),
    following: one(users, {
        fields: [follows.followingId],
        references: [users.id],
        relationName: 'userFollowers',
    }),
}));
