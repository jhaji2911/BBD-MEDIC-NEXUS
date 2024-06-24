import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { IsEnum } from "class-validator";
import { User } from "./user";
import { BaseEntity } from "./common";

@Entity({ tableName : 'session'})
export class Session extends BaseEntity {
  @ManyToOne(() => User, {nullable: true, 
    // mapToPk: true,
    deleteRule: 'cascade'})
  user?: string | null = null;

  @Property({ columnType: "text"})
  token!: string;

  @Property({ default: 'Active'})
  @IsEnum(['Active', 'Inactive'])
  status!: string;

  @Property()
  expiryDate!: Date;

  constructor(data: Omit<Session, keyof BaseEntity>) {
    super();
    Object.assign(this, data);
  }
}