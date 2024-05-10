const express = require("express")
const cartController = require("../controllers/cart.controller")


const cartRouter = express.Router() ;

cartRouter.get("/users/:masotk/carts", cartController.getCarts)
cartRouter.post("/users/:masotk/carts", cartController.addItemToCart )
cartRouter.patch("/users/:masotk/carts/:MaSoSach", cartController.updateCartItem)
cartRouter.delete("/users/:masotk/carts/:MaSoSach", cartController.deleteCartItem)

module.exports = cartRouter ;

