import AboutPage from "@/pages/AboutPage";
import ParkingLots from "@/pages/ParkingLots";
import ParkingLotDetails from "@/pages/ParkingLots/ParkingLotDetails";
import Setting from "@/pages/Settings";

interface IRoute {
  path: string;
  page: JSX.Element;
}

const MerchantRoutes: IRoute[] = [
  {
    path: "/about",
    page: <AboutPage />,
  },
  {
    path: "/parking-lot",
    page: <ParkingLots />,
  },
  {
    path: "/parking-lot/:id",
    page: <ParkingLotDetails />,
  },
  {
    path: "/setting",
    page: <Setting />,
  },
];

export default MerchantRoutes;
