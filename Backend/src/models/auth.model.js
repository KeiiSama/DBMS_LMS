const db = require("../loaders/db");

exports.signupUser = (username, password, hovaten, callback) => {
  const sql = "CALL InsertTaiKhoan(?, ?, ?,'reader')";
  db.query(sql, [username, password, hovaten], callback);
};

exports.authenticateUser = (username, password, callback) => {
  const sql =
    "SELECT * FROM taikhoan,DocGia WHERE TenTaiKhoan = ? AND MatKhau = ? and taikhoan.MaSoTaiKhoan=DocGia.MaSoDocGia";
  db.query(sql, [username, password], callback);
};

module.exports = exports;
