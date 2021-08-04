
exports.up = async function (knex) {
    const table = await knex.schema.hasTable('leave');
    if (!table) {
        return knex.schema.createTable('leave', (table) => {
            table.increments('id');
            table.integer('employee_id').unsigned();
            table.foreign('employee_id').references('employee.id').deferrable('deferred');
            table.string('reason').notNullable();
            table.date('from').notNullable();
            table.date('to').notNullable();
            table.enu('status', ['approved', 'rejected', 'pending']).defaultTo('pending');
        })
    }
};

exports.down = function (knex) {
    return knex.schema.dropTable('leave');
};
