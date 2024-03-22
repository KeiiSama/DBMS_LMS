// const mysql = require("mysql2/promise");

// let { env } = require("../config");

// const dbConfig = {
//   host: env.DB_HOST,
//   user: env.DB_USER,
//   database: env.DB_DATABASE,
//   password: env.DB_PASSWORD,
// };

// const pool = mysql.createPool(dbConfig);

// module.exports = pool;
const mysql = require("mysql");

const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "library",

  password: "Ngocquynguyen1",
});

pool.connect((err) => {
  if (err) {
    console.error("Lỗi kết nối MySQL:", err);
  } else {
    console.log("Kết nối MySQL thành công");
  }
});

module.exports = pool;
