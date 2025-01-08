import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";

export function CardAccount() {
  return (
    <Card className="!w-[40rem] border-2 border-black/10">
      <CardBody>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col gap-2">
            <Typography variant="h6" color="blue-gray">
              Login Email
            </Typography>
            <Input crossOrigin={""} className="!w-[20rem]" />
          </div>
          <div className="flex items-end">
            <Button color="blue">Save</Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
