const pool = require("./db")

exports.load = async () => {
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the MySQL server.');

        connection.release();
    } catch (error) {
        console.error('Error connecting to the MySQL server:', error);
    }
}