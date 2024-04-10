import { ConfigProvider } from "antd";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";
import "./index.less";
import { store } from "./store";
import enUS from "antd/lib/locale/en_US";
import { APIProvider } from "@vis.gl/react-google-maps";

ReactDOM.render(
  <ErrorBoundary>
    <ConfigProvider locale={enUS}>
      <Provider store={store}>
        <BrowserRouter>
          <APIProvider apiKey={import.meta.env.VITE_MAP_API_KEY}>
            <App />
          </APIProvider>
        </BrowserRouter>
      </Provider>
    </ConfigProvider>
  </ErrorBoundary>,
  document.getElementById("root"),
);
