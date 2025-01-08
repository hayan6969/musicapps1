import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { revisionDialog } from "@/redux/features/offer/offerSlice";

export default function RevisionDialogOrder() {
  const dispatch = useDispatch<AppDispatch>();
  const isRevisionDialog = useSelector(
    (state: RootState) => state.offer.revisionDialog
  );

  return (
    <>
      <Dialog
        open={isRevisionDialog}
        handler={() => dispatch(revisionDialog())}
        size="xs"
      >
        <DialogBody divider className="grid h-[25rem]">
          <div className="py-2 flex justify-start">
            <Typography color="black" variant="small">
              Revision Information
            </Typography>
          </div>
          <Textarea className="!h-[18rem]" />
          <Button variant="gradient" onClick={() => dispatch(revisionDialog())}>
            Submit
          </Button>
        </DialogBody>
      </Dialog>
    </>
  );
}
