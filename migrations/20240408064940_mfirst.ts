import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('todos2', (table) => {
        table.text('id').primary();
        table.string('title', 255).notNullable();
        table.text('description');
        table.increments('order_id');
        table.string('status', 50).defaultTo('todo');
        table.timestamp('estimate');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.boolean('is_active').defaultTo(true);
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('todos2');
}