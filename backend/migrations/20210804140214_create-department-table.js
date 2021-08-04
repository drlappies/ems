
exports.up = async function (knex) {
    const table = await knex.schema.hasTable('departments');
    if (!table) {
        return knex.schema.createTable('departments', (table) => {
            table.increments('id');
            table.string('name').unique().notNullable();
            table.string('description');
        })
    }
};

exports.down = function (knex) {
    return knex.schema.dropTable('departments');
};
