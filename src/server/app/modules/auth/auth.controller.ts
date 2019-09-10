// Library
import { Controller, Get, Req, Res } from '@nestjs/common';

// Models
import { IProfile } from '../profile/shared/profile.model';
import { IGroupMember } from '../group-member/shared/group-member.model';

// Services
import { AuthService } from './auth.service';
import { ProfileService } from '../profile/shared/profile.service';
import { GroupMemberService } from '../group-member/shared/group-member.service';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly profileService: ProfileService, 
		private readonly groupMemberService: GroupMemberService,
	) {}

	@Get('callback')
	async createToken(@Req() request, @Res() response): Promise<any> {
		const { code, state } = request.query;
		const tokenObj: any = await this.authService.createToken(code, state);
		const { id, login, avatar_url, name, bio, email, location } = tokenObj.userInfo;
		const createUserPayload: IProfile = {
			id,
			githubUid: id,
			githubId: login,
			lastTokenWeb: tokenObj.accessToken,
			lastTokenMobile: tokenObj.accessToken,
			name: name || '',
			email: email || '',
			avatarUrl: avatar_url || '',
			bio: bio || '',
			location: location || '',
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const userProfile = await this.profileService.create(createUserPayload);
		const groupMemberPayload: IGroupMember = {
			memberId: userProfile.id,
			groupId: 2,
			date: new Date(),
		};
		await this.groupMemberService.create(groupMemberPayload);
		return response.redirect(303, `${process.env.FRONT_END_HOST}/?accessToken=${tokenObj.accessToken}&idToken=${tokenObj.idToken}`);
	}

	@Get('refresh')
	async refreshToken(@Req() request): Promise<any> {
		const { lastToken, githubId } = request.query;
		const newToken = await this.authService.refreshToken(githubId);
		/**
		 * Todo: come up with a better way to not expose access tokens
		 */
		const canUpdateToken =  true; // await this.profileService.updateToken(githubId, lastToken, newToken.accessToken);
		return (canUpdateToken || process.env.NODE_ENV === 'development') ? newToken : {
			accessToken: lastToken,
			expiresIn: 5
		};
	}
}
