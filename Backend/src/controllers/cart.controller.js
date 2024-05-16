const { validationResult } = require('express-validator');
const CartModel = require("../models/cart.model");

let cartModel = new CartModel();

exports.getCarts = async (req, res, next) => {
    console.log(req.params)
    const MaSoTaiKhoan = req.params["masotk"]
    console.log(MaSoTaiKhoan)
    cartModel.getAlltems(MaSoTaiKhoan, (error, result) => {
        if (error) {
            console.log(error)
            next(error)
        } else if (result) {
            res.send(result)
        }
    })
};

exports.addItemToCart= async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            message: errors.array()[0].msg
        });
        return;
    }
    const MaSoTaiKhoan = req.params["masotk"]
    console.log(MaSoTaiKhoan)
    const { MaSoSach } = req.body;
    cartModel.addItemToCart({ MaSoTaiKhoan, MaSoSach }, (error, result) => {
        if (result) {
            res.status(200).send(result);
        } else if (error) {
            console.log(error)
            res.status(500).json({ message: "Insert Item to cart faild!" })
        }
    });
};

exports.updateCartItem= async (req, res, next) => {
    const MaSoTaiKhoan = req.params["masotk"]
    const MaSoSach = req.params["MaSoSach"]
    const { SoLuong } = req.body;
    cartModel.updateCartItem({ MaSoTaiKhoan, MaSoSach, SoLuong},  (error, result) => {
        if (result) {
            res.status(200).send(result);
        } else if (error) {
            console.log(error)
            res.status(500).json({ message: "Update Users faild!" })
        }
    })
}

exports.deleteCartItem= async (req, res, next) => {
    const MaSoTaiKhoan = req.params["masotk"]
    const MaSoSach = req.params["MaSoSach"]
    
    console.log(MaSoTaiKhoan, MaSoSach)
    cartModel.deleteCartItem(MaSoTaiKhoan, MaSoSach,  (error, result) => {
        if (result) {
            res.status(200).send(result);
        } else if (error) {
            console.log(error)
            res.status(500).json({ message: "Delete faild!" })
        };
    })
};





