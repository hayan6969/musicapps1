import {
  List,
  ListItem,
  ListItemPrefix,
  Avatar,
  Card,
  Typography,
} from "@material-tailwind/react";

export default function ListAvatar() {
  return (
    <Card className="w-96 shadow-none">
      <List className="gap-2">
        <ListItem className="hover:bg-blue-gray-200/30 border-2 border-black/10">
          <ListItemPrefix>
            <Avatar
              variant="circular"
              alt="candice"
              src="https://docs.material-tailwind.com/img/face-1.jpg"
            />
          </ListItemPrefix>
          <div>
            <div className="flex flex-row gap-1">
              <Typography variant="h6" color="blue-gray">
                Tania Andrew
              </Typography>
              <Typography
                variant="h6"
                color="blue-gray"
                className="absolute right-10"
              >
                2024/06/03
              </Typography>
            </div>
            <Typography variant="small" color="gray" className="font-normal">
              Lorem Ipsum
            </Typography>
          </div>
        </ListItem>
        <ListItem className="hover:bg-blue-gray-200/30 border-2 border-black/10">
          <ListItemPrefix>
            <Avatar
              variant="circular"
              alt="alexander"
              src="https://docs.material-tailwind.com/img/face-2.jpg"
            />
          </ListItemPrefix>
          <div>
            <div className="flex flex-row gap-1">
              <Typography variant="h6" color="blue-gray">
                Alexander
              </Typography>
              <Typography
                variant="h6"
                color="blue-gray"
                className="absolute right-10"
              >
                2024/06/03
              </Typography>
            </div>

            <Typography variant="small" color="gray" className="font-normal">
              Lorem Ipsum
            </Typography>
          </div>
        </ListItem>
        <ListItem className="hover:bg-blue-gray-200/30 border-2 border-black/10">
          <ListItemPrefix>
            <Avatar
              variant="circular"
              alt="emma"
              src="https://docs.material-tailwind.com/img/face-3.jpg"
            />
          </ListItemPrefix>
          <div>
            <div className="flex flex-row gap-1">
              <Typography variant="h6" color="blue-gray">
                Emma Willever
              </Typography>
              <Typography
                variant="h6"
                color="blue-gray"
                className="absolute right-10"
              >
                2024/06/03
              </Typography>
            </div>
            <Typography variant="small" color="gray" className="font-normal">
              Lorem Ipsum
            </Typography>
          </div>
        </ListItem>
      </List>
    </Card>
  );
}
