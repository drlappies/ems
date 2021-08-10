
exports.up = async function (knex) {
    const table = await knex.schema.hasTable('bonus');
    if (!table) {
        return knex.schema.createTable('bonus', table => {
            table.increments('id');
            table.integer('employee_id').notNullable()
            table.foreign('employee_id').references('employee.id')
            table.string('reason').notNullable();
            table.decimal('amount', 8, 2).notNullable();
            table.date('date').notNullable();
        })
    }
};

exports.down = function (knex) {
    return knex.schema.dropTable('bonus')
};
