/**
 * Base MikroORM entity for most other entities
 *
 */
import { PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidv4 } from 'uuid';
export class BaseEntity {
  @PrimaryKey()
  id?: string = uuidv4();

  @Property({ nullable: true, onCreate: () => new Date() })
  createdAt!: Date;

  @Property({
    nullable: true,
    onCreate: () => new Date(),
    onUpdate: () => new Date()
  })
  updatedAt!: Date;
}
