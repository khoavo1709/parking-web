import Companies from "@/pages/Companies";

interface IRoute {
  path: string;
  page: JSX.Element;
}

const AdminRoutes: IRoute[] = [
  {
    path: "/companies",
    page: <Companies />,
  },
];

export default AdminRoutes;
