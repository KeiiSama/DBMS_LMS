import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useAuth } from "../../AuthContext";
import BackgroundImage from "../../assets/images/background.png";
import Logo from "../../assets/images/logo.png";
import { Form, Button, Alert } from "react-bootstrap";
import "./register.css";
// import styles from "./Dangnhap.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData, isAdmin] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    hovaten: "",
  });

  const { setLoggedIn } = useAuth();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleLoginRequest = async (apiEndpoint, isAdmin) => {
    try {
      const response = await axios.post(apiEndpoint, formData);
      console.log(response.data);
      if (response.status === 201) {
        localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
        // setIsModalOpen(true);
        toast.success("Đăng ký thành công!");
        navigate("/Login");
      }
    } catch (error) {
      console.error("Đã có lỗi xảy ra", error);
      // setIsModalOpen(true);
      toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAdmin = document.getElementById("isAdmin").checked;
    if (isAdmin) {
      console.log("call admin");
      handleLoginRequest("http://localhost:3001/api/Adminsignup", true);
    } else {
      handleLoginRequest("http://localhost:3001/api/signup", false);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     let url;
  //     if (isAdmin) {
  //       url = "http://localhost:3001/api/Adminsignup";
  //     } else {
  //       url = "http://localhost:3001/api/signup";
  //     }

  //     const response = await axios.post(url, formData);
  //     console.log(response.data);
  //     // setIsModalOpen(true);
  //     toast.success("Đăng ký thành công!");
  //   } catch (error) {
  //     console.error("Đã có lỗi xảy ra", error);
  //     // setIsModalOpen(true);
  //     toast.error("Đã có lỗi xảy ra. Vui lòng thử lại!");
  //   }
  // };

  const onClicklogin = () => {
    navigate("/Login");
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  return (
    <div
      className="sign-in__wrapper"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {/* <p>
        Chào mừng bạn trở lại!
        <br />
        Hãy đăng nhập ngay bây giờ.
      </p> */}
      <div className="sign-in__backdrop"></div>
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        <img
          className="img-thumbnail mx-auto d-block mb-2"
          src={Logo}
          alt="logo"
        />
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Incorrect username or password.
          </Alert>
        ) : (
          <div />
        )}
        <Form.Group className="mb-2" controlId="hovaten">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            type="text"
            name="hovaten"
            placeholder="Your full name"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            // value={formData.username}
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            // value={formData.password}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="confirmpassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type="Confirmpassword"
            // value={formData.password}
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="checkbox">
          <div>
            <input type="checkbox" id="isAdmin" />
            <label htmlFor="isAdmin">Bạn là nhân viên?</label>
          </div>
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
          {/* <Button
            className="text-muted px-0"
            variant="link"
            onClick={handlePassword}
          >
            Forgot password?
          </Button> */}
          {/* <div className={styles.sub}> */}
          {/* <div className={styles.isAdmid}> */}
        </div>
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

      {/* <Modal
        className={styles.loginPopup}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Thông báo"
        appElement={document.getElementById("root")}
      >
        <div className={styles.popupContent}>{modalContent}</div>
        <button onClick={closeModal} className={styles.popupButton}>
          Đóng
        </button>
      </Modal> */}
    </div>
  );
}

function Login() {
  const { loggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <React.Fragment>
      <LoginForm />
    </React.Fragment>
  );
}

export default Login;
