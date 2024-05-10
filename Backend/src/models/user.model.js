const { parseRequestQueries } = require('../helper')
const pool = require('../loaders/db')

class UserModel {
    allowFields = ["MaSoTaiKhoan", "TenTaiKhoan", "HoVaTen", "NgaySinh", "DiaChi", "SoLuongConLai", "VaiTro", "SoDienThoai"]
    getAll= (requestQuery = {}, callback) => {
        const options = parseRequestQueries(requestQuery, this.allowFields)
        console.log(requestQuery, options)
        const whereClause = options.filter.placeholders.length > 0 ? " WHERE " + options.filter.placeholders.join("AND") : ""
        const sortClause = ` ORDER BY ${options.sort.by} ${options.sort.order === "ASC" ? "ASC" : "DESC"} `
        const paginateClause = " LIMIT ? OFFSET ?"

        const sql = 'SELECT *, COUNT(*) OVER() as totalCount FROM TaiKhoan ' + whereClause + sortClause + paginateClause
        const params = [...options.filter.params, options.paginate.limit, options.paginate.offset]
        console.log(sql, params)
        pool.query(sql, params, (error, result) => {
            if (result) {
                callback(error, {
                    data: result,
                    total: result.length > 0 ? result[0].totalCount : 0,
                    sortBy: options.sort.by,
                    order: options.sort.order === "ASC" ? "ascend" : "descend",
                    pageSize: options.paginate.limit,
                    page: options.paginate.page
                })

            } else {
                callback(error, result)
            }
        })
    }

    create(newUser, callback) {
        const { TenTaiKhoan, MatKhau, HoVaTen, NgaySinh, VaiTro, DiaChi, SoDienThoai } = newUser
        const query = "CALL insertTaiKhoan(?,?,?,?,?,?,?)"
        const params = [TenTaiKhoan, MatKhau, HoVaTen, NgaySinh, VaiTro, DiaChi, SoDienThoai ]
        pool.query(query, params, callback)
    }

    // // Update with all field is required
    // update(user, callback) {
    //     const { TenTaiKhoan, MatKhau, HoVaTen, NgaySinh, VaiTro, DiaChi, SoDienThoai } = user
    //     const query = "CALL updateTaiKhoan(?,?,?,?,?,?,?)"
    //     const params = [MaSoSach, TenSach, TacGia, NhaPhatHanh, SoLuong, TrangThai, TenDanhMuc]
    //     pool.query(query, params, callback)
    // }

    // Can update spcific field
    update(MaSoTK, taikhoan, callback) {
        const  updateColumns = []
        const updateValues = [] 
        for (let key in book) {
            if (book[key] !== undefined && this.allowFields.includes(key) && key !== "MaSoTaiKhoan") {
                updateColumns.push(` ${key}=? `)
                updateValues.push(book[key]) 
            } 
        }

        const query = "UPDATE TaiKhoan " + (updateColumns.length > 0 ? `SET ${updateColumns.join(",")}`: "") + " WHERE MaSoTaiKhoan = ?"
        const params = [...updateValues, MaSoTK]
        console.log(query, params)
        pool.query(query, params, callback)
    }

    delete(id, callback) {
        const query = "DELETE FROM TaiKhoan WHERE MaSoTaiKhoan == ?"
        const params = [id]
        pool.query(query, params, callback)
    }
}

module.exports = UserModel


// module.exports = Book;
