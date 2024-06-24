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
exports.Session = void 0;
const core_1 = require("@mikro-orm/core");
const class_validator_1 = require("class-validator");
const user_1 = require("./user");
const common_1 = require("./common");
let Session = class Session extends common_1.BaseEntity {
    user = null;
    token;
    status;
    expiryDate;
    constructor(data) {
        super();
        Object.assign(this, data);
    }
};
exports.Session = Session;
__decorate([
    (0, core_1.ManyToOne)(() => user_1.User, { nullable: true,
        // mapToPk: true,
        deleteRule: 'cascade' }),
    __metadata("design:type", String)
], Session.prototype, "user", void 0);
__decorate([
    (0, core_1.Property)({ columnType: "text" }),
    __metadata("design:type", String)
], Session.prototype, "token", void 0);
__decorate([
    (0, core_1.Property)({ default: 'Active' }),
    (0, class_validator_1.IsEnum)(['Active', 'Inactive']),
    __metadata("design:type", String)
], Session.prototype, "status", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], Session.prototype, "expiryDate", void 0);
exports.Session = Session = __decorate([
    (0, core_1.Entity)({ tableName: 'session' }),
    __metadata("design:paramtypes", [Object])
], Session);
