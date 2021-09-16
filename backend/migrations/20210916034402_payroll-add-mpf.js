
exports.up = function (knex) {
    return knex.schema.table('payroll', table => {
        table.decimal('mpf_deduction', 8, 2)
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable('payroll', table => {
        table.dropColumn('mpf_deduction')
    })
};
