import { Col, Row } from "antd";
import styles from "./index.module.less";
import github from "@/assets/svg/github.svg";

const ProfileCard = ({ user }: any) => {
  return (
    <div className={styles.container}>
      <Row>
        <Col span={24} className={styles.bg} />
        <Col span={24} className={styles.content}>
          <img src={user.imgUrl} alt="avatar" />
          <h4>{user.name}</h4>
          <p>{user.title}</p>
          <div className={styles.social}>
            <a href={user.github} aria-label="github" target="_blank">
              <img src={github} alt="github" />
            </a>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileCard;
