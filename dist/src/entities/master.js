"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesMaster = exports.QuestionnaireMaster = void 0;
const core_1 = require("@mikro-orm/core");
const common_1 = require("./common");
let QuestionnaireMaster = class QuestionnaireMaster extends common_1.BaseEntity {
    questionText;
    answerText;
    constructor(data) {
        super();
        Object.assign(this, data);
    }
};
exports.QuestionnaireMaster = QuestionnaireMaster;
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], QuestionnaireMaster.prototype, "questionText", void 0);
__decorate([
    (0, core_1.Property)({ columnType: 'json' }),
    __metadata("design:type", String)
], QuestionnaireMaster.prototype, "answerText", void 0);
exports.QuestionnaireMaster = QuestionnaireMaster = __decorate([
    (0, core_1.Entity)({ tableName: 'm_questionnaire' }),
    __metadata("design:paramtypes", [Object])
], QuestionnaireMaster);
let RolesMaster = class RolesMaster extends common_1.BaseEntity {
    roleName;
    constructor(data) {
        super();
        Object.assign(this, data);
    }
};
exports.RolesMaster = RolesMaster;
__decorate([
    (0, core_1.Property)({
        default: 'HR',
        nullable: true,
    }),
    __metadata("design:type", String)
], RolesMaster.prototype, "roleName", void 0);
exports.RolesMaster = RolesMaster = __decorate([
    (0, core_1.Entity)({ tableName: 'm_roles' }),
    __metadata("design:paramtypes", [Object])
], RolesMaster);
