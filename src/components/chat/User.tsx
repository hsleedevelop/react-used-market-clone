import { TConversation, TUserWithChat } from "@/types";
import React from "react";
import Avatar from "../Avatar";
import { fromNow } from "@/helpers/datetime";
interface IUserProps {
  user: TUserWithChat;
  currentUserId: string;
}
const User = ({ user, currentUserId }: IUserProps) => {
  const messageWithCurrentUser = user.conversations.find(
    (conversation: TConversation) =>
      conversation.users.find((user) => user.id === currentUserId)
  );

  const lastestMessage = messageWithCurrentUser?.messages.slice(-1)[0];

  return (
    <div className="grid grid-cols-[40px_1fr_50px] grid-rows-[40px] gap-3 py-3 px-4 border-b-[1px] hover:cursor-pointer hover:bg-orange-500">
      <div className="w-10 h-10 overflow-hidden bg-white rounded-full">
        <Avatar src={user.image || ""} />
      </div>
      <div>
        <h3 className="overflow-hidden text-base font-medium">{user.name}</h3>
        {lastestMessage && <p className="overflow-hidden text-xs font-medium text-gray-600 break-words whitespace-pre-wrap">{lastestMessage.text}</p>}
        {lastestMessage && lastestMessage.image && 
          <p >[이미지]</p>
        }
      </div>
      <div className="flex justify-end text-xs text-gray-500">
        {lastestMessage && (
          <p className="text-xs font-medium text-gray-600">
            {fromNow(lastestMessage.createdAt)}
          </p>
        )}
      </div>
    </div>
  );
};

export default User;
