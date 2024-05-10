const db = require("../loaders/db");
const { validationResult } = require('express-validator');
const BorrowRequestModel = require("../models/borrowRequest.model");

let borrowRequestModel = new BorrowRequestModel();

exports.getAllBorrowRequests = async (req, res, next) => {
    const queryOptions = { ...req.query }
    borrowRequestModel.getAll(queryOptions, (error, result) => {
        if (error) {
            console.log(error)
            next(error)
        } else if (result) {
            res.send(result)
        }
    })
};

// exports.getBorrowRequestDetails = (req, res) => {
//     const query = "SELECT * FROM Sach WHERE MaSoSach = ?";
//     const params = [MaSoSach];

//     db.query(query, params, (error, results) => {
//         if (error) throw error;
//         res.json(results[0]);
//     });
// };

exports.createNewBorrowRequest= async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            message: errors.array()[0].msg
        });
        return;
    }
    const { MaSoDocGia, NgayTraSach, SachMuon } = req.body;

    borrowRequestModel.create({ MaSoDocGia, NgayTraSach, SachMuon  }, (error, result) => {
        if (result) {
            res.status(200).send(result);
        } else if (error) {
            console.log("Lỗi khi thêm đơn mượn sách", error)
            res.status(500).json({ message: "Insert BorrowRequests faild!", error })
        }
    });
};

exports.updateBorrowRequestStatus = async (req, res, next) => {
    const MaSoTaiKhoan = req.params["id"];
    const { TrangThai } = req.body

    borrowRequestModel.update(MaSoTaiKhoan, TrangThai, (error, result) => {
        if (result) {
            res.status(200).send(result);
        } else if (error) {
            console.log(error)
            res.status(500).json({ message: "Update BorrowRequests faild!", error: error })
        }
    });
}

// exports.deleteBorrowRequest= async (req, res, next) => {
//     const MaSoTaiKhoan = req.params["id"];
// };





