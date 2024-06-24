import { BaseEntity } from "./common";
import { User } from "./user";
export declare class Auth extends BaseEntity {
    user?: User | null;
    email: string;
    password: string;
    constructor(data: Omit<Auth, keyof BaseEntity>);
}
