import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { invoiceDialog } from "@/redux/features/offer/offerSlice";
import TableInvoice from "./table-invoice";

export default function InvoiceDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const isInvoiceDialog = useSelector(
    (state: RootState) => state.offer.invoiceDialog
  );

  return (
    <>
      <Dialog
        size="xl"
        open={isInvoiceDialog}
        handler={() => dispatch(invoiceDialog())}
      >
        <DialogBody divider className="grid h-fit">
          <div className="flex flex-col p-4 gap-10">
            <div className="flex flex-row justify-between items-center">
              <Typography color="black" variant="h3">
                Music App Invoice
              </Typography>
              <Typography color="black" variant="h5">
                Order: #10234987
              </Typography>
            </div>
            <div className="flex flex-row justify-between items-center">
              <Typography color="black" variant="h5">
                Client Name
              </Typography>
              <Typography color="black" variant="small">
                Order Payment: 18th march 2024
              </Typography>
            </div>
            <TableInvoice />
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
