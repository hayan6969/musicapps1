async getChatId(otherUserId: string): Promise<string> {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/chat/room/${otherUserId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get chat room');
    }

    const data = await response.json();
    return data.chatId;
  } catch (error) {
    console.error("Error getting chat room:", error);
    throw error;
  }
}
