const UserModel = require("../models/user.model");
const db = require("../loaders/db");
const { validationResult } = require('express-validator');

let userModel = new UserModel();

exports.getAllUsers = async (req, res, next) => {
    const queryOptions = { ...req.query }
    userModel.getAll(queryOptions, (error, result) => {
        if (error) {
            console.log(error)
            next(error)
        } else if (result) {
            res.send(result)
        }
    })
};

// exports.getUserDetails = (req, res) => {
//     const query = "SELECT * FROM Sach WHERE MaSoSach = ?";
//     const params = [MaSoSach];

//     db.query(query, params, (error, results) => {
//         if (error) throw error;
//         res.json(results[0]);
//     });
// };

exports.createNewUser= async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            message: errors.array()[0].msg
        });
        return;
    }
    const { TenTaiKhoan, MatKhau, HoVaTen, NgaySinh, VaiTro, DiaChi, SoDienThoai } = req.body;
    userModel.create({ TenTaiKhoan, MatKhau, HoVaTen, NgaySinh, VaiTro, DiaChi, SoDienThoai }, (error, result) => {
        if (result) {
            res.status(200).send(result);
        } else if (error) {
            console.log(error)
            res.status(500).json({ message: "Insert Users faild!" })
        }
    });
};

exports.updateUser= async (req, res, next) => {
    const MaSoTaiKhoan = req.params["id"];
    const { TenTaiKhoan, MatKhau, HoVaTen, NgaySinh, VaiTro, DiaChi, SoDienThoai } = req.body;
    userModel.update(MaSoTaiKhoan, { TenTaiKhoan, MatKhau, HoVaTen, NgaySinh, VaiTro, DiaChi, SoDienThoai },  (error, result) => {
        if (result) {
            res.status(200).send(result);
        } else if (error) {
            console.log(error)
            res.status(500).json({ message: "Update Users faild!" })
        }
    })
}

exports.deleteUser= async (req, res, next) => {
    const MaSoTaiKhoan = req.params["id"];
    userModel.delete(MaSoTaiKhoan,  (error, result) => {
        if (result) {
            res.status(200).send(result);
        } else if (error) {
            console.log(error)
            res.status(500).json({ message: "Delete Usersfaild!" })
        };
    })
};





