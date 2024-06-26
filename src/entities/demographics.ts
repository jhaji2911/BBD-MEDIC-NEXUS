import { Entity, OneToOne, Property } from "@mikro-orm/core";
import { User } from "./user";
import { BaseEntity } from "./common";

@Entity({ tableName : 'user_address'})
export class Demographics extends BaseEntity {
  
    @OneToOne(() => User)
    user!: User;

    @Property({ columnType: "text"})
    homeAddress: string;

    @Property({ columnType: "text"})
    city!: string;

    @Property({ columnType: "text"})
    state!: string;

    @Property({ columnType: "text"})
    zipCode!: string;

    @Property({ columnType: "text"})
    country?: string;

  constructor(data: Omit<Demographics, keyof BaseEntity>) {
    super();
    Object.assign(this, data);
  }
}