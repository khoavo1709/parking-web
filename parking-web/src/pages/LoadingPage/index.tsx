import { Spin } from "antd";

const LoadingPage = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Spin size="large" />
    </div>
  );
};

export default LoadingPage;
