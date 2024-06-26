import ChangePassword from "@/components/Setting/ChangePassword";
import EditProfile from "@/components/Setting/EditProfile";
import { Card, Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import { HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi";

const { TabPane } = Tabs;
type TabPosition = "left" | "top";
const iconProps = { color: "#6B7280", size: 20 };

const Setting: FC = () => {
  const [position, setPosition] = useState<TabPosition>("left");
  useEffect(() => {
    if (screen.width < 768) {
      setPosition("top");
    }
  }, []);
  return (
    <div>
      <h1>Setting</h1>
      <Card>
        <Tabs tabPosition={position} moreIcon={<></>}>
          <TabPane
            key="1"
            tab={
              <span>
                <span role={"img"} className="anticon mr-2">
                  <HiOutlineUser {...iconProps} />
                </span>
                Profile
              </span>
            }
          >
            <EditProfile />
          </TabPane>
          <TabPane
            key="2"
            tab={
              <span>
                <span role={"img"} className="anticon mr-2">
                  <HiOutlineLockClosed {...iconProps} />
                </span>
                Change password
              </span>
            }
          >
            <ChangePassword />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Setting;
