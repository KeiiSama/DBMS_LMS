const model = require("../models/auth.model");

exports.signup = (req, res) => {
  const { username, password, confirmPassword, hovaten } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Mật khẩu không khớp" });
  }

  model.signupUser(username, password, hovaten, (error, results) => {
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

  model.authenticateUser(username, password, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Đã có lỗi xảy ra" });
    } else {
      if (results.length > 0) {
        // Authentication successful
        // console.log(results)
        const {TenTaiKhoan, MaSoTaiKhoan, VaiTro, num_of_cart_items} =  results[0]
        res.status(200).json({ message: "Đăng nhập thành công", user: {id: MaSoTaiKhoan, username: TenTaiKhoan, role: VaiTro, num_of_cart_items} });
      } else {
        // Authentication failed
        res
          .status(401)
          .json({ message: "Tên đăng nhập hoặc mật khẩu không đúng" });
      }
    }
  });
};
