
exports.up = function (knex) {
    const raw = `
    CREATE EXTENSION btree_gin;
    ALTER TABLE employee
    ADD COLUMN employee_index tsvector; 
    UPDATE employee
    SET employee_index = to_tsvector(firstname || ' ' || lastname);
    CREATE INDEX employee_index_gin
    ON employee
    USING GIN (employee_index);
    `

    return knex.schema.raw(raw)
};

exports.down = function (knex) {
    const raw = `
    DROP INDEX employee_index_gin;
    ALTER TABLE employee
    DROP COLUMN employee_index;
    DROP EXTENSION btree_gin;
    `

    return knex.schema.raw(raw)
};
