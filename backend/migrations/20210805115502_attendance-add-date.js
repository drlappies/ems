exports.up = function (knex) {
    return knex.schema.table('attendance', (table) => {
        table.date('date').notNullable();
    })
};

exports.down = function (knex) {
    return knex.schema.table('attendance', (table) => {
        table.dropColumn('date')
    })
};
