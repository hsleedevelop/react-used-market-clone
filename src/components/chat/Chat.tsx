"use client";

import { TConversation, TUserWithChat } from "@/types";
import React, { useEffect, useRef } from "react";
import Input from "./Input";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
interface IChatProps {
  currentUser: TUserWithChat;
  setLayout: (layout: boolean) => void;
  receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  };
}
const Chat = ({ currentUser, setLayout, receiver }: IChatProps) => {
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [receiver, currentUser]);

  if (!receiver.receiverName || !currentUser)
    return <div className="w-full h-full">no chats</div>;

  const conversation: TConversation | undefined =
    currentUser.conversations.find((conversation) =>
      conversation.users.find((user) => user.id === receiver.receiverId)
    );

  return (
    <div className="w-full">
      <div>
        <ChatHeader
          setLayout={setLayout}
          receiverName={receiver.receiverName}
          receiverImage={receiver.receiverImage}
          lastMessageTime={
            conversation?.messages
              .filter((message) => message.receiverId === currentUser.id)
              .slice(-1)[0]?.createdAt
          }
        />
      </div>
      <div className="flex flex-col gap-8 p-10 overflow-auto h-[calc(100vh-60px-70px-80px)]">
        {conversation &&
          conversation.messages.map((message) => {
            return (
              <Message
                key={message.id}
                isSender={message.senderId === currentUser.id}
                messageText={message.text}
                messageImage={message.image}
                receiverName={receiver.receiverName}
                receiverImage={receiver.receiverImage}
                senderImage={currentUser.image}
                time={message.createdAt}
              />
            );
          })}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center p-3">
        <Input
          receiverId={receiver.receiverId}
          currentUserId={currentUser.id}
        />
      </div>
    </div>
  );
};

export default Chat;
