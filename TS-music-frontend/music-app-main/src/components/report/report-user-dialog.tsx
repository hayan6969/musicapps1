import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Textarea,
  Checkbox,
  Radio,
} from "@material-tailwind/react";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { reportUserDialog } from "@/redux/features/offer/offerSlice";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { users } from "@/dummy/users";
import { chatService } from "@/services/chatService";

export default function ReportUserDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const chatId = useSelector((state: RootState) => state.chat.chatId);
  const [users, setUsers] = useState<IChatUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const chatUsers = await chatService.getChatUsers();
        setUsers(chatUsers);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load user data"
        );
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const currentUser = users.find((user) => user.id === chatId);

  return (
    <div>
      <Typography variant="h4">
        {currentUser ? currentUser.userName : "User"}
      </Typography>
      {/* Rest of your dialog content */}
    </div>
  );
}
