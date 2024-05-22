import Bookings from "@/pages/Bookings";
import Employees from "@/pages/Employees";

interface IRoute {
  path: string;
  page: JSX.Element;
}

const MerchantOnlyRoutes: IRoute[] = [
  {
    path: "/bookings",
    page: <Bookings />,
  },
  {
    path: "/employees",
    page: <Employees />,
  },
];

export default MerchantOnlyRoutes;
