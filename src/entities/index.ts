
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
import {Demographics} from './demographics'

export { BaseEntity, User, Auth, QuestionnaireMaster, RolesMaster,Session, Demographics };
// add more
export const entities = [BaseEntity, User, Auth, Session, QuestionnaireMaster, RolesMaster, Demographics];
