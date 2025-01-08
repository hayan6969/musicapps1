"use client";

import SidebarChat from "@/components/chat/sidebar-chat";
import ChatRoom from "@/components/chat/chat-room";
import ChatInput from "@/components/chat/chat-input";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Page() {
  const selectedChatId = useSelector((state: RootState) => state.chat.chatId);

  return (
    <div className="flex h-screen">
      {/* Left Sidebar */}
      <div className="w-[24rem] border-r border-gray-200">
        <SidebarChat />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChatId ? (
          <>
            <ChatRoom />
            <ChatInput />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a chat to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
