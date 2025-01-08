import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Badge,
} from "@material-tailwind/react";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";

export default function DetailSection() {
  const dispatch = useDispatch<AppDispatch>();
  const detailTitle = useSelector(
    (state: RootState) => state.management.detailTitle
  );
  const iconName = useSelector((state: RootState) => state.management.icon);
  return (
    <>
      <List className="gap-2">
        <ListItem className="relative gap-3">
          <ListItemPrefix className="mr-0">
            <Badge
              placement="top-end"
              overlap="circular"
              color="red"
              withBorder
            >
              <img
                src={`/icons/${iconName}.png`}
                style={{ height: 52, width: 52 }}
                className="hover:scale-125 cursor-pointer"
              />
            </Badge>
          </ListItemPrefix>
          <div className="max-w-[14rem] w-[14rem]">
            <Typography variant="h6" color="black">
              {detailTitle}
            </Typography>
            <Typography variant="small" color="red" className="font-bold">
              2 News
            </Typography>
          </div>
        </ListItem>
      </List>
    </>
  );
}
