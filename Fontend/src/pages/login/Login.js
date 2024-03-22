import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import { useAuth } from "../../AuthContext";
import BackgroundImage from "../../assets/images/background.png";
import Logo from "../../assets/images/logo.png";
import { Form, Button, Alert } from "react-bootstrap";
import "./login.css";
// import styles from "./Dangnhap.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginForm() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { setLoggedIn } = useAuth();

  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onClickregister = () => {
    navigate("/Register");
  };
  const handleLoginRequest = async (apiEndpoint, isAdmin) => {
    try {
      const response = await axios.post(apiEndpoint, formData);
      console.log(response.data);
      if (response.status === 200) {
        handleLogin(formData, isAdmin);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdmin", isAdmin ? "true" : "false");
        toast.success("Đăng nhập thành công.");
        navigate("/");
      }
    } catch (error) {
      console.error("Đã có lỗi xảy ra", error);
      setIsModalOpen(true);
      toast.error("Tên đăng nhập hoặc mật khẩu không đúng. Vui lòng thử lại!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isAdmin = document.getElementById("isAdmin").checked;
    if (isAdmin) {
      handleLoginRequest("http://localhost:3001/api/Adminlogin", true);
    } else {
      handleLoginRequest("http://localhost:3001/api/login", false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
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
        <Form.Group className="mb-2" controlId="checkbox">
          {/* <Form.Check type="checkbox" label="Remember me" /> */}
          <div>
            <input type="checkbox" id="isAdmin" />
            <label htmlFor="isAdmin">Bạn là nhân viên?</label>
          </div>
        </Form.Group>
        {!loading ? (
          <Button className="w-100" variant="primary" type="submit">
            Log In
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
          {/* <div>
            <a href="#">Quên mật khẩu?</a>
          </div> */}
        </div>
        <div className="d-grid justify-content-end">
          Not a member?{" "}
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={onClickregister}
          >
            Register
          </Button>
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
