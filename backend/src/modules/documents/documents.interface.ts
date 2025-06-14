import { Types } from "mongoose";

export type TDocument = {
    title: string;
    content: string;
    userId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
};