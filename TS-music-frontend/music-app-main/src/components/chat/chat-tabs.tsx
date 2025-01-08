import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import ListChat from "./list";
import { chatService } from "@/services/chatService";
import { useDispatch, useSelector } from "react-redux";
import { updateChatUsers } from "@/redux/features/chat/chatSlice";
import { RootState } from "@/redux/store";

export interface IChatUser {
  id: number;
  avatar: string;
  userName: string;
  latestMessage: string;
  unreadCount: number;
}

export function ChatTabs() {
  const [activeTab, setActiveTab] = React.useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const chatUsers = useSelector((state: RootState) => state.chat.chatUsers);

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        setLoading(true);
        const users = await chatService.getChatUsers();
        dispatch(updateChatUsers(users));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load chats");
      } finally {
        setLoading(false);
      }
    };

    fetchChatUsers();
  }, [dispatch]);

  const data = [
    {
      label: `All (${chatUsers.length})`,
      value: "all",
      desc: <ListChat listChat={chatUsers} loading={loading} error={error} />,
    },
    {
      label: "Inquiries (0)",
      value: "inquiries",
      desc: <ListChat listChat={[]} loading={loading} error={error} />,
    },
  ];

  return (
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0 w-[24rem] max-w-[24rem]"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-gray-900" : ""}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel
            key={value}
            value={value}
            className="w-[24rem] max-w-[24rem] p-0"
          >
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
