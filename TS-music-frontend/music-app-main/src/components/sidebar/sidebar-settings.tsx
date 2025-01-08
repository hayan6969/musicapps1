import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
  LockClosedIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";

export function SidebarSettings() {
  return (
    <Card className="min-h-screen border-2 border-black/10 w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="px-4">
        <Typography variant="h5" color="blue-gray">
          Settings
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Account
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <LockClosedIcon className="h-5 w-5" />
          </ListItemPrefix>
          Password
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <TrashIcon className="h-5 w-5" />
          </ListItemPrefix>
          Delete Account
        </ListItem>
      </List>
    </Card>
  );
}
