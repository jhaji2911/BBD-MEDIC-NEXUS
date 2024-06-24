import { BaseEntity } from "./common";
export declare class QuestionnaireMaster extends BaseEntity {
    questionText: string;
    answerText: string;
    constructor(data: Omit<QuestionnaireMaster, keyof BaseEntity>);
}
export declare class RolesMaster extends BaseEntity {
    roleName: string;
    constructor(data: Omit<RolesMaster, keyof BaseEntity>);
}
