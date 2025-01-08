import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";

export default function ListOrderOrbiration() {
  return (
    <Card className="w-96 shadow-none">
      <List className="gap-2">
        <ListItem className="hover:bg-blue-gray-200/30 border-2 border-black/10">
          <ListItemPrefix>
            <div className="flex flex-row gap-3">
              <Avatar
                variant="circular"
                alt="candice"
                src="https://docs.material-tailwind.com/img/face-5.jpg"
              />
              <Avatar
                variant="circular"
                alt="candice"
                src="https://docs.material-tailwind.com/img/face-1.jpg"
              />
            </div>
          </ListItemPrefix>
          <div>
            <div className="flex flex-row gap-1">
              <Typography
                variant="small"
                className="font-semibold"
                color="blue-gray"
              >
                Order Time:
              </Typography>
              <Typography
                variant="small"
                className="font-semibold"
                color="blue-gray"
              >
                2024/06/03
              </Typography>
            </div>
            <div className="flex flex-row gap-1">
              <Typography
                variant="small"
                className="font-semibold"
                color="blue-gray"
              >
                Dispute Time:
              </Typography>
              <Typography
                variant="small"
                className="font-semibold"
                color="blue-gray"
              >
                2024/06/06
              </Typography>
            </div>
          </div>
        </ListItem>
      </List>
    </Card>
  );
}
