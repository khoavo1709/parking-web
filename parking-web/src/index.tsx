import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.less";
import enUS from "antd/lib/locale/en_US";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={enUS}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>,
);
