import { Controller, Get, Req, Param, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
