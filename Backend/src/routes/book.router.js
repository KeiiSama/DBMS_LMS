let express = require("express");
let bookController = require("../controllers/book.controller");
const BookValidator = require("../middlewares/Validators/bookValidator");
let bookRouter = express.Router();
bookRouter.get("/filterbook", bookController.filterBooks);
bookRouter.get("/all", bookController.getAllBooks);
bookRouter.get("/:id", bookController.getBookDetails);
bookRouter.post(
  "/",
  BookValidator.createBookValidator,
  bookController.createNewBook
);
bookRouter.put("/:id", bookController.updateBook);
bookRouter.patch("/:id", bookController.updateBook);
bookRouter.delete("/:id", bookController.deleteBook);
module.exports = bookRouter;
