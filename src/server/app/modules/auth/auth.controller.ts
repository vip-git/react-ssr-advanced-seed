import { Controller, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('callback')
	async createToken(@Req() request): Promise<any> {
		const { code, state } = request.query;
		return await this.authService.createToken(code, state);
	}
}
