import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./footer.css";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
export default function Hpfooter() {
  return (
    <footer>
      <Container>
        <Row className="d-flex justify-content-md-between align-items-center ">
          <Col
            sm={12}
            md={4}
            className="footer-brand d-flex justify-content-sm-center  justify-content-md-start"
          >
            <a href="/">gooly.</a>
          </Col>
          <Col
            className="d-flex justify-content-sm-center  justify-content-md-center"
            sm={12}
            md={4}
          >
            <small className="text-muted">
              © 2022 Gooly. All rights reserved
            </small>
          </Col>
          <Col
            sm={12}
            md={4}
            className="d-flex justify-content-md-end justify-content-sm-center"
          >
            <ul className="nav-list">
              <li className="list-item">
                <a href="https://www.facebook.com/Lan.Arch22/" target="_blank">
                  <BsFacebook fontSize={24} />
                </a>
              </li>
              <li className="list-item">
                <a
                  href="https://www.instagram.com/thelancethe/"
                  target="_blank"
                >
                  <BsInstagram fontSize={24} />
                </a>
              </li>
              <li className="list-item">
                <a href="https://twitter.com/thelancethe" target="_blank">
                  <BsTwitter fontSize={24} />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
