// Library
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export interface IGroupMembers {
    id: number;
    memberId: number;
    groupdId: number;
    date: Date;
}

@Entity('groupMembers')
export class GroupModel implements IGroupMembers {
    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    @IsInt()
    id: number;

    @Column('int')
    @ApiModelProperty()
    @IsInt()
    memberId: number;

    @Column('int')
    @ApiModelProperty()
    @IsInt()
    groupdId: number;

    @Column('text')
    @ApiModelProperty({ type: Date })
    @IsString()
    date: Date;
}
