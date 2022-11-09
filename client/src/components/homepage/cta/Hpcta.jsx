import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./cta.css";
import { CgArrowRight } from "react-icons/cg";
import { Link } from "react-router-dom";
export default function Hpcta() {
  return (
    <div className="hp-full-secondary">
      <Container>
        <Row>
          <Col md={7} className="cta-img "></Col>
          <Col className="cta-right" md={5}>
            <h1 className="fw-bold">Join us now!</h1>
            <p className="sec-desc">
              Sign up now and get details about the performance of your links.
            </p>
            <Link
              style={{ textDecoration: "none" }}
              to="/register"
              className="d-flex align-items-center fw-bold cta-btn"
            >
              Get Started &nbsp; <CgArrowRight fontSize={24} />{" "}
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
