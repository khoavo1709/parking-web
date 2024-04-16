import { ConfigProvider } from "antd";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.less";
import enUS from "antd/lib/locale/en_US";

ReactDOM.render(
  <ConfigProvider locale={enUS}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>,
  document.getElementById("root")
);
