import { Entity, Property } from '@mikro-orm/core';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity } from './common';




@Entity({ tableName : "user"})
export class User extends BaseEntity {

  @Property({ nullable: true})
  suffix?: string | null;


  @Property()
  email: string;

  @Property({nullable: true})
  image?: string | null;

  @Property({nullable: true})
  phone?: string | null;

  @Property()
  @IsNotEmpty()
  firstName!: string;
  
  @Property()
  @IsNotEmpty()
  lastName!: string;

  @Property({
    unique: true
  })
  SSN!: string;

  @Property({ type: 'date'})
  dateOfBirth!: string;


  constructor(data: Omit<User, keyof BaseEntity>) {
    super();
    Object.assign(this, data);
  }
}

