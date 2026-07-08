import { Request, Response } from 'express';
import { AuthenticationService } from '../services/AuthenticationService';
import { ApiResponser } from '../utils/ApiResponser';

export class AuthenticationController {
    private authService: AuthenticationService;

    constructor() {
        this.authService = new AuthenticationService();
    }

    public login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body;
            const token = await this.authService.login(email, password);
            return ApiResponser.success(res, 'Login successful', { token }, 200);
        } catch (error: any) {
            return ApiResponser.error(res, error.message || 'Authentication failed', [], 400);
        }
    };
}
