
exports.up = async function (knex) {
    const table = await knex.schema.hasTable('positions');
    if (!table) {
        return knex.schema.createTable('positions', (table) => {
            table.increments('id');
            table.string('post');
        })
    }
};

exports.down = function (knex) {
    return knex.schema.dropTable('positions');
};
