DROP DATABASE Library;
CREATE DATABASE Library;
USE Library;
CREATE TABLE TaiKhoan (
    MaSoTaiKhoan VARCHAR(8) PRIMARY KEY, -- TK0001
    TenTaiKhoan VARCHAR(50) NOT NULL,
    MatKhau VARCHAR(50) NOT NULL,
    HoVaTen VARCHAR(50) NOT NULL,
    NgaySinh DATE NOT NULL DEFAULT '2000-01-01', -- Default value for NgaySinh
    VaiTro VARCHAR(20) NOT NULL  DEFAULT 'User',
    DiaChi VARCHAR(50) NOT NULL DEFAULT 'Unknown', -- Default value for DiaChi
    SoDienThoai VARCHAR(11) NOT NULL DEFAULT '00000000000' -- Default value for SoDienThoai
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
MoTa varchar(150) not null
);
create table Sach(
MaSoSach varchar(8) primary key,
TenSach varchar(80) not null,
TacGia varchar(50) not null,
NhaPhatHanh varchar(80) not null,
SoLuong int not null,
SoLuongConLai INT not null,
DanhMuc varchar(8) not null,
TrangThai ENUM('HoatDong', 'DaXoa') DEFAULT 'HoatDong',
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
    IN p_Vaitro VARCHAR(20)
)
BEGIN
    DECLARE nextID INT;
    DECLARE new_MaSoTaiKhoan VARCHAR(10);
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(MaSoTaiKhoan, 3, LENGTH(MaSoTaiKhoan) - 2) AS SIGNED)), 0) + 1
    INTO nextID
    FROM taikhoan;

    SET new_MaSoTaiKhoan = CONCAT('TK', LPAD(nextID, 3, '0'));

    INSERT INTO Taikhoan(MaSoTaiKhoan, TenTaiKhoan, MatKhau, HoVaTen)
    VALUES (new_MaSoTaiKhoan, p_TenTaiKhoan, p_MatKhau, p_HoVaTen);
    IF p_Vaitro = 'reader' THEN
        INSERT INTO DocGia(MaSoDocGia)
        VALUES (new_MaSoTaiKhoan);
    ELSEIF p_Vaitro = 'admin' THEN
        INSERT INTO NhaQuanLy(MaSoNhaQuanLy)
        VALUES (new_MaSoTaiKhoan);
    END IF;
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
    IN p_TenDanhMuc VARCHAR(50)
) 
BEGIN
    DECLARE nextId INT;
    DECLARE new_masoSach VARCHAR(8);
    DECLARE masodanhmuc VARCHAR(8);

    SELECT COALESCE(MAX(CAST(SUBSTRING(MaSoSach, 3, LENGTH(MaSoSach) - 2) AS SIGNED)), 0) + 1
    INTO nextId
    FROM Sach;
	IF p_TenDanhMuc='Kinh Te' THEN set masodanhmuc='DM001';
    ELSEIF p_TenDanhMuc='Khoa Hoc' then
    set masodanhmuc='DM002';
    ELSEIF p_TenDanhMuc='Tieng Anh' then
    set masodanhmuc='DM003';
    END IF;
    SET new_masoSach = CONCAT('S', LPAD(nextId, 3, '0'));
	INSERT INTO Sach (MaSoSach, TenSach, TacGia, NhaPhatHanh, SoLuong, DanhMuc,TrangThai)
	VALUES (new_masoSach, p_TenSach, p_TacGia, p_NhaPhatHanh, p_SoLuong, masodanhmuc,p_TrangThai);
END;
//

DELIMITER ;



insert into DanhMuc(MaSoDanhMuc,Ten,MoTa)
values('DM002','1234','Sach noi ve kien thuc ve kinh te');
insert into DanhMuc(MaSoDanhMuc,Ten,MoTa)
values('DM001','Kinh Te','Sach noi ve kien thuc ve kinh te');
CALL insertSach('Chien Tranh Tien Te','Song Hongbing','NXB Lao Dong',20,'HoatDong','Kinh Te');
INSERT INTO DonMuonSach (MaDonMuon, NgayTaoDon, NgayChapNhan, NgayTraSach, Gia, TinhTrangThanhToan, MaSoDocGia)
VALUES
('DH001', '2024-02-01', '2024-02-02', '2024-02-10', 50.00, 'Thanh Cong', 'DG001');

INSERT INTO SachMuon (MaDonMuonSach, MaSoSach, SoLuong)
VALUES
('DM001', 'S002', 2),
('DM001', 'S002', 3),
('DM002', 'S003', 1);

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
	IF p_TenDanhMuc='Kinh Te' THEN set masodanhmuc='DM001';
    ELSEIF p_TenDanhMuc='Khoa Hoc' then
    set masodanhmuc='DM002';
    ELSEIF p_TenDanhMuc='Tieng Anh' then
    set masodanhmuc='DM003';
    END IF;
	UPDATE  Sach 
	SET MaSoSach=p_MaSoSach,TenSach= p_TenSach, TacGia=p_TacGia, NhaPhatHanh=p_NhaPhatHanh, SoLuong=p_SoLuong, DanhMuc= masodanhmuc,TrangThai=p_TrangThai
    WHERE MaSoSach=p_MaSoSach;
END;
//
DELIMITER ;
-- CALL updateSach('S001','Vat ly 1','Rambo','NXB Lao Dong',10,'HoatDong','Khoa Hoc');
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

CALL updateSach('S001','Vat ly 1','Rambo','NXB Lao Dong',10,'Khoa Hoc');

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
select * from nhanxet;
CALL insertNhanXet('good','sach rat dang doc','2024-02-28');


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
select * from nhanxet;
-- CALL updateNhanXet('NX001','good','sach rat dang doc','2024-02-29');



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

INSERT INTO TaiKhoan (MaSoTaiKhoan, TenTaiKhoan, MatKhau, HoVaTen, NgaySinh, VaiTro, DiaChi, SoDienThoai)
VALUES ('TK0001', 'user1', '1', 'John Doe', '1990-05-15', 'User', '123 Main St, City, Country', '01234567890');
INSERT INTO TaiKhoan (MaSoTaiKhoan, TenTaiKhoan, MatKhau, HoVaTen, NgaySinh, VaiTro, DiaChi, SoDienThoai)
VALUES ('TK0003', 'user2', '1', 'Jane Smith', '1988-08-20', 'User', '789 Elm St, City, Country', '03456789012');
select * from taikhoan ;
select * from nhaquanly ;
select * from docgia ;
-- call InsertTaiKhoan('user5','1','nguyengocquy');
INSERT INTO TaiKhoan (MaSoTaiKhoan, TenTaiKhoan, MatKhau, HoVaTen, NgaySinh, VaiTro, DiaChi, SoDienThoai)
VALUES ('TK0004', 'admin', '123', 'Jane Smith', '1988-08-20', 'User', '789 Elm St, City, Country', '03456789012');