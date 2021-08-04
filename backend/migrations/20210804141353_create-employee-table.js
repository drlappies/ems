
exports.up = async function (knex) {
    const table = await knex.schema.hasTable('employee');
    if (!table) {
        return knex.schema.createTable('employee', (table) => {
            table.increments('id');
            table.integer('dept_id').unsigned();
            table.foreign('dept_id').references('departments.id').deferrable('deferred');
            table.integer('post_id').unsigned();
            table.foreign('post_id').references('positions.id').deferrable('deferred');
            table.string('firstname').notNullable();
            table.string('lastname').notNullable();
            table.string('address').notNullable();
            table.string('phone_number').notNullable();
            table.string('emergency_contact_person').notNullable();
            table.string('emergency_contact_number').notNullable();
            table.date('onboard_date').notNullable();
            table.enu('status', ['available', 'unavailable', 'temporarily_unavailable']).defaultTo('available');
            table.timestamps(true, true);
        })
    }
};

exports.down = function (knex) {
    return knex.schema.dropTable('employee');
};
