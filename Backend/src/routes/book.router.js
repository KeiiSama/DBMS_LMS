let express = require("express")
let bookController = require("../controllers/book.controller")
let bookRouter = express.Router()

bookRouter.get("/all", bookController.getAllBook)
bookRouter.post("/", bookController.createNewBook)
bookRouter.put("/:id", bookController.updateBook)
bookRouter.delete("/:id", bookController.deleteBook)

module.exports = bookRouter