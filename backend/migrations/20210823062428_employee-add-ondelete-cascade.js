
exports.up = function (knex) {
    const dropConstraint = () => {
        return knex.schema.alterTable('employee', table => {
            table.dropForeign('dept_id')
            table.dropForeign('post_id')
        })
    }

    const addOnDelete = () => {
        return knex.schema.table('employee', table => {
            table.foreign('dept_id').references('departments.id').onDelete('CASCADE');
            table.foreign('post_id').references('positions.id').onDelete('CASCADE');
        })
    }

    return dropConstraint().then(addOnDelete)
};

exports.down = function (knex) {
    const dropConstraint = () => {
        return knex.schema.alterTable('employee', table => {
            table.dropForeign('dept_id')
            table.dropForeign('post_id')
        })
    }

    const removeOnDelete = () => {
        return knex.schema.table('employee', table => {
            table.foreign('dept_id').references('departments.id');
            table.foreign('post_id').references('positions.id');
        })
    }

    return dropConstraint().then(removeOnDelete)
};
