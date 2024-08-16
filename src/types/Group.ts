import { User } from "./User.js";
import { Message } from "./Message.js";

export type Group = {
  owner: User;
  members: User[];
  messages: Message[];
};
