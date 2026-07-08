import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    await knex('employees').del();

    await knex('employees').insert([
        {
            name: 'Rahim Uddin',
            age: 28,
            designation: 'Software Engineer',
            hiring_date: '2024-01-15',
            date_of_birth: '1997-05-10',
            salary: 60000.00,
            photo_path: null
        },
        {
            name: 'Karim Ahmed',
            age: 32,
            designation: 'Senior QA Engineer',
            hiring_date: '2023-06-01',
            date_of_birth: '1993-08-22',
            salary: 75000.00,
            photo_path: null
        },
        {
            name: 'John Doe',
            age: 25,
            designation: 'Junior Developer',
            hiring_date: '2025-03-10',
            date_of_birth: '2001-11-05',
            salary: 40000.00,
            photo_path: null
        }
    ]);
}
