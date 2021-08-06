
exports.up = function (knex) {
    return knex.schema.alterTable('attendance', table => {
        table.time('check_out').alter()
    })
};

exports.down = function (knex) {
    function makeNotnullable() {
        return knex.schema.alterTable('attendance', table => {
            table.time('check_out').notNullable().defaultTo('09:00 AM').alter()
        })
    }

    function removeDefaultTo() {
        return knex.schema.alterTable('attendance', table => {
            table.time('check_out').notNullable().alter()
        })
    }

    return makeNotnullable().then(removeDefaultTo)
};
