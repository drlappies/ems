
exports.up = function (knex) {
    return knex.schema.dropTable('users');
};

exports.down = async function (knex) {
    const table = await knex.schema.hasTable('users');
    if (!table) {
        return knex.schema.createTable('users', table => {
            table.increments('id');
            table.enu('role', ['usual', 'admin']).notNullable();
            table.string('username').unique().notNullable();
            table.string('password').notNullable();
        })
    }
};
