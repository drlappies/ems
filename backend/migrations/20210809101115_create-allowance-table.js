
exports.up = async function (knex) {
    const table = await knex.schema.hasTable('allowance');
    if (!table) {
        return knex.schema.createTable('allowance', table => {
            table.increments('id');
            table.string('name').notNullable();
            table.string('description').notNullable();
            table.decimal('amount', 8, 2).notNullable();
            table.enu('status', ['active', 'disabled']).defaultTo('active');
        })
    }
};

exports.down = function (knex) {
    return knex.schema.dropTable('allowance');
};
