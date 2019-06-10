// Library
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsInt } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export interface ICat {
  readonly id: number;
  readonly name: string;
  readonly age: number;
  readonly breed: string;
}

@Entity("cat")
export class CatModel implements ICat {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  @IsInt()
  id: number;

  @Column({ length: 500 })
  @ApiModelProperty()
  @IsString()
  name: string;

  @Column('int')
  @ApiModelProperty()
  @IsInt()
  age: number;

  @Column('text')
  @ApiModelProperty({ type: String })
  @IsString()
  breed: string;
}
