import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "./common";
import { IsEmail, IsNotEmpty } from "class-validator";
import { User } from "./user";

@Entity({ tableName : "auth"})
export class Auth extends BaseEntity {
  @ManyToOne(() => User, {nullable: true, 
    // mapToPk: true,
     deleteRule: 'cascade'
  })
  user?: User | null = null;

  @Property({
    unique: true
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Property()
  @IsNotEmpty()
  password!: string;

  constructor(data: Omit<Auth, keyof BaseEntity>) {
    super();
    Object.assign(this, data);
  }
}