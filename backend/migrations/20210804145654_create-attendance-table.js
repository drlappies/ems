
exports.up = async function (knex) {
    const table = await knex.schema.hasTable('attendance');
    if (!table) {
        return knex.schema.createTable('attendance', (table) => {
            table.increments('id');
            table.integer('employee_id').unsigned();
            table.foreign('employee_id').references('employee.id').deferrable('deferred');
            table.datetime('check_in').notNullable();
            table.datetime('check_out').notNullable();
        })
    }
};

exports.down = function (knex) {
    return knex.schema.dropTable('attendance');
};
