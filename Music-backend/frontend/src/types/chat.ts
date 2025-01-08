export interface IChatUser {
  id: string;
  chatId: string;
  avatar: string;
  userName: string;
  latestMessage: string;
  unreadCount: number;
}
