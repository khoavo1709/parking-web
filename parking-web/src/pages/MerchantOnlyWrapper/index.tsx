import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

const MerchantOnlyWrapper: React.FC<Props> = ({ children }) => {
  const idCompany = localStorage.getItem("COMPANY_ID");
  const notAdmin = localStorage.getItem("SESSION_TYPE") != "admin";

  if (!idCompany || !notAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default MerchantOnlyWrapper;
