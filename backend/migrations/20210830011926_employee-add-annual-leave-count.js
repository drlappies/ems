
exports.up = function (knex) {
    return knex.schema.table('employee', table => {
        table.decimal('annual_leave_count', 8, 1).notNullable().unsigned().defaultTo(0)
    })
};

exports.down = function (knex) {
    return knex.schema.table('employee', table => {
        table.dropColumn('annual_leave_count')
    })
};
