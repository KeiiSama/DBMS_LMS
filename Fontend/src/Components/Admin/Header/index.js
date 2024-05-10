import {
  AiOutlineArrowDown,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineSetting,
  AiOutlineUser,
} from "react-icons/ai";
import logo from "../../../assets/images/logo.png";
import { Button, Dropdown } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../AuthContext";
function Header() {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const handleLogOut = () => {
    handleLogout();
    navigate("/Login");
  };
  const items = [
    {
      label: <Link to="/profile">{"Profile"}</Link>,
      key: "1",
      icon: <AiOutlineUser />,
    },
    {
      label: <Link to="/settings">{"Setting"}</Link>,
      key: "3",
      icon: <AiOutlineSetting />,
    },
    {
      label: "Logout",
      key: "2",
      icon: <AiOutlineLogout />,
      danger: true,
      onClick: handleLogOut,
    },
  ];
  return (
    <div
      className="w-100 position-fixed top-0 d-flex justify-content-between align-items-center bg-white py-1 shadow-sm z-1"
      style={{ height: "var(--header-height)" }}
    >
      <div
        className="h-100 ps-4 d-flex align-items-center"
        style={{ width: "var(--sidebar-width)" }}
      >
        <AiOutlineMenu cursor={"pointer"} size={30} />
        <img width={60} className="mx-2 mt-2" src={logo} />
      </div>

      <h6 className="ms-2 my-0">Chào mừng quay trở lại, Admin!</h6>

      <div className="ms-auto me-5">
        <Dropdown menu={{ items }} trigger="click">
          <Button className="d-flex align-items-center border-0 px-2 py-1">
            <img
              src="https://cdn-icons-png.flaticon.com/256/163/163801.png"
              alt="avatar"
              width={30}
              height={30}
              className="rounded-full me-2"
            />
            <span>Admin</span>
            <AiOutlineArrowDown className="ms-2" />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
}

export default Header;
