import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const AdminWrapper: React.FC<Props> = ({ children }) => {
  const idCompany = localStorage.getItem("COMPANY_ID");
  const isAdmin = localStorage.getItem("SESSION_TYPE") == "admin";

  if (!idCompany || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default AdminWrapper;
