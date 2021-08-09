
exports.up = async function (knex) {
    const table = await knex.schema.hasTable('deduction')
    if (!table) {
        return knex.schema.createTable('deduction', table => {
            table.increments('id')
            table.integer('employee_id')
            table.foreign('employee_id').references('employee.id').deferrable('deferred')
            table.string('reason').notNullable()
            table.decimal('amount', 8, 2).notNullable();
            table.date('date').notNullable();
        })
    }
};

exports.down = function (knex) {
    return knex.schema.dropTable('deduction');
};
