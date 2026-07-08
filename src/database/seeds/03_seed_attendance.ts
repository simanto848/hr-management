import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Clean up existing attendance logs
    await knex('attendance').del();

    // Fetch the recently seeded employees
    const employees = await knex('employees').select('id', 'name');

    const rahim = employees.find((emp) => emp.name.includes('Rahim'));
    const karim = employees.find((emp) => emp.name.includes('Karim'));
    const john = employees.find((emp) => emp.name.includes('John'));

    // Insert attendance entries for August 2025
    if (rahim && karim && john) {
        await knex('attendance').insert([
            // Rahim: 3 present, 1 late (09:50:00)
            { employee_id: rahim.id, date: '2025-08-01', check_in_time: '09:30:00' },
            { employee_id: rahim.id, date: '2025-08-04', check_in_time: '09:50:00' },
            { employee_id: rahim.id, date: '2025-08-05', check_in_time: '09:40:00' },

            // Karim: 3 present, 2 late (10:00:00, 09:55:00)
            { employee_id: karim.id, date: '2025-08-01', check_in_time: '10:00:00' },
            { employee_id: karim.id, date: '2025-08-04', check_in_time: '09:15:00' },
            { employee_id: karim.id, date: '2025-08-05', check_in_time: '09:55:00' },

            // John: 2 present, 0 late
            { employee_id: john.id, date: '2025-08-01', check_in_time: '09:20:00' },
            { employee_id: john.id, date: '2025-08-04', check_in_time: '09:45:00' }
        ]);
    }
}
