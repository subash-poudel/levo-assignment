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
    table.dateTime("start_date").notNullable();
    table.datetime("end_date").notNullable();
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
