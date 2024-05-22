import "@/App.less";
import MainLayout from "@/components/Layout";
import { MerchantRoutes } from "@/config";
import AuthWrapper from "@/pages/AuthWrapper";
import Login from "@/pages/Login";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "@/pages/SignUp";
import AdminRoutes from "./config/AdminRoutes";
import AdminWrapper from "./pages/AdminWrapper";
import MerchantOnlyWrapper from "./pages/MerchantOnlyWrapper";
import MerchantOnlyRoutes from "./config/MerchantOnlyRoutes";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route
        element={
          <AuthWrapper>
            <MainLayout />
          </AuthWrapper>
        }
      >
        <>
          {MerchantRoutes?.map((route) => (
            <Route key={route.path} path={route.path} element={route.page} />
          ))}
        </>
      </Route>
      <Route
        element={
          <MerchantOnlyWrapper>
            <MainLayout />
          </MerchantOnlyWrapper>
        }
      >
        {MerchantOnlyRoutes?.map((route) => (
          <Route key={route.path} path={route.path} element={route.page} />
        ))}
      </Route>
      <Route
        element={
          <AdminWrapper>
            <MainLayout />
          </AdminWrapper>
        }
      >
        {AdminRoutes?.map((route) => (
          <Route key={route.path} path={route.path} element={route.page} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/parking-lot" replace />} />
    </Routes>
  );
}
