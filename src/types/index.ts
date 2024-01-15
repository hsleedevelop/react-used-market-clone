import { Message, User } from "@prisma/client";

export type TUserWithChat = User & {
  conversations: TConversation[]
}

export type TConversation = {
  id: string
  users: User[]
  messages: Message[]
}