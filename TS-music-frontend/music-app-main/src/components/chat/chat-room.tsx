import { IMessage, IChatRoom, IChatUser } from "@/types/chat";
import ComponentSwitcher from "../switcher/componentSwitcher";
import { Avatar, Typography, Spinner } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState, useCallback } from "react";
import { chatService } from "@/services/chatService";

function ChatRoom() {
  const chatId = useSelector((state: RootState) => state.chat.chatId);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create a fetchMessages function that can be reused
  const fetchMessages = useCallback(async () => {
    if (!chatId) return;

    try {
      const response = await chatService.getChatMessages(chatId);
      console.log("Chat messages response:", response);

      const formattedMessages = response.detail.map((msg: any) => ({
        id: msg.id,
        senderId: msg.senderId,
        message: msg.message,
        datetime: msg.datetime,
        currentUser: msg.currentUser,
        isCard: msg.isCard || false,
        cardType: msg.cardType || "0",
      }));

      setMessages(formattedMessages);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setError(err instanceof Error ? err.message : "Failed to load messages");
    }
  }, [chatId]);

  // Initial load of messages
  useEffect(() => {
    const loadInitialMessages = async () => {
      setLoading(true);
      await fetchMessages();
      setLoading(false);
    };

    loadInitialMessages();
  }, [chatId, fetchMessages]);

  // Polling for new messages every 3 seconds
  useEffect(() => {
    if (!chatId) return;

    const pollInterval = setInterval(() => {
      fetchMessages();
    }, 3000); // Poll every 3 seconds

    return () => clearInterval(pollInterval);
  }, [chatId, fetchMessages]);

  if (!chatId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full py-2 overflow-hidden h-full overflow-y-auto">
      <div className="grid gap-4">
        {messages.map((message, index) => (
          <div
            key={message.id || index}
            className={`flex gap-2.5 px-2 ${
              message.currentUser ? "justify-end" : "justify-start"
            }`}
          >
            {!message.currentUser && (
              <Avatar
                src="https://via.placeholder.com/150"
                alt="avatar"
                size="sm"
              />
            )}
            <div className="grid max-w-[25rem]">
              {message.isCard ? (
                <ComponentSwitcher componentType={message.cardType} />
              ) : (
                <div
                  className={`px-3 py-2 rounded ${
                    message.currentUser ? "bg-blue-600" : "bg-blue-gray-200/20"
                  }`}
                >
                  <Typography
                    className={`text-left text-sm font-normal leading-snug ${
                      message.currentUser ? "text-white" : "text-black"
                    }`}
                  >
                    {message.message}
                  </Typography>
                </div>
              )}
              <div
                className={`items-center inline-flex px-2 ${
                  message.currentUser ? "justify-start" : "justify-end"
                }`}
              >
                <Typography className="text-gray-500 text-xs font-normal leading-4 py-1">
                  {message.datetime}
                </Typography>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatRoom;
