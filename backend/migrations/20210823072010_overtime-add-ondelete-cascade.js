
exports.up = function (knex) {
    const dropConstraint = () => {
        return knex.schema.alterTable('overtime', table => {
            table.dropForeign('employee_id')
        })
    }

    const addOnDelete = () => {
        return knex.schema.table('overtime', table => {
            table.foreign('employee_id').references('employee.id').onDelete('CASCADE')
        })
    }

    return dropConstraint().then(addOnDelete)
};

exports.down = function (knex) {
    const dropConstraint = () => {
        return knex.schema.alterTable('overtime', table => {
            table.dropForeign('employee_id')
        })
    }

    const removeOnDelete = () => {
        return knex.schema.table('overtime', table => {
            table.foreign('employee_id').references('employee.id')
        })
    }

    return dropConstraint().then(removeOnDelete)
};
