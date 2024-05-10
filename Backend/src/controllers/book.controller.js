const { validationResult } = require("express-validator");
const BookModel = require("../models/book.model");
const db = require("../loaders/db");
let bookModel = new BookModel();
exports.getAllBook = async (req, res, next) => {
  console.log("nguyenquy");
  const query = "SELECT * FROM Sach";
  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).send("Internal Server Error");
    } else {
      res.json(results.data);
    }
  });
};

exports.getBookDetails = (req, res) => {
  const MaSoSach = "S001";
  const query = "SELECT * FROM Sach WHERE MaSoSach = ?";
  const params = [MaSoSach];

  db.query(query, params, (error, results) => {
    if (error) throw error;
    res.json(results[0]);
  });
};

exports.filterBooks = (req, res) => {
  const selectedCategories = req.query.categories.split(","); // Split categories if they are sent as a comma-separated string
  console.log("selectedCategories", selectedCategories);

  // Generate a placeholder string for each category in the list
  const placeholders = selectedCategories.map(() => "?").join(",");

  // SQL query with IN clause and parameters
  const query = `SELECT * FROM Sach JOIN DanhMuc ON Sach.DanhMuc = DanhMuc.MaSoDanhMuc WHERE DanhMuc.ten IN (${placeholders})`;
  const params = selectedCategories;
  console.log(params);

  db.query(query, params, (error, results) => {
    if (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "An internal server error occurred" });
    } else {
      res.json(results);
    }
  });
};

exports.createNewBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: errors.array()[0].msg,
    });
    return;
  }
  const { TenSach, TacGia, NhaPhatHanh, SoLuong, TrangThai, TenDanhMuc, Mota } =
    req.body;
  bookModel.create(
    { TenSach, TacGia, NhaPhatHanh, SoLuong, TrangThai, TenDanhMuc, Mota },
    (error, result) => {
      if (result) {
        res.status(200).send(result);
      } else if (error) {
        console.log(error);
        res.status(500).json({ message: "Insert book faild!" });
      }
    }
  );
};

exports.updateBook = async (req, res, next) => {
  const MaSoSach = req.params["id"];
  const { TenSach, TacGia, NhaPhatHanh, SoLuong, TrangThai, TenDanhMuc, Mota } =
    req.body;
  bookModel.update(
    MaSoSach,
    { TenSach, TacGia, NhaPhatHanh, SoLuong, TrangThai, TenDanhMuc, Mota },
    (error, result) => {
      if (result) {
        res.status(200).send(result);
      } else if (error) {
        console.log(error);
        res.status(500).json({ message: "Update book faild!" });
      }
    }
  );
};

exports.deleteBook = async (req, res, next) => {
  const MaSoSach = req.params["id"];
  bookModel.delete(MaSoSach, (error, result) => {
    if (result) {
      res.status(200).send(result);
    } else if (error) {
      console.log(error);
      res.status(500).json({ message: "Delete book faild!" });
    }
  });
};

exports.getAllBooks = async (req, res, next) => {
  const queryOptions = { ...req.query };
  bookModel.getAllBook(queryOptions, (error, result) => {
    if (error) {
      console.log(error);
      next(error);
    } else if (result) {
      res.send(result);
    }
  });
};
