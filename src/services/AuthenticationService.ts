import db from "../database/db";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { HrUser } from "../types/HrUser";

export class AuthenticationService {
    public async login(email: string, password: string): Promise<string> {
        const isUserExists = await db<HrUser>('hr_users').where({
            email
        }).first();
        if (!isUserExists) {
            throw new Error("Invalid email or password!");
        }

        const isPasswordMatched = await bcrypt.compare(password, isUserExists.password_hash);
        if (!isPasswordMatched) {
            throw new Error("Invalid email or password!");
        }

        const jwtSecret = process.env.JWT_SECRET as string || 'super_secret_hr_jwt_key_12345';
        const jwtExpiresIn = process.env.JWT_EXPIRES_IN as any || '1d';

        const payload = {
            id: isUserExists.id,
            email: isUserExists.email,
            name: isUserExists.name,
        };

        const token = jwt.sign(payload, jwtSecret, {
            expiresIn: jwtExpiresIn,
        });

        return token;
    }
}