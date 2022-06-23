import utils from '../utils/index.util'

export async function seed(knex) {
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

  const generateAttendance = (timespan, employee_id) => {
    const time = new Date();
    time.setMonth(0)
    time.setDate(1);

    const attendance = [];
    for (let i = 0; i < timespan; i++) {
      if (time.getDay() === 6 || time.getDay() === 0) {
        time.setDate(time.getDate() + 1)
        continue;
      }

      let obj = {
        employee_id: employee_id,
        status: "on_time",
        check_in: "09:00 AM",
        check_out: "6:00 PM",
        date: new Date(time)
      }

      time.setDate(time.getDate() + 1)
      attendance.push(obj)
    }

    return attendance;
  }

  const employeeSeed = await knex.insert([
    {
      firstname: 'root',
      lastname: 'root',
      address: "address",
      phone_number: '12345678',
      emergency_contact_person: 'Person',
      emergency_contact_number: '87654321',
      onboard_date: new Date().toISOString(),
      username: 'root',
      password: await utils.password.hashPassword('root'),
      role: 'admin',
      start_hour: '09:00 AM',
      end_hour: '06:00 PM',
      salary_monthly: 22000.00,
      ot_pay_entitled: true,
      ot_hourly_salary: 80
    }, {
      firstname: 'Tai Man',
      lastname: 'Chan',
      address: '47 Yung Shue Wan Main St Lamma Island',
      phone_number: '98244323',
      emergency_contact_person: 'Lili Lai',
      emergency_contact_number: '53423433',
      onboard_date: new Date().toISOString(),
      username: 'user1',
      password: await utils.password.hashPassword('user1'),
      role: 'employee',
      start_hour: '09:00 AM',
      end_hour: '06:00 PM',
      salary_monthly: 22000.00,
      ot_pay_entitled: true,
      ot_hourly_salary: 80
    }]).into('employee').returning(['id']);

  await knex('departments').insert([
    { name: "Human Resources", description: "Plan, coordinate, and direct the administrative functions of an organization." },
    { name: "Marketing Promotion", description: "Market research, analysis, and understanding your ideal customer's interests." },
    { name: "Customer Service Support", description: "Providing support to both prospective and existing customers." },
    { name: "Sales", description: "Ensure current customers have the right products and services, identify new markets and customer leads, and pitch prospective customers." },
    { name: "Accounting and Finance", description: "Auditing and analysing financial performance." },
    { name: "Distribution", description: "Spread the product throughout the marketplace such that a large number of people can buy it." },
    { name: "Research and Development", description: "Researching your market and your customer needs and developing new and improved products and services to fit these needs." },
    { name: "Administrative and Management", description: "Provides office support to either an individual or team and is vital for the smooth-running of a business." },
    { name: "Production", description: "Planning and organising production schedules" },
    { name: "Operation", description: "Managing the inner workings of your business so it runs as efficiently as possible." },
    { name: "Information Technology Support", description: "Maintains the computer networks of all types of organisations, providing technical support and ensuring the whole company runs smoothly." },
    { name: "Purchasing", description: "Ensures the supply of goods, production materials and equipment so that a smooth production and sales process can take place." },
    { name: "Legal Department", description: "Provides legal consultation and advice as well as reviewing the rules, contracts and agreements generated by other departments." },
    { name: "Public Relations", description: "Responsible for managing the reputation of a company." },
    { name: "Logistics", description: "Plan, implement, and control the movement and storage of goods, services, or information within a supply chain and between the points of origin and consumption." },
    { name: "Security", description: "Guards patrol and monitor activity at a location or property." }
  ])

  await knex('positions').insert([
    { post: "Web Developer" },
    { post: "Full Stack Web Developer" },
    { post: "Software Engineer" },
    { post: "Senior Software Engineer" },
    { post: "CTO" },
    { post: "CEO" },
    { post: "Customer Representative" },
    { post: "IT Support" },
    { post: "Accountant" },
    { post: "Business Analytics" },
    { post: "Project Manager" },
    { post: "General Manager" },
    { post: "Customer Service" },
    { post: "Accounting Clerk" },
    { post: "UI designer" },
    { post: "UX researcher" }
  ])

  const attendance = generateAttendance(365, employeeSeed[1].id)
  await knex.insert(attendance).into('attendance')
}
