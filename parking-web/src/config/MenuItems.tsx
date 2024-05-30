import { FaParking, FaUser } from "react-icons/fa";
import { HiCog } from "react-icons/hi";
import { IoTicket } from "react-icons/io5";

const MenuItems = {
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
      path: "/bookings",
      name: "Bookings",
      icon: (
        <span role="img" className="anticon">
          <IoTicket />
        </span>
      ),
    },
    {
      path: "/employees",
      name: "Employees",
      icon: (
        <span role="img" className="anticon">
          <FaUser />
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
  ],
};

export default MenuItems;
