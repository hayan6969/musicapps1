import { useEffect, useState } from "react";
import { Checkbox, Avatar } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { chatService } from "@/services/chatService";
import { setActiveChatId } from "@/redux/features/chatSlice"; // You'll need to create this

function ChatList() {
  const dispatch = useDispatch();
  const [chatUsers, setChatUsers] = useState<IChatUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        setLoading(true);
        const users = await chatService.getChatUsers();
        setChatUsers(users);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load chats");
      } finally {
        setLoading(false);
      }
    };

    fetchChatUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-2">
      {chatUsers.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-4 p-2 hover:bg-blue-gray-50 cursor-pointer"
          onClick={() => dispatch(setActiveChatId(user.id))}
        >
          <Checkbox crossOrigin={undefined} className="h-5 w-5" />
          <Avatar src={user.avatar} alt={user.userName} size="sm" />
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.userName}</span>
            <span className="text-xs text-gray-600">{user.latestMessage}</span>
          </div>
          {user.unreadCount > 0 && (
            <span className="ml-auto bg-blue-500 text-white text-xs rounded-full px-2 py-1">
              {user.unreadCount}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

export default ChatList;
