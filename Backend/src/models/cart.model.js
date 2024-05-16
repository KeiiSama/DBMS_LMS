const pool = require('../loaders/db')

class CartModel {
    getAlltems= (MaSoTaiKhoan, callback) => {
        const sql = `Select stgh.SoLuong, s.MaSoSach, s.TenSach, s.TacGia, s.NhaPhatHanh, s.DanhMuc, s.Anh, s.Mota
                    From SachTrongGioHang stgh JOIN Sach s On stgh.MaSoSach = s.MaSoSach  Where MaSoDocGia = ?`
        const params = [MaSoTaiKhoan]
        pool.query(sql, params, callback)
    }

    // items is array of object {MaSoSach: <values>, SoLuong: <values>}
    addItemToCart(data, callback) {
        const {MaSoTaiKhoan, MaSoSach} = data
        const sql= "CALL ThemSachVaoGioHang(?, ?, ?)" ;
        const params = [MaSoTaiKhoan, MaSoSach, 1]

        pool.query(sql, params, (error, result) => {
            if (result) {
               callback(error, {
                    ...result[0][0],
                    ...result[1]
               })
            } else {
                callback(error, result)
            }

        })
    }

   
    updateCartItem(data, callback) {
        const {MaSoTaiKhoan, MaSoSach, SoLuong} = data
        const sql= "Update SachTrongGioHang SET SoLuong =  WHERE MaSoDocGia  ? AND MaSoSach =  ?" ;
        const params = [SoLuong, MaSoTaiKhoan, MaSoSach]

        pool.query(sql, params, callback)
    }

    deleteCartItem(MaSoTaiKhoan, MaSoSach, callback) {
        const sql= "delete from sachtronggiohang where  MaSoDocGia = ? AND MaSoSach = ?" ;
        const params = [MaSoTaiKhoan, MaSoSach]
        pool.query(sql, params, callback)
    }
}

module.exports = CartModel



// module.exports = Book;
