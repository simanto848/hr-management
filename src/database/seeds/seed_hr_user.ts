import { Knex } from 'knex';
import bcrypt from 'bcryptjs';

export async function seed(knex: Knex): Promise<void> {
    await knex('hr_users').del();

    const passwordHash = await bcrypt.hash('12345678', 10);
    await knex('hr_users').insert([
        {
            email: 'hr@gmail.com',
            password_hash: passwordHash,
            name: 'Jane Doe',
        }
    ]).returning('*');
}
