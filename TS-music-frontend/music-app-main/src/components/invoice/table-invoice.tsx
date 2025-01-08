import { Card, Typography } from "@material-tailwind/react";

const TABLE_HEAD = ["Description", "Role", "Rate"];

const TABLE_ROWS = [
  {
    description: "Hotel California",
    role: "Composer",
    rate: "$80.0",
  },
  {
    description: "Hotel California",
    role: "Producer",
    rate: "$120.0",
  },
];

export default function TableInvoice() {
  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ description, rate, role }, index) => {
            // const isLast = index === TABLE_ROWS.length - 1;
            const classes = "p-4 border-b border-blue-gray-50";

            return (
              <tr key={description}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {description}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {role}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {rate}
                  </Typography>
                </td>
              </tr>
            );
          })}
          <tr>
            <td className={"p-4"}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold"
              >
                Total
              </Typography>
            </td>
            <td className={"p-4"}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold"
              >
                {""}
              </Typography>
            </td>
            <td className={"p-4"}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-bold"
              >
                $200.0
              </Typography>
            </td>
          </tr>
        </tbody>
      </table>
    </Card>
  );
}
