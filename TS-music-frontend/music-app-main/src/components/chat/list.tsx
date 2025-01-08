import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { chatId } from "@/redux/features/chat/chatSlice";

interface IChatUser {
  id: number;
  avatar: string;
  userName: string;
  latestMessage: string;
  unreadCount: number;
}

interface ListChatProps {
  listChat: IChatUser[];
  loading?: boolean;
  error?: string | null;
}

export default function ListChat({ listChat, loading, error }: ListChatProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleChatClick = (chat: IChatUser) => {
    console.log("Clicked chat:", chat); // Debug log
    dispatch(chatId(chat.chatId)); // Use chatId instead of id
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full text-red-500">
        {error}
      </div>
    );
  }

  if (!listChat?.length) {
    return (
      <div className="flex justify-center items-center h-full text-gray-500">
        No chats available
      </div>
    );
  }

  return (
    <List>
      {listChat.map((chat) => (
        <ListItem
          key={chat.id}
          className="group hover:bg-blue-gray-50 gap-3"
          onClick={() => handleChatClick(chat)}
        >
          <ListItemPrefix>
            <Avatar
              src={chat.avatar}
              alt={chat.userName}
              size="sm"
              className="border border-gray-200"
            />
          </ListItemPrefix>
          <div className="flex-1 min-w-0">
            <Typography variant="h6" color="blue-gray" className="truncate">
              {chat.userName}
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="font-normal truncate"
            >
              {chat.latestMessage}
            </Typography>
          </div>
          {chat.unreadCount > 0 && (
            <span className="ml-auto bg-blue-500 text-white text-xs rounded-full px-2 py-1">
              {chat.unreadCount}
            </span>
          )}
        </ListItem>
      ))}
    </List>
  );
}
