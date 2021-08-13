
exports.up = async function (knex) {
    const table = await knex.schema.hasTable('overtime');
    if (!table) {
        return knex.schema.createTable('overtime', table => {
            table.increments('id');
            table.integer('employee_id').notNullable();
            table.foreign('employee_id').references('employee.id');
            table.time('from').notNullable();
            table.time('to')
            table.date('date').notNullable();
            table.enu('status', ['pending', 'approved', 'rejected']).defaultTo('pending')
        })
    }
};

exports.down = function (knex) {
    return knex.schema.dropTable('overtime')
};
