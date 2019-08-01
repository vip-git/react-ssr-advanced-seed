import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { authenticate } from 'passport';
import { PassportModule } from '@nestjs/passport';
import { ExpressSessionMiddleware } from '@nest-middlewares/express-session';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { GithubStrategy } from './github.strategy';

@Module({
	imports: [PassportModule],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, GithubStrategy]
})
export class AuthModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		ExpressSessionMiddleware.configure({
			secret: 'test'
		});
		consumer
			.apply(ExpressSessionMiddleware, authenticate('github'))
			.forRoutes('auth/github');
	}
}
