import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";
import { updateDialog } from "@/redux/features/offer/offerSlice";

export default function OfferDialog() {
  const dispatch = useDispatch<AppDispatch>();
  const isOfferDialog = useSelector(
    (state: RootState) => state.offer.offerDialog
  );
  return (
    <>
      <Dialog
        size="xs"
        open={isOfferDialog}
        handler={() => dispatch(updateDialog())}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-2 pb-0">
            <div className="flex flex-col gap-1">
              <Typography variant="h4" color="blue-gray" className="">
                Send Order
              </Typography>
              <Typography
                className="font-semibold"
                variant="small"
                color="black"
              >
                Outline the details of your collaboration below
              </Typography>
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="-mb-2" color="black" variant="h6">
                Title
              </Typography>
              <input
                type="text"
                className="border border-gray-400 w-full text-black text-sm rounded-lg p-2.5"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="-mb-2" color="black" variant="h6">
                My Work Description
              </Typography>
              <Textarea className="w-[25rem] h-52 !text-black" />
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="-mb-2" color="black" variant="h6">
                Delivery Time
              </Typography>
              <div className="flex flex-row items-center justify-start gap-2">
                <input
                  type="text"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  className="border border-gray-400 w-[5rem] max-w-[5rem] text-black text-sm rounded-lg p-2.5"
                />
                <p className="text-black font-semibold text-sm">days</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Typography className="-mb-2" color="black" variant="h6">
                Price
              </Typography>
              <p className="text-black font-semibold text-[0.6rem]">
                Your fees will be deducted from thi amount. Your client fees
                will be billed to them separately.
              </p>
              <input
                // onKeyDown={(event) => {
                //   if (!/[0-9]/.test(event.key)) {
                //     event.preventDefault();
                //   }
                // }}
                type="text"
                id="cvv-input"
                aria-describedby="helper-text-explanation"
                className="border border-gray-400 w-full h-[5rem] text-center font-bold text-black text-3xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              />
            </div>
          </CardBody>
          <CardFooter className="flex flex-col px-5 py-4 pt-0">
            <div className="flex flex-col gap-0 py-4">
              <p className="text-[0.7rem] font-semibold text-black underline">
                *Learn more about the fee
              </p>
              <p className="text-[0.6rem] font-semibold text-black">
                Fees may vary according to location and payment method.
                <span className="underline"> Learn More</span>
              </p>
            </div>
            <Button
              className="bg-green-400"
              onClick={() => dispatch(updateDialog())}
              fullWidth
            >
              Send Order
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    </>
  );
}
