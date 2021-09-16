
exports.up = function (knex) {
    return knex.schema.table('payroll', table => {
        table.date('payday')
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable('payroll', table => {
        table.dropColumn('payday')
    })
};
