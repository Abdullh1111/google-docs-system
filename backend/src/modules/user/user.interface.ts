export type TUser = {
  fullName: string;
  email: string;
  password: string;
  avatar: string;
  role: "USER" | "ADMIN";
};
