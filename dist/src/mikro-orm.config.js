"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@mikro-orm/core");
const sql_highlighter_1 = require("@mikro-orm/sql-highlighter");
const postgresql_1 = require("@mikro-orm/postgresql");
// import { SeedManager } from '@mikro-orm/seeder';
const migrations_1 = require("@mikro-orm/migrations");
const node_fs_1 = require("node:fs");
const entities_1 = require("./entities");
const options = {};
if (process.env.NODE_ENV === 'production' &&
    (0, node_fs_1.existsSync)('./temp/metadata.json')) {
    options.metadataCache = {
        enabled: true,
        // temp/metadata.json can be generated via `npx mikro-orm cache:generate --combine`
        options: {
            data: JSON.parse((0, node_fs_1.readFileSync)('./temp/metadata.json', { encoding: 'utf8' }))
        }
    };
}
exports.default = (0, core_1.defineConfig)({
    driver: postgresql_1.PostgreSqlDriver,
    dbName: process.env.DB_NAME || 'postgres', // replace with your database name
    user: process.env.DB_USER || 'nishantjha', // replace with your database user
    password: process.env.DB_PASSWORD || 'ninja@123', // replace with your database password
    host: process.env.DB_HOST || 'localhost', // replace with your database host
    port: 5432, // replace with your database port
    // folder based discovery setup, using common filename suffix
    entities: // replace with your database port
    entities_1.entities,
    entitiesTs: ['src/**/*.entity.ts'],
    // enable debug mode to log SQL queries and discovery information
    debug: process.env.NODE_ENV !== 'production',
    // for vitest to get around `TypeError: Unknown file extension ".ts"` (ERR_UNKNOWN_FILE_EXTENSION)
    dynamicImportProvider: id => Promise.resolve(`${id}`).then(s => __importStar(require(s))),
    // for highlighting the SQL queries
    highlighter: new sql_highlighter_1.SqlHighlighter(),
    extensions: [migrations_1.Migrator],
    ...options
});
