const express = require("express")
const BorrowRequestController = require("../controllers/borrowRequest.controllelr")
const BorrowRequestValidator = require("../middlewares/Validators/BorrowRequestValidator")

let borrowRequestRouter = express.Router()

borrowRequestRouter.get("/all", BorrowRequestController.getAllBorrowRequests)
// borrowRequestRouter.get("/id", BorrowRequestController.getAllBorrowRequests)
borrowRequestRouter.post("/", BorrowRequestValidator.createBorrowRequestValidator, BorrowRequestController.createNewBorrowRequest)


borrowRequestRouter.patch("/:MaDonMuon/reject", BorrowRequestController.rejectBorrowRequest)
borrowRequestRouter.patch("/:MaDonMuon/accept", BorrowRequestController.acceptBorrowRequest)
// borrowRequestRouter.delete("/:id", BorrowRequestController.getAllBorrowRequests)

module.exports = borrowRequestRouter
