const {body} = require("express-validator")

class BookValidator {
    static createBookValidator = [
        body("TenSach").trim().notEmpty().withMessage("TenSach is required"),
        body("TacGia").trim().notEmpty().withMessage("TacGia is required"),
        body("NhaPhatHanh").trim().notEmpty().withMessage("NhaPhatHanh is required"),
        body("TenDanhMuc").trim().notEmpty().withMessage("DanhMuc is required"),
        body("SoLuong").trim().default(0),
        body("TrangThai").trim().default("HoatDong"),    
    ]
}

module.exports = BookValidator