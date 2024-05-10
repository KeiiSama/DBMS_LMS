const express = require("express")
const BorrowRequestController = require("../controllers/borrowRequest.controllelr")
const BorrowRequestValidator = require("../middlewares/Validators/BorrowRequestValidator")

let borrowRequestRouter = express.Router()

borrowRequestRouter.get("/all", BorrowRequestController.getAllBorrowRequests)
// borrowRequestRouter.get("/id", BorrowRequestController.getAllBorrowRequests)
borrowRequestRouter.post("/", BorrowRequestValidator.createBorrowRequestValidator, BorrowRequestController.createNewBorrowRequest)
borrowRequestRouter.patch("/:id", BorrowRequestController.updateBorrowRequestStatus)
// borrowRequestRouter.delete("/:id", BorrowRequestController.getAllBorrowRequests)

module.exports = borrowRequestRouter
