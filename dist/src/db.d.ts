import { MikroORM, EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { User, Auth, QuestionnaireMaster, RolesMaster, Session } from './entities';
export interface Services {
    orm: MikroORM;
    em: EntityManager;
    users: EntityRepository<User>;
    auth: EntityRepository<Auth>;
    session: EntityRepository<Session>;
    m_questionnaire: EntityRepository<QuestionnaireMaster>;
    m_roles: EntityRepository<RolesMaster>;
}
export default function initORM(): Promise<Services>;
