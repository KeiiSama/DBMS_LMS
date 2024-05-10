const bookRouter = require("./book.router")
const express = require("express")
const borrowRequestRouter = require("./borrowRequest.router")
const cartRouter = require("./cart.router")
const userRouter = require("./user.router")
const router = express.Router()

router.use(cartRouter)
router.use("/books", bookRouter)
router.use("/borrow-requests", borrowRequestRouter)
router.use("/users", userRouter)



router.get("/", (req, res) => {
    res.send("Hello world!")
})


module.exports = router