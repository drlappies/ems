
exports.up = function (knex) {
    const first = () => {
        return knex.schema.table('allowance', table => {
            table.boolean('minimum_attendance_required').defaultTo('false')
            table.decimal('required_attendance_rate', 5, 2)
        })
    }

    const raw =
        `
        ALTER TABLE allowance
        ADD CONSTRAINT rate_is_lower_than_hundred
        CHECK (required_attendance_rate <= 100)
        `

    const next = () => {
        return knex.schema.raw(raw)
    }

    return first().then(next)
};

exports.down = function (knex) {
    const raw =
        `
    ALTER TABLE allowance
    DROP CONSTRAINT rate_is_lower_than_hundred
    `

    const first = () => {
        return knex.schema.raw(raw)
    }

    const next = () => {
        return knex.schema.alterTable('allowance', table => {
            table.dropColumn('minimum_attendance_required')
            table.dropColumn('required_attendance_rate')
        })
    }

    return first().then(next)
};
