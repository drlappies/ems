
exports.up = function (knex) {
    return knex.schema.table('payroll', table => {
        table.decimal('basic_salary', 8, 2)
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable('payroll', table => {
        table.dropColumn('basic_salary')
    })
};
