import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// 1. Categories
export const categories = sqliteTable('categories', {
  id: text('id').primaryKey(), // UUID
  name: text('name').notNull(),
  color: text('color').notNull(),
  icon: text('icon').notNull(),
});

// 2. Task Templates (The recurring base task)
export const taskTemplates = sqliteTable('task_templates', {
  id: text('id').primaryKey(), // UUID
  categoryId: text('category_id')
    .notNull()
    .references(() => categories.id),
  title: text('title').notNull(),
  notes: text('notes'),
  // 0 = One-off, 1 = Daily, 2 = Weekly, 3 = Monthly
  frequencyLevel: integer('frequency_level').notNull().default(0),
  isActive: integer('is_active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});

// 3. Task Instances (The actual completable item for a specific day)
export const taskInstances = sqliteTable('task_instances', {
  id: text('id').primaryKey(), // UUID
  templateId: text('template_id').references(() => taskTemplates.id), // Nullable for one-off tasks without a template
  dueDate: integer('due_date', { mode: 'timestamp' }).notNull(),
  // Status: 'PENDING', 'COMPLETED', 'SKIPPED'
  status: text('status').notNull().default('PENDING'),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
});

// 4. Notifications
export const notifications = sqliteTable('notifications', {
  id: text('id').primaryKey(), // UUID
  templateId: text('template_id').references(() => taskTemplates.id), // For inheriting notifications to new instances
  instanceId: text('instance_id').references(() => taskInstances.id),
  timeOfDay: text('time_of_day').notNull(), // Format: "HH:MM"
  // Status: 'PENDING', 'DELIVERED', 'INTERACTED'
  status: text('status').notNull().default('PENDING'),
});
