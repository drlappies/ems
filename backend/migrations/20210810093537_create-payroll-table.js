
exports.up = async function (knex) {
    const table = await knex.schema.hasTable('payroll');
    if (!table) {
        return knex.schema.createTable('payroll', table => {
            table.increments('id');
            table.integer('employee_id').unsigned().notNullable();
            table.foreign('employee_id').references('employee.id');
            table.date('from').notNullable();
            table.date('to').notNullable();
            table.decimal('amount', 8, 2).notNullable();
            table.decimal('reimbursement', 8, 2).notNullable();
            table.decimal('allowance', 8, 2).notNullable();
            table.decimal('deduction', 8, 2).notNullable();
            table.decimal('bonus', 8, 2).notNullable();
            table.decimal('overtime', 8, 2).notNullable();
            table.enu('status', ['pending', 'confirmed']).defaultTo('pending')
        })
    }
};

exports.down = function (knex) {
    return knex.schema.dropTable('payroll');
};
