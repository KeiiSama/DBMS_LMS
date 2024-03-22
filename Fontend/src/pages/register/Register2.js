import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "./register.css";
import { NavLink, useNavigate } from "react-router-dom";
import BackgroundImage from "../../assets/images/background.png";
import Logo from "../../assets/images/logo.png";

const Register = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputYourname, setInputYourname] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    await delay(500);
    console.log(`Username :${inputUsername}, Password :${inputPassword}`);
    if (inputUsername !== "admin" || inputPassword !== "admin") {
      setShow(true);
    } else {
      setShow(false);
      // Navigate to some success page or perform other actions upon successful registration
    }
    setLoading(false);
  };

  const onClicklogin = () => {
    navigate("/Login");
  };

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* Overlay */}
      <div className="sign-in__backdrop"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        <div className="h4 mb-2 text-center">Sign Up</div>
        {/* Alert */}
        {show && (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect username or password.
          </Alert>
        )}
        <Form.Group className="mb-2" controlId="yourname">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            value={inputYourname}
            placeholder="Your full name"
            onChange={(e) => setInputYourname(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={inputUsername}
            placeholder="Username"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Password"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            required
          />
        </Form.Group>

        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Sign up
          </Button>
        ) : (
          <Button className="w-100" variant="primary" type="submit" disabled>
            Logging In...
          </Button>
        )}
        <div className="d-grid justify-content-end">
          <div className="text-muted px-0">
            Already a member?{" "}
            <Button
              className="text-muted px-0"
              variant="link"
              onClick={onClicklogin}
            >
              Login
            </Button>
          </div>
        </div>
      </Form>
      {/* Footer */}
      <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Hendrik C | &copy;2022
      </div>
    </div>
  );
};

export default Register;
