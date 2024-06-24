"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = initORM;
/* eslint-disable no-console */
// eslint-disable-next-line prettier/prettier
const postgresql_1 = require("@mikro-orm/postgresql");
const entities_1 = require("./entities");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
let cache = null;
async function initORM() {
    console.log('first block of INIT 🌒');
    if (cache !== null) {
        console.log('Cache Found 🌝');
        // If cache is not null, return the cached services
        return cache;
    }
    console.log('Initializing ORM...');
    // Allow overriding config options for testing
    const orm = await postgresql_1.MikroORM.init({
        ...mikro_orm_config_1.default
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
        users: orm.em.getRepository(entities_1.User),
        auth: orm.em.getRepository(entities_1.Auth),
        session: orm.em.getRepository(entities_1.Session),
        m_questionnaire: orm.em.getRepository(entities_1.QuestionnaireMaster),
        m_roles: orm.em.getRepository(entities_1.RolesMaster)
    };
    console.log('Nice and Cool ✨');
    return cache;
}
