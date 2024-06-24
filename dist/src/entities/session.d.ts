import { BaseEntity } from "./common";
export declare class Session extends BaseEntity {
    user?: string | null;
    token: string;
    status: string;
    expiryDate: Date;
    constructor(data: Omit<Session, keyof BaseEntity>);
}
