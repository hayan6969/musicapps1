import { InboxArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { ChatTabs } from "./chat-tabs";
import JobApplications from "./job-applications";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import DetailApplication from "./detail-application";
import { ApplicationChatTabs } from "./application-chat-tabs";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { updateDrawer } from "@/redux/features/chat/chatSlice";

function ChatDrawer() {
  const [drawerCss, setDrawerCss] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const isDrawer = useSelector((state: RootState) => state.chat.chatDrawer);
  useEffect(() => {
    if (isDrawer) {
      setDrawerCss(true);
    } else {
      setDrawerCss(true);
      setTimeout(() => {
        setDrawerCss(false);
      }, 505);
    }
  }, [isDrawer]);
  return (
    <div className={`fixed ${drawerCss ? "z-40" : ""} flex overflow-hidden`}>
      <input
        type="checkbox"
        id="drawer-toggle"
        className="sr-only peer hidden"
        checked={isDrawer}
        onChange={() => console.log("test")}
      />
      <div className="w-[24rem] h-[36.9rem] max-w-[24rem] rounded-s-xl transition-all duration-500 transform translate-x-full bg-white peer-checked:translate-x-0 invisible peer-checked:visible">
        <div className="flex flex-row items-center justify-between gap-1 p-4 border-b-2 border-black/10 w-[24rem] h-[4rem] max-w-[24rem] max-h-[4rem]">
          <div className="flex flex-row items-center gap-1">
            <Button
              variant="text"
              size="sm"
              className="normal-case text-center items-center flex flex-row gap-3 text-md px-3 py-1"
              onClick={() => dispatch(updateDrawer())}
            >
              <ArrowLeftIcon className="h-5 w-5 cursor-pointer" color="black" />
              Messages
            </Button>
          </div>
          <div className="flex flex-row gap-1 items-center justify-center">
            {/* <Button
              variant="text"
              size="sm"
              className="normal-case text-center items-center flex flex-row gap-1 text-[0.7rem] px-3 py-1 border rounded-full border-black/50"
            >
              <i className="fas fa-plus text-white bg-black rounded-full p-[0.2rem]" />
              Compose
            </Button> */}
          </div>
        </div>
        <div className="flex flex-col border-b-2 border-black/10">
          <DetailApplication />
        </div>
        <ApplicationChatTabs />
      </div>
    </div>
  );
}

export default ChatDrawer;
