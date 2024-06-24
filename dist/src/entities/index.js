"use strict";
/**
 * Exports all the Mikro-ORM entities
 *
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.entities = exports.Session = exports.RolesMaster = exports.QuestionnaireMaster = exports.Auth = exports.User = exports.BaseEntity = void 0;
const common_1 = require("./common");
Object.defineProperty(exports, "BaseEntity", { enumerable: true, get: function () { return common_1.BaseEntity; } });
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const auth_1 = require("./auth");
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return auth_1.Auth; } });
const master_1 = require("./master");
Object.defineProperty(exports, "QuestionnaireMaster", { enumerable: true, get: function () { return master_1.QuestionnaireMaster; } });
Object.defineProperty(exports, "RolesMaster", { enumerable: true, get: function () { return master_1.RolesMaster; } });
const session_1 = require("./session");
Object.defineProperty(exports, "Session", { enumerable: true, get: function () { return session_1.Session; } });
// add more
exports.entities = [common_1.BaseEntity, user_1.User, auth_1.Auth, session_1.Session, master_1.QuestionnaireMaster, master_1.RolesMaster];
