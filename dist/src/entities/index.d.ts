/**
 * Exports all the Mikro-ORM entities
 *
 *
 */
import { BaseEntity } from './common';
import { User } from './user';
import { Auth } from './auth';
import { QuestionnaireMaster, RolesMaster } from './master';
import { Session } from './session';
export { BaseEntity, User, Auth, QuestionnaireMaster, RolesMaster, Session };
export declare const entities: (typeof BaseEntity | typeof User | typeof Auth | typeof QuestionnaireMaster | typeof RolesMaster | typeof Session)[];
