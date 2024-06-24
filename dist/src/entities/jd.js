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
exports.JobDescription = void 0;
const core_1 = require("@mikro-orm/core");
const user_1 = require("./user");
const common_1 = require("./common");
let JobDescription = class JobDescription extends common_1.BaseEntity {
    title;
    description;
    positionsOpen;
    location;
    resumeFolderPath;
    fileData;
    fileText;
    fileName;
    experienceRequired;
    jobDescriptionData;
    postedByUser;
    constructor(data) {
        super();
        Object.assign(this, data);
    }
};
exports.JobDescription = JobDescription;
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], JobDescription.prototype, "title", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], JobDescription.prototype, "description", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Number)
], JobDescription.prototype, "positionsOpen", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], JobDescription.prototype, "location", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], JobDescription.prototype, "resumeFolderPath", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true, columnType: "text" }),
    __metadata("design:type", String)
], JobDescription.prototype, "fileData", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true, columnType: "text" }),
    __metadata("design:type", String)
], JobDescription.prototype, "fileText", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], JobDescription.prototype, "fileName", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", String)
], JobDescription.prototype, "experienceRequired", void 0);
__decorate([
    (0, core_1.Property)({ type: "json", nullable: true }),
    __metadata("design:type", Object)
], JobDescription.prototype, "jobDescriptionData", void 0);
__decorate([
    (0, core_1.ManyToOne)(() => user_1.User, {
        // mapToPk: true, 
        deleteRule: 'cascade'
    }),
    __metadata("design:type", user_1.User)
], JobDescription.prototype, "postedByUser", void 0);
exports.JobDescription = JobDescription = __decorate([
    (0, core_1.Entity)({ tableName: "job_description" }),
    __metadata("design:paramtypes", [Object])
], JobDescription);
