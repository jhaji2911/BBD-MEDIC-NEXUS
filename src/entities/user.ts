import { Entity, Property } from '@mikro-orm/core';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from './common';




@Entity({ tableName : "user"})
export class User extends BaseEntity {
  @Property()
  @IsNotEmpty()
  firstName!: string;
  
  @Property()
  @IsNotEmpty()
  lastName!: string;

  // @ManyToOne(() => RolesMaster, {nullable: true}) we will reference this in future
  @Property({
    nullable: true,
    default: 'HR'
  })
  role!: string;


  constructor(data: Omit<User, keyof BaseEntity>) {
    super();
    Object.assign(this, data);
  }
}

