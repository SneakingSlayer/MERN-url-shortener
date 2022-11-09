import React, { useEffect, useRef, useState, useContext } from "react";
import { Form, Row, Col, Container } from "react-bootstrap";
import "../loginpage/auth.css";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";
import { BASE_URL, config } from "../../globals/globals";
export default function RegisterPage() {
  const [passErr, setPassErr] = useState(false);
  const [regErr, setRegErr] = useState(false);
  const firstRef = useRef();
  const lastRef = useRef();
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passRef.current.value !== confirmPassRef.current.value) {
      setPassErr(true);
      return;
    }
    setRegErr(false);
    setPassErr(false);
    await axios
      .post(
        `${BASE_URL}/auth/signup`,
        {
          firstname: firstRef.current.value,
          lastname: lastRef.current.value,
          email: emailRef.current.value,
          password: passRef.current.value,
        },
        {
          headers: config,
        }
      )
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        setRegErr(true);
      });
  };
  useEffect(() => {
    document.title = "Gooly - Sign Up";
  });

  if (user !== null) return <Navigate to="/dashboard" />;

  return (
    <>
      <Container className="vh-100 d-flex align-items-center justify-content-center">
        <Row className="d-flex justify-content-center text-center auth-group">
          <div>
            <h1>
              <Link className="brand" to="/">
                gooly.
              </Link>
            </h1>
            <p className="small text-muted">Fill up to create an account.</p>
            {regErr ? (
              <p className="text-danger">Email already exists.</p>
            ) : null}
          </div>
          <Col md={10}>
            {passErr ? (
              <span className="text-danger">Password does not match.</span>
            ) : null}
            <Form onSubmit={handleSubmit} className="text-center">
              <div className="form-group">
                <input
                  ref={firstRef}
                  className="form-input"
                  type="text"
                  placeholder="First Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  ref={lastRef}
                  className="form-input"
                  type="text"
                  placeholder="Last Name"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  ref={emailRef}
                  className="form-input"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  ref={passRef}
                  className="form-input"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  ref={confirmPassRef}
                  className="form-input"
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <div className="form-group">
                <button className="form-btn">Sign Up</button>
              </div>
              <span>
                Already have an account? <Link to="/login">Sign In here</Link>
              </span>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
