const { body } = require("express-validator")

class BorrowRequestValidator {
    static createBorrowRequestValidator = [
        body("NgayTraSach").trim().notEmpty().withMessage("NgayTraSach is required").isDate().withMessage("NgayTraSach không đúng định dạng ngày"),
        body("MaSoDocGia").trim().notEmpty().withMessage("MaSoDocGia is required"),
        body("SachMuon").notEmpty().withMessage("SachMuon is required").
        isArray().withMessage("SachMuon must be an array").custom((values, { req }) => {
            for (const item of values) {
                if (typeof item !== 'object' || !item.MaSoSach || typeof item.MaSoSach !== 'string' || !item.SoLuong || typeof item.SoLuong !== 'number') {
                    throw new Error('Định dạng sách mượn không phù hợp với [{MaSoSach: <mã số sách>, SoLuong: <số lượng mượn>},...]');
                }
            }
            return true
        }),
    ]
}

module.exports = BorrowRequestValidator