const { hashPassword } = require('../utils/hashPassword');
const { generateAttendance, generateOvertime } = require('../seed/helper')

exports.seed = async function (knex) {
  await knex('reimbursement').del();
  await knex('deduction').del();
  await knex('bonus').del();
  await knex('payroll').del();
  await knex('allowance').del();
  await knex('allowance_employee').del();
  await knex('leave').del();
  await knex('attendance').del();
  await knex('positions').del();
  await knex('departments').del();
  await knex('overtime').del();
  await knex('employee').del();

  const employeeSeed = await knex.insert([{
    firstname: 'Tai Man',
    lastname: 'Chan',
    address: '47 Yung Shue Wan Main St Lamma Island',
    phone_number: '98244323',
    emergency_contact_person: 'Lili Lai',
    emergency_contact_number: '53423433',
    onboard_date: new Date().toISOString(),
    username: 'admin',
    password: await hashPassword('admin'),
    role: 'admin',
    start_hour: '09:00 AM',
    end_hour: '06:00 PM',
    salary_monthly: 22000.00,
    ot_pay_entitled: true,
    ot_hourly_salary: 80
  }, {
    firstname: 'Keung',
    lastname: 'Chan',
    address: 'Waldorf Gdn Coml Complex Tuen Mun',
    phone_number: '54394333',
    emergency_contact_person: 'Sam Chan',
    emergency_contact_number: '89134131',
    onboard_date: new Date().toISOString(),
    username: 'kc123',
    password: await hashPassword('kc123'),
    role: 'employee',
    start_hour: '09:00 AM',
    end_hour: '06:00 PM',
    salary_monthly: 18000.00
  }, {
    firstname: 'Lisa',
    lastname: 'Chan',
    address: 'Hung Hom',
    phone_number: '54134133',
    emergency_contact_person: 'Samuel Yau',
    emergency_contact_number: '8321221',
    onboard_date: new Date().toISOString(),
    username: 'lc123',
    password: await hashPassword('lc123'),
    role: 'employee',
    start_hour: '10:00 AM',
    end_hour: '09:00 PM',
    salary_monthly: 13000.00
  }]).into('employee').returning(['id']);

  const attendance = generateAttendance(365, employeeSeed[0].id)
  const attendanceSeed = await knex.insert(attendance).into('attendance')
  const overtime = generateOvertime(365, employeeSeed[0].id)
  const overtimeSeed = await knex.insert(overtime).into('overtime')
};
