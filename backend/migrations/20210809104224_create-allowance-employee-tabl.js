
exports.up = async function (knex) {
    const table = await knex.schema.hasTable('allowance_employee')
    if (!table) {
        return knex.schema.createTable('allowance_employee', table => {
            table.integer('allowance_id')
            table.foreign('allowance_id').references('allowance.id').onUpdate('CASCADE').onDelete('CASCADE')
            table.integer('employee_id')
            table.foreign('employee_id').references('employee.id').onUpdate('CASCADE').onDelete('CASCADE')
        })
    }
};

exports.down = function (knex) {
    return knex.schema.dropTable('allowance_employee');
};
