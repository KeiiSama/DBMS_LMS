const { parseRequestQueries } = require('../helper')
const pool = require('../loaders/db')

class BorrowRequestModel {
    allowFields = ["MaDonMuon", "NgayTaoDon", "NgayQuyetDinh", "TrangThai", "NgayTraSach", "Gia"]
    getAll = (requestQuery = {}, callback) => {
        const options = parseRequestQueries(requestQuery, this.allowFields, "DonMuonSach")
        console.log(requestQuery, options)
        const whereClause = options.filter.placeholders.length > 0 ? " WHERE " + options.filter.placeholders.join("AND") : ""
        const sortClause = ` ORDER BY DonMuonSach.${options.sort.by} ${options.sort.order === "ASC" ? "ASC" : "DESC"} `
        const paginateClause = " LIMIT ? OFFSET ?"

        const sql = `
        SELECT 
            DonMuonSach.MaDonMuon,
            DonMuonSach.TrangThai,
            DonMuonSach.NgayTaoDon AS NgayMuon,
            DonMuonSach.NgayTraSach AS NgayTra,
            DonMuonSach.NgayQuyetDinh AS NgayCapNhat,
            DonMuonSach.MaSoDocGia AS MaSoDocGia,
            DonMuonSach.Gia,
            TaiKhoan.HoVaTen AS TenNguoiMuon,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'MaSoSach', sach.MaSoSach,
                    'TenSach', sach.TenSach,
                    'TacGia', sach.TacGia,
                    'SoLuong', sachmuon.SoLuong
                )
            ) AS SachMuon
        FROM DonMuonSach 
        JOIN TaiKhoan ON DonMuonSach.MaSoDocGia = TaiKhoan.MaSoTaiKhoan 
        JOIN sachmuon ON DonMuonSach.MaDonMuon = sachmuon.MaDonMuonSach 
        JOIN sach ON sachmuon.MaSoSach = sach.MaSoSach
        ${whereClause }
        GROUP BY 
            DonMuonSach.MaDonMuon, 
            DonMuonSach.TrangThai, 
            DonMuonSach.NgayTaoDon, 
            DonMuonSach.NgayTraSach, 
            DonMuonSach.Gia, 
            TaiKhoan.HoVaTen 
        ${sortClause} ${paginateClause} 
    `   
        const params = [...options.filter.params, options.paginate.limit, options.paginate.offset]
        console.log(sql, params)
        pool.query(sql, params, (error, result) => {
            if (result) {
                callback(error, {
                    data: result.map(item => ({...item, SachMuon: JSON.parse(item.SachMuon)})),
                    total: result.length > 0 ? result[0].totalCount : 0,
                    sortBy: options.sort.by,
                    order: options.sort.order === "ASC" ? "ascend" : "descend",
                    pageSize: options.paginate.limit,
                    page: options.paginate.page
                })

            } else {
                callback(error, JSON.parse(result))
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

   reject(MaDonMuon, callback) {
        const  sql = `
            Update DonMuonSach 
            Set TrangThai =  "TuChoi", NgayQuyetDinh = ? 
            WHERE MaDonMuon  = ?`

        const params = [new Date(), MaDonMuon]

        pool.query(sql, params,  (error, result) => {
            if (result) {
                callback(error, {
                        ...result, 
                        status: "TuChoi"
                })
            } else {
                callback(error, result)
            }

        })
   }

   accept(MaDonMuon,  callback) {
        const  sql = `
            Update DonMuonSach 
            Set 
                TrangThai =  "ChapNhan",
                NgayQuyetDinh = ? 
            WHERE MaDonMuon  = ?`

        const params = [new Date(), MaDonMuon]

        pool.query(sql, params,  (error, result) => {
            if (result) {
                callback(error, {
                        ...result, 
                        status: "ChapNhan"
                })
            } else {
                callback(error, result)
            }
        })
   }
}

module.exports = BorrowRequestModel ;


// module.exports = Book;
