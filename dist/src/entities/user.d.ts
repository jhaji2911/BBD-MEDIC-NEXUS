import { BaseEntity } from './common';
export declare class User extends BaseEntity {
    firstName: string;
    lastName: string;
    role: string;
    constructor(data: Omit<User, keyof BaseEntity>);
}
