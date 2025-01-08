import { InboxArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { useEffect } from "react";
import { Button } from "@material-tailwind/react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { updateDrawer } from "@/redux/features/chat/chatSlice";
import { updateDrawer as managementDrawer } from "@/redux/features/management/managementSlice";
import DetailSection from "./detail-section";
import ListAvatar from "./list-avatar";
import ListOrderOrbiration from "./list-order-orbiration";

function DetailDrawer() {
  const [drawerCss, setDrawerCss] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const isDrawer = useSelector((state: RootState) => state.chat.chatDrawer);
  const titleSection = useSelector(
    (state: RootState) => state.management.detailTitle
  );
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
        <div className="flex flex-row items-center justify-between gap-1  px-4 w-[24rem] h-[3rem] max-w-[24rem] max-h-[4rem]">
          <div className="flex flex-row items-center gap-1">
            <Button
              variant="text"
              size="sm"
              className="normal-case text-center items-center flex flex-row gap-3 text-md px-3 py-1  "
              onClick={() => {
                dispatch(updateDrawer());
                setTimeout(() => {
                  dispatch(
                    managementDrawer({
                      detailTitle: "",
                      icon: "",
                    })
                  );
                }, 200);
              }}
            >
              <ArrowLeftIcon className="h-5 w-5 cursor-pointer" color="black" />
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <DetailSection />
          {titleSection == "Order Orbitation" ? (
            <ListOrderOrbiration />
          ) : (
            <ListAvatar />
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailDrawer;
