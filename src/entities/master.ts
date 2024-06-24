import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "./common";

@Entity({ tableName: 'm_questionnaire'})
export class QuestionnaireMaster extends BaseEntity {
  @Property()
  questionText!: string;

  @Property({ columnType :'json'})
  answerText!: string;

  constructor(data: Omit<QuestionnaireMaster, keyof BaseEntity>) {
    super();
    Object.assign(this, data);
  }
}

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
