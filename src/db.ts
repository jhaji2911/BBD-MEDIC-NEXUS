/* eslint-disable no-console */
// eslint-disable-next-line prettier/prettier
import { MikroORM, EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { User, Auth, QuestionnaireMaster, RolesMaster, Session,  } from './entities';
import config from './mikro-orm.config';

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  users: EntityRepository<User>;
  auth: EntityRepository<Auth>;
  session: EntityRepository<Session>;
  m_questionnaire: EntityRepository<QuestionnaireMaster>;
  m_roles: EntityRepository<RolesMaster>;

}

let cache: Services | null = null;

export default async function initORM(): Promise<Services> {
  console.log('first block of INIT 🌒');
  if (cache !== null) {
    console.log('Cache Found 🌝');
    // If cache is not null, return the cached services
    return cache;
  }

  console.log('Initializing ORM...');

  // Allow overriding config options for testing
  const orm = await MikroORM.init({
    ...config
  });
  console.log('initialized ORM 🌓');
  const generator = orm.getSchemaGenerator();

  console.log('Generating schema 🌖');

  // Check if the tables exist before creating the schema
  // using updateSchema instead of createSchema because we want to update the existing tables if they exist and not throw an error when trying to recreate them.
  await generator.updateSchema({ wrap: false });

  console.log('schema generated! 🥰');
  // Save to cache before returning
  cache = {
    orm,
    em: orm.em,
    users: orm.em.getRepository(User),
    auth: orm.em.getRepository(Auth),
    session: orm.em.getRepository(Session),
    m_questionnaire: orm.em.getRepository(QuestionnaireMaster),
    m_roles: orm.em.getRepository(RolesMaster)
  };

  console.log('Nice and Cool ✨');

  return cache;
}
