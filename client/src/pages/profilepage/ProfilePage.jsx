import React, { useEffect, useState } from "react";
import Upnavbar from "../../components/userpage/navbar/Upnavbar";
import { Container, Col, Row, Form } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BASE_URL, config } from "../../globals/globals";
import { formatDate } from "../../utils";
import img from "../../assests/images/error.svg";
import { CgArrowRight } from "react-icons/cg";
export default function ProfilePage(props) {
  const params = useParams();
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  console.log(err);
  const fetchInfo = async () => {
    await axios
      .get(`${BASE_URL}/api/user/info/${params.id}`, {
        headers: config,
      })
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((err) => {
        setErr(true);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  useEffect(() => {
    document.title = "Gooly - Profile";
  }, []);

  return (
    <>
      <Upnavbar />
      <Container className="mt-4">
        {err ? (
          <Row className="mt-4">
            <Col
              sm={12}
              md={6}
              className="d-flex align-items-center justify-content-center"
            >
              <img src={img} width="85%" height="auto" alt="hero" />
            </Col>
            <Col
              sm={12}
              md={6}
              className="d-flex align-items-center justify-content-center"
            >
              <div>
                <h1 className="fw-bold display-3 hero-title">ERROR 404</h1>
                <p>We're sorry, this page is not available.</p>
                <a className="error-cta fw-bold" href="/">
                  Go back <CgArrowRight fontSize={36} />
                </a>
              </div>
            </Col>
          </Row>
        ) : null}
        {data.length > 0 ? (
          <Row className="d-flex flex-column pt-4">
            <Col className="pt-4 d-flex flex-column">
              <div className="d-flex flex-column align-items-center">
                <div className="mb-3">
                  <FaUserCircle color="#323B45" fontSize={100} />
                </div>
                <div className="text-center">
                  <h2 className="fw-bold mb-0">
                    {data[0].firstname + " " + data[0].lastname}
                  </h2>
                  <p className="mb-0 text-muted">Gooly Member</p>
                </div>
              </div>
              <div>
                <p className="mb-2 mt-4 text-muted text-center small">
                  Joined in {formatDate(data[0].date_created)}
                </p>
              </div>
            </Col>
            <Col className="mt-4 d-flex justify-content-center">
              <div style={{ width: "100%", maxWidth: "400px" }}>
                <div className="mt-2 mb-2 d-flex justify-content-between align-items-center">
                  <p className="fw-bold mb-0">First name</p>
                  <span className="text-muted">{data[0].firstname}</span>
                </div>
                <div className="mt-2 mb-2 d-flex justify-content-between align-items-center">
                  <p className="fw-bold mb-0">Last name</p>
                  <span className="text-muted">{data[0].lastname}</span>
                </div>
                <div className="mt-2 mb-2  d-flex justify-content-between align-items-center">
                  <p className="fw-bold mb-0">Email</p>
                  <span className="text-muted">{data[0].email}</span>
                </div>
                <div className="mt-2 mb-2  d-flex justify-content-between align-items-center">
                  <p className="fw-bold mb-0">Date Joined</p>
                  <span className="text-muted">
                    {formatDate(data[0].date_created)}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        ) : null}
      </Container>
    </>
  );
}
