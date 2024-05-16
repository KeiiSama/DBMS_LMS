const model = require("../models/adminAuth.model");

exports.signup = (req, res) => {
  const { username, password, confirmPassword, hovaten } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Mật khẩu không khớp" });
  }

  model.signupAdmin(username, password, hovaten, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Đã có lỗi xảy ra" });
    } else {
      res.status(201).json({ message: "Đăng ký thành công" });
    }
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  model.loginAdmin(username, password, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Đã có lỗi xảy ra123" });
    } else {
      if (results.length > 0) {
        // Authentication successful
        const {TenTaiKhoan, MaSoTaiKhoan, VaiTro} =  results[0]
        res.status(200).json({ message: "Đăng nhập thành công", user: {id: MaSoTaiKhoan, username: TenTaiKhoan, role: VaiTro} });
      } else {
        // Authentication failed
        res
          .status(401)
          .json({ message: "Tên đăng nhập hoặc mật khẩu không đúng" });
      }
    }
  });
};
