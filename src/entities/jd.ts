import { Entity, Property, ManyToOne } from "@mikro-orm/core";
import { User } from "./user";
import { BaseEntity } from "./common";

@Entity({ tableName: "job_description" })
export class JobDescription extends BaseEntity {
  @Property()
  title!: string;

  @Property({ nullable: true })
  description!: string;

  @Property()
  positionsOpen?: number;

  @Property()
  location!: string;

  @Property({nullable: true })
  resumeFolderPath?: string;

  @Property({ nullable: true, columnType: "text" })
  fileData?: string;

  @Property({ nullable: true, columnType: "text" })
  fileText?: string;

  @Property({ nullable: true })
  fileName?: string;

  @Property({nullable: true})
  experienceRequired!: string;

  @Property({ type: "json", nullable: true })
  jobDescriptionData?: Record<string, any>;

  @ManyToOne(() => User, { 
    // mapToPk: true, 
    deleteRule: 'cascade'})
  postedByUser!: User;

  constructor(data: Omit<JobDescription, keyof BaseEntity>) {
    super();
    Object.assign(this, data);
  }
}
