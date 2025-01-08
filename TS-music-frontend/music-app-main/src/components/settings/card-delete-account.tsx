import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";

export function CardDeleteAccount() {
  return (
    <Card className="!w-[40rem] border-2 border-black/10">
      <CardBody>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-1">
              <ExclamationTriangleIcon className="h-5 w-5" color="red" />
              <Typography variant="h6" color="red">
                Delete Account
              </Typography>
            </div>
            <Input
              crossOrigin={""}
              className="!w-[20rem]"
              label="please input a password"
            />
          </div>
          <div className="flex items-end">
            <Button color="blue-gray">Confirm</Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
