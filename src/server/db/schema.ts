import { relations } from 'drizzle-orm';
import {
    boolean,
    integer,
    json,
    pgTable,
    serial,
    text,
    timestamp,
    uniqueIndex,
    varchar,
} from 'drizzle-orm/pg-core';

// Define Tables

export const users = pgTable(
    'users',
    {
        id: varchar('id', {
            length: 255,
        }).primaryKey(),
        email: varchar('email', {
            length: 255,
        }).notNull(),
        normalizedEmail: varchar('normalized_email', {
            length: 255,
        }).notNull(),
        emailVerified: boolean('email_verified').default(false),
        agreedToTerms: boolean('agreed_to_terms').default(false),
        hashedPassword: varchar('hashed_password').default('').notNull(),
    },
    table => {
        return {
            normalizedEmailIdx: uniqueIndex('normalized_email_idx').on(table.normalizedEmail),
        };
    }
);

export const emailVerificationCodes = pgTable('email_verification_codes', {
    id: serial('id').primaryKey(),
    code: varchar('code', {
        length: 255,
    }).notNull(),
    expiresAt: timestamp('expires_at', {
        withTimezone: true,
        mode: 'date',
    }).notNull(),

    userId: varchar('user_id')
        .notNull()
        .references(() => users.id),
});

export const sessions = pgTable('sessions', {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at', {
        withTimezone: true,
        mode: 'date',
    }).notNull(),

    userId: varchar('user_id')
        .notNull()
        .references(() => users.id),
});

export const projects = pgTable('projects', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
    userId: varchar('user_id')
        .notNull()
        .references(() => users.id),
});

export const codes = pgTable('codes', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
    projectId: integer('project_id')
        .notNull()
        .references(() => projects.id),
});

export const results = pgTable('results', {
    id: serial('id').primaryKey(),
    analysisType: varchar('analysis_type', { length: 255 }).notNull(),
    resultData: json('result_data').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' })
        .defaultNow()
        .notNull()
        .$onUpdate(() => new Date()),
    codeId: integer('code_id')
        .notNull()
        .references(() => codes.id),
    projectId: integer('project_id')
        .notNull()
        .references(() => projects.id),
});

// Define Relations

export const usersRelations = relations(users, ({ many }) => ({
    emailVerificationCodes: many(emailVerificationCodes),
    sessions: many(sessions),
}));

export const emailVerificationCodesRelations = relations(emailVerificationCodes, ({ one }) => ({
    users: one(users, {
        fields: [emailVerificationCodes.userId],
        references: [users.id],
    }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
    users: one(users, {
        fields: [sessions.userId],
        references: [users.id],
    }),
}));

// Define Relations
export const projectsRelations = relations(projects, ({ one, many }) => ({
    user: one(users, {
        fields: [projects.userId],
        references: [users.id],
    }),
    codes: many(codes),
}));

export const codesRelations = relations(codes, ({ one, many }) => ({
    project: one(projects, {
        fields: [codes.projectId],
        references: [projects.id],
    }),
    results: many(results),
}));

export const resultsRelations = relations(results, ({ one }) => ({
    code: one(codes, {
        fields: [results.codeId],
        references: [codes.id],
    }),
    project: one(projects, {
        fields: [results.projectId],
        references: [projects.id],
    }),
}));
