import { Col, Row } from "antd";
import ProfileCard from "@/components/AboutPage/AboutCard";

const AboutPage = () => {
  const team = [
    {
      name: "Đăng Khoa",
      imgUrl:
        "https://cdn.vectorstock.com/i/2000v/40/08/black-background-and-white-letter-k-grunge-vector-27974008.avif",
      title: "Software engineer",
      github: "https://github.com/khoavo1709",
    },
    {
      name: "Đại Lợi",
      imgUrl:
        "https://cdn.vectorstock.com/i/2000v/27/49/grunge-letter-l-vector-5262749.avif",
      title: "Software engineer",
      github: "https://github.com/dailoi280702",
    },
    {
      name: "Phước Bình",
      imgUrl:
        "https://cdn.vectorstock.com/i/1000v/58/25/blot-letter-b-black-and-white-vector-19805825.avif",
      title: "Software engineer",
      github: "https://github.com/",
    },
  ];
  return (
    <Row gutter={[20, 20]} justify="center">
      <Col span={24}>
        <h3 className="font-semibold text-xl self-center">Our team</h3>
      </Col>
      {team.map((item) => (
        <Col xs={24} sm={12} md={6} key={item.name}>
          <ProfileCard user={item} />
        </Col>
      ))}
    </Row>
  );
};

export default AboutPage;
