import React from "react";
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
import { reportDialog } from "@/redux/features/offer/offerSlice";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

export default function ReportDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const isReportDialog = useSelector(
    (state: RootState) => state.offer.reportDialog
  );

  return (
    <>
      <Dialog
        open={isReportDialog}
        handler={() => dispatch(reportDialog())}
        size="xs"
      >
        <DialogBody divider className="grid h-fit">
          <div className="flex flex-col">
            <div className="py-2 flex justify-start">
              <Typography color="black" variant="h5">
                Report Project
              </Typography>
            </div>
            <p className="text-sm text-black">
              Please review our{" "}
              <span className="text-blue-500">Community Guidelines</span>
              {`for
              additional information about what is and isn't permitted on Music
              App.`}
            </p>
            <div className="flex flex-col">
              <div className="flex flex-row gap-2 items-center">
                <Radio
                  defaultChecked
                  crossOrigin={""}
                  name="type"
                  ripple={false}
                  className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                  label={
                    <Typography
                      color="blue-gray"
                      className="font-normal text-black text-sm"
                    >
                      Spam
                    </Typography>
                  }
                />
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Radio
                  crossOrigin={""}
                  name="type"
                  ripple={false}
                  className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                  label={
                    <Typography
                      color="blue-gray"
                      className="font-normal text-black text-sm"
                    >
                      Adult Content
                    </Typography>
                  }
                />
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Radio
                  crossOrigin={""}
                  name="type"
                  ripple={false}
                  className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                  label={
                    <Typography
                      color="blue-gray"
                      className="font-normal text-black text-sm"
                    >
                      Fraud/Scam
                    </Typography>
                  }
                />
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Radio
                  crossOrigin={""}
                  name="type"
                  ripple={false}
                  className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                  label={
                    <Typography
                      color="blue-gray"
                      className="font-normal text-black text-sm"
                    >
                      Harmful or Illegal
                    </Typography>
                  }
                />
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Radio
                  crossOrigin={""}
                  name="type"
                  ripple={false}
                  className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                  label={
                    <Typography
                      color="blue-gray"
                      className="font-normal text-black text-sm"
                    >
                      Imminent physical harm
                    </Typography>
                  }
                />
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Radio
                  crossOrigin={""}
                  name="type"
                  ripple={false}
                  className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                  label={
                    <Typography
                      color="blue-gray"
                      className="font-normal text-black text-sm"
                    >
                      Infringes my rights
                    </Typography>
                  }
                />
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Radio
                  crossOrigin={""}
                  name="type"
                  ripple={false}
                  className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                  label={
                    <Typography
                      color="blue-gray"
                      className="font-normal text-black text-sm"
                    >
                      Misinformation and Disinformation
                    </Typography>
                  }
                />
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </div>
              <div className="flex flex-row gap-2 items-center">
                <Radio
                  crossOrigin={""}
                  name="type"
                  ripple={false}
                  className="border-gray-900/10 bg-gray-900/5 p-0 transition-all hover:before:opacity-0"
                  label={
                    <Typography
                      color="blue-gray"
                      className="font-normal text-black text-sm"
                    >
                      Other
                    </Typography>
                  }
                />
                <QuestionMarkCircleIcon className="h-5 w-5" />
              </div>
            </div>
          </div>
          <Textarea className="" label="provide additional details" />
          <div className="flex flex-row gap-1 mt-3">
            <Button
              variant="gradient"
              size="sm"
              className="text-xs normal-case rounded-full"
            >
              Submit
            </Button>
            <Button
              variant="text"
              size="sm"
              className="text-xs normal-case rounded-full"
            >
              Cancel
            </Button>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
