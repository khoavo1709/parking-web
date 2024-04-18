import { LockTwoTone, UserOutlined } from "@ant-design/icons";
import styles from "./index.module.less";
import { Button, Card, Col, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const goToSignUpPage = () => {
    navigate("/sign-up");
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/parking-lot");
    }
  }, [isSuccess, navigate]);

  const handleLogin = () => {
    setIsLoading(true);
    // :TODO implement login
    setIsSuccess(true);

    setIsLoading(false);
  };

  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <Row justify="center">
          <Col xs={20} sm={12}>
            <Card>
              <div style={{ margin: "1.5rem 0" }}>
                <div style={{ textAlign: "center" }}>
                  <p>Welcom to Parking merchant!</p>
                </div>
                <Row justify="center">
                  <Col span={24}></Col>
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleLogin}
                      initialValues={{
                        remember: true,
                      }}
                    >
                      <Form.Item label="Email" name="email">
                        <Input
                          size="large"
                          placeholder="Email"
                          prefix={<UserOutlined style={{ color: "#3e79f7" }} />}
                        ></Input>
                      </Form.Item>
                      <Form.Item label="Password" name="password">
                        <Input.Password
                          size="large"
                          placeholder="Password"
                          prefix={<LockTwoTone />}
                        ></Input.Password>
                      </Form.Item>
                      <Form.Item>
                        <Link to={`./forgot-password`}>
                          <Button className={styles["btn-forgot"]} type="link">
                            Forgot password?
                          </Button>
                        </Link>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          size="large"
                          type="primary"
                          block
                          htmlType="submit"
                          loading={isLoading}
                        >
                          Login
                        </Button>
                      </Form.Item>
                    </Form>
                  </Col>
                  <Col>
                    <div className=" font-medium text-[16px]">
                      Don't have an account?
                      <Button
                        className="text-[#40A9FF] font-semibold text-[17px]"
                        type="link"
                        onClick={goToSignUpPage}
                      >
                        Sign up
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
