import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./index.module.less";

const AppFooter: FC = () => {
  return (
    <div className={styles.wrapper}>
      <p>
        Copyright © 2024 | <Link to="/about">Parking</Link>
      </p>
    </div>
  );
};

export default AppFooter;
