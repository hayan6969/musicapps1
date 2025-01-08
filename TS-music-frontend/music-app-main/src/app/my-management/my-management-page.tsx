"use client";

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
import React from "react";
import ChatDrawer from "@/components/chat/chat-drawer";
import ListAvatar from "@/components/my-management/list-avatar";
import ListMenu from "@/components/my-management/list-menu";
import DetailDrawer from "@/components/my-management/detail-drawer";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";

export function MyManagementPage() {
  const detailTitle = useSelector(
    (state: RootState) => state.management.detailTitle
  );
  return (
    <>
      <div className="flex min-h-[90vh] items-center justify-center bg-gray-100">
        <div className="flex flex-row w-[80rem] h-[37rem] border-black/10 border-2 rounded-xl shadow-md">
          <div className="w-[80rem] h-[37rem] rounded-s-xl border-slate-100 border-b space-y-2 items-center">
            <div className="flex flex-row">
              <div className="flex flex-col w-[34rem]">
                <DetailDrawer />
                <div className="flex flex-col px-4 border-b-2 border-black/10 py-2">
                  <ListMenu />
                </div>
              </div>
              <div className="w-full h-[36.8rem] max-h-[36.8rem] flex flex-col rounded-e-xl border-l-2 border-black/10">
                <div className="flex flex-row justify-between h-[30rem] max-h-[30rem] p-2 border-2 border-black/10 m-4">
                  {/* <ChatRoom /> */}
                </div>
                {detailTitle == "Order Orbitation" ? (
                  <div className="flex flex-row justify-center gap-6 h-[4rem] max-w-[55.7rem] z-20 p-2 items-center">
                    <Button
                      variant="gradient"
                      size="sm"
                      className="normal-case text-center text-[0.8rem] w-[6rem] rounded-none"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="gradient"
                      size="sm"
                      className="normal-case text-center text-[0.8rem] w-[10rem] rounded-none"
                    >
                      Completed
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyManagementPage;
