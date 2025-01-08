"use client";

import { ChatTabs } from "@/components/chat/chat-tabs";
import JobApplications from "@/components/chat/job-applications";
import ListChat from "@/components/chat/list";
import OriginalBox from "@/components/music-box/original-box";
import { JOBS_PROPS } from "@/dummy/example";
import {
  CurrencyDollarIcon,
  PlayIcon,
  SpeakerWaveIcon,
  BookmarkIcon,
  ArrowTopRightOnSquareIcon,
  InboxArrowDownIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import {
  ArchiveBoxIcon,
  ExclamationTriangleIcon,
  NoSymbolIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Avatar,
  Textarea,
  Input,
  Progress,
  Button,
  IconButton,
} from "@material-tailwind/react";
import Link from "next/link";
import React, { useEffect } from "react";
import ChatRoom from "@/components/chat/chat-room";
import ChatInput from "@/components/chat/chat-input";
import ChatDrawer from "@/components/chat/chat-drawer";
import OfferDialog from "@/components/offer/offer-dialog";
import CancelOrderConfirmation from "@/components/order/cancel-order-confirmation";
import CompleteDialogOrder from "@/components/order/complete-dialog-order";
import RevisionDialogOrder from "@/components/order/revision-dialog-order";
import RatingDialog from "@/components/order/rating-dialog";
import ArbitrationDialog from "@/components/order/arbitrationDialog";
import ReportDialog from "@/components/report/report-dialog";
import SidebarChat from "@/components/chat/sidebar-chat";
import TopbarChat from "@/components/chat/topbar-char";
import { RootState } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import ReportUserDialog from "@/components/report/report-user-dialog";
import { chatService } from "@/services/chatService";

export function ChatPage() {
  const dispatch = useDispatch();
  const chatId = useSelector((state: RootState) => state.chat.chatId);

  useEffect(() => {
    // Start polling for chat updates
    const pollInterval = chatService.startPolling(dispatch);

    // Cleanup on unmount
    return () => {
      chatService.stopPolling(pollInterval);
    };
  }, [dispatch]);

  return (
    <>
      <OfferDialog />
      <CancelOrderConfirmation />
      <CompleteDialogOrder />
      <RevisionDialogOrder />
      <RatingDialog />
      <ArbitrationDialog />
      <ReportDialog />
      <ReportUserDialog />
      <div className="flex">
        <div className="flex flex-row w-full h-[52.5rem] overflow-hidden border-black/10 border-2 rounded-xl shadow-md">
          <div className="w-full h-[52.5rem] rounded-s-xl border-slate-100 border-b space-y-2 items-center">
            <div className="flex flex-row">
              <SidebarChat />
              {chatId != 0 ? (
                <div
                  className={`w-full h-[52.5rem] max-h-[52.5rem] flex flex-col rounded-e-xl border-l-2 border-black/10`}
                >
                  <TopbarChat />
                  <div
                    className={`flex flex-row justify-between h-[40.5rem] w-full p-2`}
                  >
                    <ChatRoom />
                  </div>
                  <div
                    className={`flex flex-row justify-between h-[10rem] z-20 p-2 border-t-2 border-black/10 items-center`}
                  >
                    <ChatInput />
                  </div>
                </div>
              ) : (
                <div className="w-full h-[52.5rem] max-h-[52.5rem] flex items-center justify-center rounded-e-xl border-l-2 border-black/10 bg-gray-200 ">
                  <p className="shadow-md bg-gray-500 rounded-full text-white text-md p-2">
                    Select a chat to start messaging
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatPage;
