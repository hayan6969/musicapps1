import { Button } from "@material-tailwind/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { filterExplore } from "@/redux/features/offer/offerSlice";
import TabsMenu from "../tabs/tabs-menu";

function FilterExploreComponent() {
  // const dispatch = useDispatch<AppDispatch>();
  // const filterActive = useSelector(
  //   (state: RootState) => state.offer.filterExplore
  // );
  return (
    <div className="flex flex-row gap-4 items-center justify-center mt-5 mb-3">
      <TabsMenu />
    </div>
  );
}

export default FilterExploreComponent;
