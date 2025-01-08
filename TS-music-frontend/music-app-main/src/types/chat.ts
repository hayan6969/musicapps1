// src/types/chat.ts
export interface IMessage {
  id: number;
  senderId: number;
  receiverId: number;
  message: string;
  datetime: string;
  isCard?: boolean;
  cardType?: string;
  currentUser: boolean;
}

export interface IChatRoom {
  chatId: number;
  detail: IMessage[];
}

export interface IChatUser {
  id: string;
  chatId: string;
  avatar: string;
  userName: string;
  latestMessage: string;
  unreadCount: number;
}
