
exports.up = function (knex) {
    return knex.schema.alterTable('employee', table => {
        table.time('start_hour').notNullable().alter();
        table.time('end_hour').notNullable().alter();
        table.decimal('salary_monthly', 8, 2).alter();
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable('employee', table => {
        table.time('start_hour').notNullable().defaultTo('09:00 AM').alter();
        table.time('end_hour').notNullable().defaultTo('6:00 PM').alter();
        table.decimal('salary_monthly', 8, 2).notNullable().defaultTo(18000.00).alter();
    })
};
