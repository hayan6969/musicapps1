// src/services/chatService.ts
import { IChatUser, IChatRoom, IMessage } from "../types/chat";
import { updateChatUsers } from "../redux/features/chat/chatSlice";

const BASE_URL = "http://localhost:3000/v1";

export const chatService = {
  async getChatUsers(): Promise<IChatUser[]> {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/chat-system/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chat users");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching chat users:", error);
      throw error;
    }
  },

  async getChatMessages(chatId: number): Promise<IChatRoom> {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/chat-system/${chatId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch chat messages");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      throw error;
    }
  },

  async sendMessage(chatId: number, message: string): Promise<IMessage> {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/chat-system/${chatId}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      return await response.json();
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },

  startPolling(dispatch: any, interval = 3000) {
    return setInterval(async () => {
      try {
        const users = await this.getChatUsers();
        dispatch(updateChatUsers(users));
      } catch (error) {
        console.error("Error polling chat users:", error);
      }
    }, interval);
  },

  stopPolling(intervalId: NodeJS.Timeout) {
    clearInterval(intervalId);
  },
};
