import { Strategy } from 'passport-github';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

// Config
import { GITHUB_CONFIG } from './config';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			...GITHUB_CONFIG
		});
	}

	async validate(payload: any) {
		return { userId: payload.sub, username: payload.username };
	}
}
