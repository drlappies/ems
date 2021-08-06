
exports.up = function (knex) {
    function convertToTimeWithDefaultTo() {
        return knex.schema.alterTable('attendance', table => {
            table.time('check_in').notNullable().defaultTo(knex.fn.now()).alter();
            table.time('check_out').notNullable().defaultTo(knex.fn.now()).alter();
        })
    }

    function removeDefaultTo() {
        return knex.schema.alterTable('attendance', table => {
            table.time('check_in').notNullable().alter();
            table.time('check_out').notNullable().alter();
        })
    }

    return convertToTimeWithDefaultTo().then(removeDefaultTo)
};

exports.down = function (knex) {
    function dropColumns() {
        return knex.schema.table('attendance', table => {
            table.dropColumns('check_in');
            table.dropColumns('check_out');
        })
    }

    function convertToTimestamp() {
        return knex.schema.table('attendance', table => {
            table.datetime('check_in').notNullable().defaultTo(knex.fn.now())
            table.datetime('check_out').notNullable().defaultTo(knex.fn.now())
        })
    }

    return dropColumns().then(convertToTimestamp)
};
