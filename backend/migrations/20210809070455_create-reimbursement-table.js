
exports.up = async function (knex) {
    const table = await knex.schema.hasTable('reimbursement');
    if (!table) {
        return knex.schema.createTable('reimbursement', table => {
            table.increments('id')
            table.integer('employee_id').unsigned()
            table.foreign('employee_id').references('employee.id').deferrable('deferred')
            table.decimal('amount', 8, 2).notNullable()
            table.string('reason').notNullable()
            table.date('date').notNullable()
            table.enu('status', ['approved', 'rejected', 'pending']).defaultTo('pending')
        })
    }
};

exports.down = function (knex) {
    return knex.schema.dropTable('reimbursement');
};
