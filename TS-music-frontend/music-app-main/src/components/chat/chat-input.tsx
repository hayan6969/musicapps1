import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateDialog } from "@/redux/features/offer/offerSlice";
import { chatService } from "@/services/chatService";
import { PaperClipIcon, FaceSmileIcon } from "@heroicons/react/24/outline";

function ChatInput() {
  const dispatch = useDispatch<AppDispatch>();
  const chatId = useSelector((state: RootState) => state.chat.chatId);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim() || !chatId) return;

    try {
      setSending(true);
      await chatService.sendMessage(chatId, message.trim());
      setMessage(""); // Clear input after successful send

      // Trigger chat list refresh after sending message
      const updatedUsers = await chatService.getChatUsers();
      dispatch(updateChatUsers(updatedUsers)); // We'll create this action
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {chatId ? (
        <div className="w-full gap-4 inline-flex justify-center mr-20">
          <div className="flex items-start gap-2">
            <PaperClipIcon
              className="h-8 w-8 cursor-pointer hover:bg-black/10 hover:rounded-lg p-1"
              color="black"
            />
            <FaceSmileIcon
              className="h-8 w-8 cursor-pointer hover:bg-black/10 hover:rounded-lg p-1"
              color="black"
            />
            <button
              className="items-center flex px-1 py-2 bg-black hover:bg-black/60 rounded-full shadow"
              onClick={() => dispatch(updateDialog())}
            >
              <h3 className="text-white text-xs font-semibold leading-4 px-2">
                Send Order
              </h3>
            </button>
          </div>
          <div className="flex items-start">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              cols={30}
              rows={10}
              className="w-[35rem] !h-[6rem] bg-white resize-none bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
              placeholder="Enter your text"
              disabled={sending}
            />
          </div>
          <button
            onClick={handleSendMessage}
            disabled={sending || !message.trim()}
            className={`px-4 py-2 rounded-full ${
              sending || !message.trim()
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
          >
            {sending ? "Sending..." : "Send"}
          </button>
        </div>
      ) : null}
    </>
  );
}

export default ChatInput;
