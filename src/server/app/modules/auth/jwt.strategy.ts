import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';

import { JWT_SECRET } from './config';

const cookieExtractor = function (req) {
	var token = null;
	if (req && req.cookies) {
		token = req.cookies['accessToken'];
	}
	return token;
};
/**
 * ExtractJwt.fromExtractors([
		cookieExtractor,
	])
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: JWT_SECRET
		});
	}

	async validate(payload: JwtPayload, done: Function) {
		const user = await this.authService.validateUser(payload);
		if (!user) {
			return done(new UnauthorizedException(), false);
		}
		done(null, user);
	}
}
