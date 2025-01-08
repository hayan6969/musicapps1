// Example usage in your chat component
async function handleUserClick(user: IChatUser) {
  try {
    // No need to get chatId separately since it's included in user object
    const messages = await chatService.getChatMessages(user.chatId);
    setChatId(user.chatId);
    // Handle messages...
  } catch (error) {
    console.error('Error loading chat messages:', error);
  }
}

async function sendMessage(message: string) {
  if (!chatId) return;

  try {
    const response = await chatService.sendMessage(chatId, message);
    // Handle the response...
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
