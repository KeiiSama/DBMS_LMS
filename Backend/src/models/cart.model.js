const pool = require('../loaders/db')

class CartModel {
    getAlltems= (MaSoTaiKhoan, callback) => {
        const sql = "Select * from SachTrongGioHang stgh JOIN Sach s On stgh.MaSoSach = s.MaSoSach  Where MaSoDocGia = ?"
        const params = [MaSoTaiKhoan]
        pool.query(sql, params, callback)
    }

    // items is array of object {MaSoSach: <values>, SoLuong: <values>}
    addItemToCart(data, callback) {
        const {MaSoTaiKhoan, MaSoSach, SoLuong} = data
        const sql= "CALL ThemSachVaoGioHang(?,?, ?)" ;
        const params = [MaSoTaiKhoan, MaSoSach, SoLuong]

        pool.query(sql, params, callback)
    }

   
    updateCartItem(data, callback) {
        const {MaSoTaiKhoan, MaSoSach, SoLuong} = data
        const sql= "Update SachTrongGioHang SET SoLuong =  WHERE MaSoDocGia  ? AND MaSoSach =  ?" ;
        const params = [SoLuong, MaSoTaiKhoan, MaSoSach]

        pool.query(sql, params, callback)
    }

    deleteCartItem(MaSoTaiKhoan, MaSoSach, callback) {
        const sql= "Delete from SachTrongGioHang s where s.MaSoSach = ? AND s.MaSoDocGia = ?" ;
        const params = [MaSoTaiKhoan, MaSoSach]
        pool.query(sql, params, callback)
    }
}

module.exports = CartModel



// module.exports = Book;
