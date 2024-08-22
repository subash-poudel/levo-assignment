/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
  return knex.schema.createTable("event", function (table) {
    table.increments("id").primary();
    table.string("title", 255).notNullable();
    table.string("description", 255).notNullable();
    table.string("participants", 3000).notNullable();
    table.date("start_date").notNullable();
    table.date("end_date").notNullable();
    table.string("cron", 50).notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("event");
};
