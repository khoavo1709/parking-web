import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const AuthWrapper: React.FC<Props> = ({ children }) => {
  let idCompany = localStorage.getItem("COMPANY_ID");
  if (!idCompany) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
