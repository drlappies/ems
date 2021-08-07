
exports.up = function (knex) {
    return knex.schema.table('leave', table => {
        table.enu('duration', ['half_day', 'full_day']).notNullable()
        table.enu('type', ['sick_leave', 'no_pay_leave', 'annual_leave']).notNullable()
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable('leave', table => {
        table.dropColumn('duration')
        table.dropColumn('type')
    })
};
