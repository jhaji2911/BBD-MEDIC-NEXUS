
/**
 * Exports all the Mikro-ORM entities
 *
 *
 */

import { BaseEntity } from './common';
import { User } from './user';
import { Auth } from './auth';
import { RolesMaster } from './master';
import { Session } from './session';
import {Demographics} from './demographics'

export { BaseEntity, User, Auth, RolesMaster,Session, Demographics };
// add more
export const entities = [BaseEntity, User, Auth, Session, RolesMaster, Demographics];
