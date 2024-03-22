const bookRouter = require("./book.router")
const express = require("express")
const router = express.Router()

router.use("/books", bookRouter)


router.get("/", (req, res) => {
    res.send("Hello world!")
})


module.exports = router