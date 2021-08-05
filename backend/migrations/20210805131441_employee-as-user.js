
exports.up = function (knex) {
    return knex.schema.table('employee', table => {
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.enu('role', ['employee', 'admin']).defaultTo('employee')
    })
};

exports.down = function (knex) {
    return knex.schema.table('employee', table => {
        table.dropColumn('username');
        table.dropColumn('password');
    })
};
