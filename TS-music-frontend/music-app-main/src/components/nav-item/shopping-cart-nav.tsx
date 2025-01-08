import React from "react";
import {
  Button,
  Typography,
  Avatar,
  Popover,
  PopoverContent,
  PopoverHandler,
  Badge,
} from "@material-tailwind/react";
import Link from "next/link";

interface NavProps {
  isScrolling: boolean;
}

function ShoppingCartNav({ isScrolling }: NavProps) {
  const [openPopover, setOpenPopover] = React.useState(false);
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <Badge content="2" color="red" withBorder className="p-1">
        <PopoverHandler {...triggers}>
          <img
            src={
              isScrolling ? "/icons/cart-black.png" : "/icons/cart-white.png"
            }
            style={{ height: 24, width: 27 }}
            className="cursor-pointer"
          />
        </PopoverHandler>
      </Badge>
      <PopoverContent {...triggers} className="z-50 w-[20rem]">
        <Typography
          variant="h6"
          color="black"
          className="mb-2 flex items-center gap-2 font-semibold"
        >
          Shopping Cart
        </Typography>
        <Typography
          variant="small"
          color="black"
          className="font-normal text-black"
        >
          you have <span className="text-blue-200">2</span> items in your
          shopping cart
        </Typography>
        <div className="mt-4 flex flex-col gap-2">
          <div className="flex flex-row items-center justify-between mx-3">
            <Avatar
              variant="square"
              alt="tania andrew"
              size="sm"
              className="cursor-pointer"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <p className="text-black font-medium">Every</p>
            <p className="text-blue-300 font-medium">$20.00</p>
          </div>
          <div className="flex flex-row items-center justify-between mx-3">
            <Avatar
              variant="square"
              alt="tania andrew"
              size="sm"
              className="cursor-pointer"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
            <p className="text-black font-medium">Hotel California</p>
            <p className="text-blue-300 font-medium">$35.00</p>
          </div>
          <div className="flex flex-row items-center justify-end mx-3">
            <p className="text-black font-bold">Total: $55.00</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 py-4">
            <Link href={"/checkout"}>
              <Button
                variant="filled"
                color="red"
                size="sm"
                className="normal-case text-white font-semibold text-center w-full cursor-pointer rounded-none border-black border-2"
              >
                Proceed to checkout
              </Button>
            </Link>
            <Link href={"/checkout"}>
              <Button
                variant="text"
                size="sm"
                className="normal-case text-black text-center cursor-pointer"
              >
                View Cart
              </Button>
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ShoppingCartNav;
