
export type TUser = {
  _id: string;
  fullName: string;
  email: string;
  avatar: string;
  role: "USER" | "ADMIN";
};