const { parseRequestQueries } = require('../helper')
const pool = require('../loaders/db')

class BorrowRequestModel {
    allowFields = ["MaDonMuon", "NgayTaoDon", "NgayQuyetDinh", "TrangThai", "NgayTraSach", "Gia"]
    getAll = (requestQuery = {}, callback) => {
        const options = parseRequestQueries(requestQuery, this.allowFields)
        console.log(requestQuery, options)
        const whereClause = options.filter.placeholders.length > 0 ? " WHERE " + options.filter.placeholders.join("AND") : ""
        const sortClause = ` ORDER BY ${options.sort.by} ${options.sort.order === "ASC" ? "ASC" : "DESC"} `
        const paginateClause = " LIMIT ? OFFSET ?"

        const sql = 'SELECT *, COUNT(*) OVER() as totalCount FROM DonMuonSach ' + whereClause + sortClause + paginateClause
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

    create(data, callback) {
        const { MaSoDocGia, NgayTraSach, SachMuon } = data
        console.log("Create DonMuonSach with parameters: ", MaSoDocGia, NgayTraSach, SachMuon)
        const query = "CALL insertDonMuonSach(?,?,?)"
        const params = [NgayTraSach, MaSoDocGia, JSON.stringify(SachMuon)]
        pool.query(query, params, callback)
    }

    // Update with all field is required
    update(book, callback) {
        const { MaSoSach, TenSach, TacGia, NhaPhatHanh, SoLuong, TrangThai, TenDanhMuc, Mota } = book
        const query = "CALL updateSach(?,?,?,?,?,?,?)"
        const params = [MaSoSach, TenSach, TacGia, NhaPhatHanh, SoLuong, TrangThai, TenDanhMuc]
        pool.query(query, params, callback)
    }

    // Can update spcific field
    update(MaSoSach, book, callback) {
        const  updateColumns = []
        const updateValues = [] 
        for (let key in book) {
            if (book[key] !== undefined && this.allowFields.includes(key) && key !== "MaSoSach") {
                updateColumns.push(` ${key}=? `)
                updateValues.push(book[key]) 
            } 
        }

        const query = "UPDATE sach " + (updateColumns.length > 0 ? `SET ${updateColumns.join(",")}`: "") + " WHERE MaSoSach = ?"
        const params = [...updateValues, MaSoSach]
        console.log(query, params)
        pool.query(query, params, callback)
    }

    // delete(id, callback) {
    //     const query = "CALL deleteSach(?)"
    //     const params = [id]
    //     pool.query(query, params, callback)
    // }
}

module.exports = BorrowRequestModel ;


// module.exports = Book;
