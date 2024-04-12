const BookModel = require("../models/book.model");
const db = require("../loaders/db");
// let bookModel = new BookModel();

exports.getAllBook = async (req, res, next) => {
  console.log("im here2");
  // const result = await bookModel.getAllBook();
  // res.status(200).send({
  //   result,
  // });

  BookModel.getAllBook((error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "Đã có lỗi xảy ra" });
    } else {
      res.status(201).json(results);
    }
  });
};

exports.getBookDetails = (req, res) => {
  const MaSoSach = req.params.bookId;
  const query = "SELECT * FROM Sach WHERE MaSoSach = ?";
  const params = [MaSoSach];

  db.query(query, params, (error, results) => {
    if (error) throw error;
    res.json(results[0]);
  });
};

exports.createNewBook = async (req, res, next) => {
  const { title, price, author } = req.body;
  const result = await bookModel.create({ title, price, author });
  res.status(200).send({
    result,
  });
};
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

// 1 cái là show danh sách book
// Quý
// 1 cái là nhấn vô book thì ra chi tiết
// Quý
// Cơ mà gộp 2 cái thành 1 đc k nhỉ, kiểu vẫn làm 1 api thôi, còn vấn đề nhấn vô hiện ra là fe xử lý
// Quý
// Trần Đại Quý
// Vs tui k biết có cần thiết làm cái sreach k
