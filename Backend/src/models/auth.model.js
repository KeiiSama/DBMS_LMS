const db = require("../loaders/db");

exports.signupUser = (username, password, hovaten, callback) => {
  const sql =
    "CALL InsertTaiKhoan(?, ?, ?,'2000-01-01','reader','DAI HỌC BK TPHCM','09999999999')";
  db.query(sql, [username, password, hovaten], callback);
};

exports.authenticateUser = (username, password, callback) => {
  // const sql =
  //   "SELECT * FROM taikhoan,DocGia WHERE TenTaiKhoan = ? AND MatKhau = ? and taikhoan.MaSoTaiKhoan=DocGia.MaSoDocGia";

  const sql =`
  SELECT t.*, COUNT(*) as num_of_cart_items  
  FROM taikhoan t 
  JOIN DocGia d ON t.MaSoTaiKhoan = d.MaSoDocGia 
  WHERE t.TenTaiKhoan = ? AND t.MatKhau = ?
  GROUP BY t.MaSoTaiKhoan, t.TenTaiKhoan, t.MatKhau;`;
  db.query(sql, [username, password], callback);
};

module.exports = exports;
