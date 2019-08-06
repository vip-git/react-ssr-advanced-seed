import { Controller, Get, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('callback')
	async createToken(@Req() request, @Res() response): Promise<any> {
		const { code, state } = request.query;
		const tokenObj = await this.authService.createToken(code, state);
		return response.redirect(303, `${process.env.FRONT_END_HOST}/?accessToken=${tokenObj.accessToken}`);
	}
}
