exports.up = function (knex) {
    return knex.schema.table('payroll', table => {
        table.boolean('is_reimbursement_calculated').notNullable().defaultTo(false)
        table.boolean('is_allowance_calculated').notNullable().defaultTo(false)
        table.boolean('is_deduction_calculated').notNullable().defaultTo(false)
        table.boolean('is_bonus_calculated').notNullable().defaultTo(false)
        table.boolean('is_overtime_calculated').notNullable().defaultTo(false)
        table.boolean('is_leave_calculated').notNullable().defaultTo(false)
    })
};

exports.down = function (knex) {
    return knex.schema.alterTable('payroll', table => {
        table.dropColumn('is_reimbursement_calculated')
        table.dropColumn('is_allowance_calculated')
        table.dropColumn('is_deduction_calculated')
        table.dropColumn('is_bonus_calculated')
        table.dropColumn('is_overtime_calculated')
        table.dropColumn('is_leave_calculated')
    })
};
