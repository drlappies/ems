
exports.up = async function (knex) {
    const table = await knex.schema.hasTable('allowance_employee')
    if (!table) {
        return knex.schema.createTable('allowance_employee', table => {
            table.integer('allowance_id')
            table.foreign('allowance_id').references('allowance.id').deferrable('deferred')
            table.integer('employee_id')
            table.foreign('employee_id').references('employee.id').deferrable('deferred')
        })
    }
};

exports.down = function (knex) {
    return knex.schema.dropTable('allowance_employee');
};
