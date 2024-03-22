const BookModel = require("../models/book.model")

let bookModel = new BookModel()

exports.getAllBook = async (req, res, next) => {
    const result = await bookModel.getAllBook()

    res.status(200).send({
        result
    })
}

exports.createNewBook = async (req, res, next) => {
    const { title, price, author } = req.body
    const result = await bookModel.create({ title, price, author })
    res.status(200).send({
        result
    })
}
exports.updateBook = async (req, res, next) => {
    const { id } = req.params;
    const { title, price, author } = req.body;
    try {
        const result = await bookModel.update(id, { title, price, author });
        res.status(200).send({ result });
    } catch (error) {
        console.error("Error in updateBook:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};

exports.deleteBook = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await bookModel.delete(id);
        res.status(200).send({ result });
    } catch (error) {
        console.error("Error in deleteBook:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};