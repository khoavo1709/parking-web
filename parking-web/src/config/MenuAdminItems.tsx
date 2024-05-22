import { FaParking, FaHotel } from "react-icons/fa";
import { HiCog } from "react-icons/hi";

const MenuAdminItems = {
  routes: [
    {
      path: "/parking-lot",
      name: "Parking lots",
      icon: (
        <span role="img" className="anticon">
          <FaParking />
        </span>
      ),
    },
    {
      path: "/setting",
      name: "Setting",
      icon: (
        <span role="img" className="anticon">
          <HiCog />
        </span>
      ),
    },
    {
      path: "/companies",
      name: "Companies",
      icon: (
        <span role="img" className="anticon">
          <FaHotel />
        </span>
      ),
    },
  ],
};

export default MenuAdminItems;
