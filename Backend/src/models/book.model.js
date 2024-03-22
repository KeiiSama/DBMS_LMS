const pool = require("../loaders/db");

class Book {
    async getAllBook(params) {
        var query = `SELECT * FROM BOOK`;
        const result = await pool.query(query) ;
        return result[0] ;
    }

    async create(newBook) {
        var query = `INSERT INTO BOOK(title, price, author) VALUES (?, ?, ?)`;
        const {title, price, author} = newBook
        try {
            const res = await pool.query(query, [title, price, author])

            return res[0]
        } catch (error) {
            console.error("Error in create():", error);
        }
    }

    async update(id, book) {
        var query = `UPDATE BOOK SET title = ?, price = ?, author = ? WHERE id = ?`;
        const { title, price, author } = book;
        try {
            const res = await pool.query(query, [title, price, author, id]);
            return res[0];
        } catch (error) {
            console.error("Error in update():", error);
        }
    }

    async delete(id) {
        var query = `DELETE FROM BOOK WHERE id = ?`;
        try {
            const res = await pool.query(query, [id]);
            return res[0];
        } catch (error) {
            console.error("Error in delete():", error);
        }
    }
}

module.exports = Book;
