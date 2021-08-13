
exports.up = function (knex) {
    return knex.schema.table('employee', table => {
        table.boolean('ot_pay_entitled').notNullable().defaultTo(false);
        table.decimal('ot_hourly_salary', 8, 2).notNullable().defaultTo(0);
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable('employee', table => {
        table.dropColumn('ot_pay_entitled')
        table.dropColumn('ot_hourly_salary')
    })
};
