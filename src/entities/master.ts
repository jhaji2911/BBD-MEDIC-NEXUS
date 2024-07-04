import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./common";


@Entity({ tableName: 'm_roles'})
export class RolesMaster extends BaseEntity {
  @Property({
    default: 'HR',
    nullable: true,
  })
  roleName!: string;

  constructor(data: Omit<RolesMaster, keyof BaseEntity>) {
    super();
    Object.assign(this, data);
  }
}
