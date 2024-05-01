import { ConfigProvider } from "antd";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.less";
import enUS from "antd/lib/locale/en_US";
import { createRoot } from "react-dom/client";
import { store } from "./store";
import { Provider } from "react-redux";
import { APIProvider } from "@vis.gl/react-google-maps";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider locale={enUS}>
    <Provider store={store}>
      <BrowserRouter>
        <APIProvider apiKey={import.meta.env.VITE_MAP_API_KEY}>
          <App />
        </APIProvider>
      </BrowserRouter>
    </Provider>
  </ConfigProvider>,
);
