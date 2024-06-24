import { User } from "./user";
import { BaseEntity } from "./common";
export declare class JobDescription extends BaseEntity {
    title: string;
    description: string;
    positionsOpen?: number;
    location: string;
    resumeFolderPath?: string;
    fileData?: string;
    fileText?: string;
    fileName?: string;
    experienceRequired: string;
    jobDescriptionData?: Record<string, any>;
    postedByUser: User;
    constructor(data: Omit<JobDescription, keyof BaseEntity>);
}
