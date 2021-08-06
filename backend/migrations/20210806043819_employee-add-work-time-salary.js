
exports.up = function (knex) {
    return knex.schema.table('employee', table => {
        table.time('start_hour').notNullable().defaultTo('09:00 AM');
        table.time('end_hour').notNullable().defaultTo('6:00 PM');
        table.decimal('salary_monthly', 8, 2).notNullable().defaultTo(18000.00);
    })
};

exports.down = function (knex) {
    return knex.schema.table('employee', table => {
        table.dropColumn('start_hour')
        table.dropColumn('end_hour')
        table.dropColumn('salary_monthly')
    })
};
