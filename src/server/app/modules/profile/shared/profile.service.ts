// Library
import {
Injectable,
BadRequestException,
NotFoundException
} from '@nestjs/common';
import _ from 'lodash';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, Like, In, Any } from 'typeorm';

// Internal
import { ProfileModel, IProfile } from './profile.model';

@Injectable()
export class ProfileService {
private readonly profile: ProfileModel[] = [];

constructor(
@InjectRepository(ProfileModel)
private readonly profileRepository: Repository<ProfileModel>
    ) {}

    protected getId(paramId: any): number {
        const id = parseInt(paramId, 10);

        if (isNaN(id) || typeof id !== 'number') {
            throw new BadRequestException();
        }

        return id;
    }

    async create(profilePayload: IProfile): Promise<ProfileModel> {
        const profile = new ProfileModel();
        profile.githubUid = profilePayload.githubUid;
        profile.githubId = profilePayload.githubId;
        profile.lastTokenWeb = profilePayload.lastTokenWeb;
        profile.lastTokenMobile = profilePayload.lastTokenMobile;
        profile.name = profilePayload.name;
        profile.email = profilePayload.email;
        profile.avatarUrl = profilePayload.avatarUrl;
        profile.bio = profilePayload.bio;
        profile.location = profilePayload.location;
        profile.createdAt = profilePayload.createdAt;
        profile.updatedAt = profilePayload.updatedAt;
        
        // Check if user exists
        const doesUserExist  = await this.profileRepository.find({ githubId: profilePayload.githubId });
        let updatedUser = doesUserExist && doesUserExist.length && doesUserExist[0];
        if (doesUserExist && doesUserExist.length) {
            delete profilePayload.id;
            await this.update(doesUserExist[0].id, profilePayload);
            updatedUser = await this.findOneById(doesUserExist[0].id);
        }
        return (updatedUser) ? updatedUser : await this.profileRepository.save(profile);
    }

    async findAll(filters: any): Promise<ProfileModel[]> {
        const params: any = {
            where: {},
            cache: filters.cache || true,
            order: { id: 'ASC' },
        };

        if (filters.where) {
            params.where = { ...filters.where };
        }

        if (filters.not) {
            _.map(filters.not, (val, key) => {
                params['where'][key] = Not(val)
            })
        }

        if (filters.like) {
            _.map(filters.like, (val, key) => {
                params['where'][key] = Like(val)
            })
        }

        if (filters.in) {
            _.map(filters.in, (val, key) => {
                params['where'][key] = In(val)
            })
        }

        if (filters.any) {
            _.map(filters.any, (val, key) => {
                params['where'][key] = Any(val)
            })
        }

        if (filters.order) {
            params.order = { ...filters.order };
        }

        if (filters.skip) {
            params.skip = filters.skip;
        }

        if (filters.take) {
            params.take = filters.take;
        }
        return await this.profileRepository.find(params);
    }

    async findOneById(id: number): Promise<ProfileModel> {
        return await this.profileRepository.findOne(id, { cache: true });
    }

    async update(paramId: any, entity: IProfile): Promise<ProfileModel> {
        await this.profileRepository.update(paramId, entity);
        return await this.findOneById(paramId);
    }

    async updateToken(githubId: any, lastToken: string, newToken: string): Promise<boolean> {
        const doesUserExist = await this.profileRepository.find({ githubId, lastTokenWeb: lastToken });
        if (doesUserExist && doesUserExist.length && doesUserExist[0] && doesUserExist[0].id) {
            const updateUserPayload = {
                lastTokenWeb: newToken,
                updatedAt: new Date(),
            };
            await this.profileRepository.update(doesUserExist[0].id, updateUserPayload);
            return true;
        } else {
            return false;
        }
    }

    async delete(paramId: any): Promise<void> {
        const id = this.getId(paramId);
        try {
            await this.profileRepository.delete(id);
        } catch (err) {
            throw new NotFoundException();
        }
    }

    async createFirstProfile(): Promise<ProfileModel> {
        let profileObj: any = false;

        const doesProfileExist = await this.profileRepository.find({
            githubUid: 6302771,
        });

        const existingProfile = doesProfileExist && doesProfileExist.length && doesProfileExist[0];

        if (!existingProfile) {
            const profile: any = new ProfileModel();
            profile.githubUid = 6302771;
            profile.githubId = 'vip-git';
            profile.lastTokenWeb = '';
            profile.lastTokenMobile = '';
            profile.name = 'Vipin Tanna';
            profile.email = 'github@vipintanna.com';
            profile.avatarUrl = 'https://avatars2.githubusercontent.com/u/6302771?s=400&u=205fa1c8e1d155f00c4e284a798923bc838f4d86&v=4';
            profile.bio = 'Always curious to try!';
            profile.location = '';
            profile.createdAt = new Date();
            profile.updatedAt = new Date();
            profileObj = await this.profileRepository.save(profile);
        }

        return (existingProfile) ? existingProfile : profileObj;
    }
}