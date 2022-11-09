import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import img from "../../assests/images/error.svg";
import { CgArrowRight } from "react-icons/cg";
export default function Error404() {
  useEffect(() => {
    document.title = "Gooly - ERROR";
  }, []);

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row>
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
            <p>We're sorry, this page does not exist.</p>
            <a className="error-cta fw-bold" href="/">
              Go back <CgArrowRight fontSize={36} />
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
