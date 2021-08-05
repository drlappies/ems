exports.up = async function (knex) {
    return knex.schema.table('attendance', (table) => {
        table.enu('status', ['on_time', 'late', 'absent']).notNullable()
    })
};

exports.down = function (knex) {
    return knex.schema.table('attendance', (table) => {
        table.dropColumn('status')
    })
};
