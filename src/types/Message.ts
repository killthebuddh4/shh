import { User } from "./User.js";

export type Message = {
  sender: User;
  text: string;
};
