import { Types } from "mongoose";

interface SharedWith {
  [email: string]: "viewer" | "editor" | string;
}
export type TDocument = {
    title: string;
    content: string;
    userId: Types.ObjectId;
    sharedWith: SharedWith;
    createdAt: Date;
    updatedAt: Date;
};