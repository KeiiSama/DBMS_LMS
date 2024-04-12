DROP DATABASE Library;
CREATE DATABASE Library;
USE Library;
create table TaiKhoan(
MaSoTaiKhoan varchar(8) primary key, -- TK0001
TenTaiKhoan varchar(50) not null,
MatKhau varchar(50)  not null,
HoVaTen varchar(50)  not null,
NgaySinh date  not null,
VaiTro varchar(20)  not null,
DiaChi varchar(50)  not null,
SoDienThoai varchar(11)  not null
);
create table DocGia(
MaSoDocGia varchar(8) ,
primary key (MaSoDocGia),
FOREIGN KEY (MaSoDocGia) REFERENCES TaiKhoan(MaSoTaiKhoan)
);
create table NhaQuanLy(
MaSoNhaQuanLy varchar(8) ,
primary key (MaSoNhaQuanLy),
FOREIGN KEY (MaSoNhaQuanLy) REFERENCES TaiKhoan(MaSoTaiKhoan)
);
-----
create table DonMuonSach(
MaDonMuon varchar(8) primary key, -- DM0001
NgayTaoDon date not null,
NgayChapNhan date not null,
NgayTraSach date not null,
Gia DECIMAL(10,2) not null,
TinhTrangThanhToan varchar(20) not null,
MaSoDocGia varchar(8),
FOREIGN KEY (MaSoDocGia) REFERENCES DocGia(MaSoDocGia)
);
create table DanhMuc(
MaSoDanhMuc varchar(8) primary key,
Ten varchar(50) not null,
MoTa varchar(150) 
);
create table Sach(
MaSoSach varchar(8) primary key,
TenSach varchar(80) not null,
TacGia varchar(50) not null,
NhaPhatHanh varchar(80) not null,
SoLuong int not null,
SoLuongConLai INT ,
DanhMuc varchar(8) not null,
TrangThai ENUM('HoatDong', 'DaXoa') DEFAULT 'HoatDong',
Mota varchar(500),
FOREIGN KEY (DanhMuc) REFERENCES DanhMuc(MaSoDanhMuc)
);

create table SachMuon(
MaDonMuonSach varchar(8),
MaSoSach varchar(8),
SoLuong int not null,
primary key (MaDonMuonSach,MaSoSach),
FOREIGN KEY (MaDonMuonSach) REFERENCES DonMuonSach(MaDonMuon),
FOREIGN KEY (MaSoSach) REFERENCES Sach(MaSoSach)
);


create table QuanLySach(
MaSoNhaQuanLy varchar(8),
MaSoSach varchar(8),
primary key (MaSoNhaQuanLy,MaSoSach),
foreign key (MaSoNhaQuanLy) references NhaQuanLy(MaSoNhaQuanLy),
foreign key (MaSoSach) references Sach(MaSoSach)
);
create table NhanXet(
MaSoNhanXet varchar(8) primary key,
XepHang varchar(20) not null,
BinhLuan varchar(50),
Ngay date
);
create table DanhGia(
MaSoNhanXet varchar(8) primary key,
MaDocGia varchar(8),
MaSoSach varchar(8),
foreign key (MaSoNhanXet) references NhanXet(MaSoNhanXet),
foreign key (MaDocGia) references DocGia(MaSoDocGia),
foreign key (MaSoSach) references Sach(MaSoSach)
);

DELIMITER //
CREATE PROCEDURE InsertTaiKhoan
(
    IN p_TenTaiKhoan VARCHAR(255),
    IN p_MatKhau VARCHAR(255),
    IN p_HoVaTen VARCHAR(255),
    IN p_NgaySinh DATE,
    IN p_VaiTro VARCHAR(255),
    IN p_DiaChi VARCHAR(255),
    IN p_SoDienThoai VARCHAR(255)
)
BEGIN
    DECLARE nextID INT;
    DECLARE new_MaSoTaiKhoan VARCHAR(10);
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(MaSoTaiKhoan, 3, LENGTH(MaSoTaiKhoan) - 2) AS SIGNED)), 0) + 1
    INTO nextID
    FROM taikhoan;

    SET new_MaSoTaiKhoan = CONCAT('TK', LPAD(nextID, 3, '0'));

    INSERT INTO Taikhoan(MaSoTaiKhoan, TenTaiKhoan, MatKhau, HoVaTen, NgaySinh, VaiTro,DiaChi ,SoDienThoai)
    VALUES (new_MaSoTaiKhoan, p_TenTaiKhoan, p_MatKhau, p_HoVaTen, p_NgaySinh, p_VaiTro,p_DiaChi, p_SoDienThoai);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE insertSach
(
    IN p_TenSach VARCHAR(80),
    IN p_TacGia VARCHAR(50),
    IN p_NhaPhatHanh VARCHAR(80),
    IN p_SoLuong INT,
	IN p_TrangThai ENUM('HoatDong', 'DaXoa') ,
    IN p_TenDanhMuc VARCHAR(50),
    IN p_MoTa VARCHAR(500)
) 
BEGIN
    DECLARE nextId INT;
    DECLARE new_masoSach VARCHAR(8);
    DECLARE masodanhmuc VARCHAR(8);

    SELECT COALESCE(MAX(CAST(SUBSTRING(MaSoSach, 3, LENGTH(MaSoSach) - 2) AS SIGNED)), 0) + 1
    INTO nextId
    FROM Sach;
	IF p_TenDanhMuc = 'Kinh Te' THEN
    SET masodanhmuc = 'DM001';
ELSEIF p_TenDanhMuc = 'Khoa Hoc' THEN
    SET masodanhmuc = 'DM002';
ELSEIF p_TenDanhMuc = 'Tu Tuong' THEN
    SET masodanhmuc = 'DM007';
ELSEIF p_TenDanhMuc = 'Am Nhac' THEN
    SET masodanhmuc = 'DM008';
ELSEIF p_TenDanhMuc = 'Tieu Thuyet' THEN
    SET masodanhmuc = 'DM006';
ELSEIF p_TenDanhMuc = 'Van Hoc' THEN
    SET masodanhmuc = 'DM002';
ELSEIF p_TenDanhMuc = 'Lich Su' THEN
    SET masodanhmuc = 'DM003';
ELSEIF p_TenDanhMuc = 'Dia Ly' THEN
    SET masodanhmuc = 'DM004';
END IF;
    SET new_masoSach = CONCAT('S', LPAD(nextId, 3, '0'));
	INSERT INTO Sach (MaSoSach, TenSach, TacGia, NhaPhatHanh, SoLuong, DanhMuc,TrangThai,MoTa)
	VALUES (new_masoSach, p_TenSach, p_TacGia, p_NhaPhatHanh, p_SoLuong, masodanhmuc,p_TrangThai,p_MoTa);
END;
//

DELIMITER ;

DELIMITER //

-- ben BE tu dung query lay ma sach
CREATE PROCEDURE updateSach
(
	IN p_MaSoSach varchar(8),
    IN p_TenSach VARCHAR(80),
    IN p_TacGia VARCHAR(50),
    IN p_NhaPhatHanh VARCHAR(80),
    IN p_SoLuong INT,
	IN p_TrangThai ENUM('HoatDong', 'DaXoa') ,
    IN p_TenDanhMuc VARCHAR(50)
) 
BEGIN
    DECLARE masodanhmuc VARCHAR(8);
	IF p_TenDanhMuc = 'Kinh Te' THEN
    SET masodanhmuc = 'DM001';
ELSEIF p_TenDanhMuc = 'Khoa Hoc' THEN
    SET masodanhmuc = 'DM002';
ELSEIF p_TenDanhMuc = 'Tu Tuong' THEN
    SET masodanhmuc = 'DM007';
ELSEIF p_TenDanhMuc = 'Am Nhac' THEN
    SET masodanhmuc = 'DM008';
ELSEIF p_TenDanhMuc = 'Tieu Thuyet' THEN
    SET masodanhmuc = 'DM006';
ELSEIF p_TenDanhMuc = 'Van Hoc' THEN
    SET masodanhmuc = 'DM002';
ELSEIF p_TenDanhMuc = 'Lich Su' THEN
    SET masodanhmuc = 'DM003';
ELSEIF p_TenDanhMuc = 'Dia Ly' THEN
    SET masodanhmuc = 'DM004';
END IF;

	UPDATE  Sach 
	SET MaSoSach=p_MaSoSach,TenSach= p_TenSach, TacGia=p_TacGia, NhaPhatHanh=p_NhaPhatHanh, SoLuong=p_SoLuong, DanhMuc= masodanhmuc,TrangThai=p_TrangThai
    WHERE MaSoSach=p_MaSoSach;
END;
//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE deleteSach
(
	IN p_MaSoSach varchar(8)
) 
BEGIN
   UPDATE  Sach 
	SET TrangThai='DaXoa'
    WHERE MaSoSach=p_MaSoSach;
END;
//
DELIMITER ;


CALL deleteSach('S001');

//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ThemSachVaoGioHang
(
	IN p_MaSoSach varchar(8)	
) 
BEGIN
    DELETE FROM Sach
    WHERE MaSoSach=p_MaSoSach; 
    UPDATE  Sach 
	SET TrangThai='DaXoa'
    WHERE MaSoSach=p_MaSoSach;
END;
//
DELIMITER ;

delimiter //
create procedure insertNhanXet
( 
in p_xephang varchar(255),
in p_binhluan varchar(255),
in p_ngay date 
)
begin 
declare nextID int;
declare new_masonhanxet varchar(8);
SELECT COALESCE(MAX(CAST(SUBSTRING(MaSoNhanXet, 3, LENGTH(MaSoNhanXet) - 2) AS SIGNED)), 0) + 1
INTO nextId
FROM NhanXet; 
set new_masonhanxet= concat('NX',LPAD(nextID,3,'0'));
insert into NhanXet(MaSoNhanXet ,XepHang,BinhLuan ,Ngay )
values(new_masonhanxet,p_xephang,p_binhluan,p_ngay);
end;
//
delimiter ;

delimiter //
create procedure updateNhanXet
( 
in p_masonhanxet varchar(8),
in p_xephang varchar(255),
in p_binhluan varchar(255),
in p_ngay date 
)
begin 
update  NhanXet 
set MaSoNhanXet=p_masonhanxet ,XepHang=p_xephang,BinhLuan=p_binhluan ,Ngay =p_ngay
where MaSoNhanXet=p_masonhanxet;
end;
//
delimiter ;

delimiter //
create procedure deleteNhanXet
( 
in p_masonhanxet varchar(8)
)
begin 
delete from nhanxet 
where masonhanxet=p_masonhanxet;
end;
//
delimiter ;
select * from nhanxet;
CALL deleteNhanXet('NX001');

delimiter //
create procedure listDonHangDaDat
(
)
begin
select * from donmuonsach 
where TinhTrangThanhToan = 'Thanh Cong';
end;
//
delimiter ;
DELIMITER //
CREATE FUNCTION SoLuongSachConLai (p_MaSoSach VARCHAR(8))
RETURNS INT 
READS SQL DATA
begin 
	declare totalamountleft INT;
    SELECT COALESCE(a.SoLuong - IFNULL(SUM(b.SoLuong), 0), a.SoLuong) INTO totalamountleft
    from sach as a
    join sachmuon as b on a.MaSoSach=b.MaSoSach
    join donmuonsach as c on b.MaDonMuonSach = c.MaDonMuon
    where c.TinhTrangThanhToan= 'Thanh Cong' and a.MaSoSach=p_MaSoSach 
    group by a.MaSoSach ;
    return totalamountleft;
end;
//
 DELIMITER ;
-- được kích hoạt khi insert 1 cuốn sách mới
DELIMITER //
CREATE TRIGGER updatesoluongSachConLai_wheninsertSachMoi
BEFORE INSERT on sach
FOR EACH ROW
BEGIN
    SET NEW.SoLuongConLai = NEW.SoLuong;
END;
//
DELIMITER ;
drop TRIGGER updatesoluongSach
drop TRIGGER updatesoluongSach_saukhiupdatesoluongcungcap
DELIMITER //
CREATE TRIGGER updatesoluongSach_saukhiupdatesoluongcungcap
BEFORE update on sach
FOR EACH ROW
BEGIN
	SET NEW.SoLuongConLai = IFNULL(SoLuongSachConLai(NEW.MaSoSach), NEW.SoLuong);
END;
//
DELIMITER ;

-- được kích hoạt khi mỗi lần có 1 row sách mượn được insert vào.
DELIMITER //
CREATE TRIGGER updateSoLuongConLai
BEFORE INSERT ON sachmuon
FOR EACH ROW
BEGIN
    UPDATE sach
    SET SoLuongConLai = SoLuongSachConLai(NEW.MaSoSach)
    WHERE MaSoSach = NEW.MaSoSach;
END;
//
DELIMITER ;




-- INSERT
-- 
INSERT INTO TaiKhoan (MaSoTaiKhoan, TenTaiKhoan, MatKhau, HoVaTen, NgaySinh, VaiTro, DiaChi, SoDienThoai)
VALUES
('TK0001', 'user1', 'password1', 'John Doe', '1990-01-01', 'User', '123 Main St, City', '1234567890');

INSERT INTO DocGia (MaSoDocGia)
VALUES ('TK0001');

INSERT INTO DanhMuc(MaSoDanhMuc, Ten, MoTa)
VALUES 
('DM001', 'Kinh Te', 'Sách về kinh tế'),
('DM002', 'Van Hoc', 'Sách về văn học'),
('DM003', 'Lich Su', 'Sách về lịch sử'),
('DM004', 'Dia Ly', 'Sách về địa lý'),
('DM005', 'Khoa Hoc', 'Sách về khoa học'),
('DM006', 'Tieu Thuyet', 'Sách tiểu thuyết'),
('DM007', 'Tu Tuong', 'Sách về tư tưởng'),
('DM008', 'Am Nhac', 'Sách về âm nhạc');

CALL insertSach('Chien Tranh Tien Te','Song Hongbing','NXB Lao Dong',20,'HoatDong','Kinh Te', 'Mô tả cho sách Chien Tranh Tien Te');
CALL insertSach('A Brief History of Time', 'Stephen Hawking', 'Bantam Books', 50, 'HoatDong', 'Khoa Hoc', 'Sách về lịch sử');
CALL insertSach('To Kill a Mockingbird', 'Harper Lee', 'J. B. Lippincott & Co.', 60, 'HoatDong', 'Tieu Thuyet', 'Sách tiểu thuyết về cuộc đời');
CALL insertSach('Critique of Pure Reason', 'Immanuel Kant', 'Walter de Gruyter', 70, 'HoatDong', 'Tu Tuong', 'Cuốn sách triết học quan trọng');
CALL insertSach('The Beatles Anthology', 'The Beatles', 'Chronicle Books', 80, 'HoatDong', 'Am Nhac', 'Cuốn sách về hành trình âm nhạc của The Beatles');
CALL insertSach('Freakonomics: A Rogue Economist Explores the Hidden Side of Everything', 'Steven D. Levitt, Stephen J. Dubner', 'William Morrow', 90, 'HoatDong', 'Kinh Te', 'Sách về kinh tế học độc đáo');
CALL insertSach('Pride and Prejudice', 'Jane Austen', 'T. Egerton, Whitehall', 100, 'HoatDong', 'Van Hoc', 'Một trong những tiểu thuyết kinh điển');
CALL insertSach('A People\'s History of the United States', 'Howard Zinn', 'Harper & Row', 110, 'HoatDong', 'Lich Su', 'Một cuốn sách lịch sử bán chạy');
CALL insertSach('How Music Works', 'David Byrne', 'McSweeney\'s', 120, 'HoatDong', 'Am Nhac', 'Sách về cách âm nhạc hoạt động');


INSERT INTO DonMuonSach (MaDonMuon, NgayTaoDon, NgayChapNhan, NgayTraSach, Gia, TinhTrangThanhToan, MaSoDocGia)
VALUES
('DH004', '2024-02-01', '2024-02-02', '2024-02-10', 50.00, 'Thanh Cong', 'TK0001');

INSERT INTO SachMuon (MaDonMuonSach, MaSoSach, SoLuong)
VALUES
('DH004', 'S001', 5);

SELECT * FROM Sach;