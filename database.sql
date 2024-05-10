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
NgayQuyetDinh date,
TrangThai enum("ChapNhan", "TuChoi", "DangCho"),
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
Anh varchar(1000),
Mota varchar(2000),
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

-- Bổ sung
CREATE TABLE SachTrongGioHang (
	PRIMARY KEY (MaSoSach,MaSoDocGia),
    MaSoSach VARCHAR(8),
    MaSoDocGia VARCHAR(8) ,
	FOREIGN KEY (MaSoSach) REFERENCES Sach(MaSoSach),
    FOREIGN KEY (MaSoDocGia) REFERENCES TaiKhoan(MaSoTaiKhoan),
    SoLuong int 
);
-- --------


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
    IF p_VaiTro = 'reader' THEN
        INSERT INTO DocGia(MaSoDocGia) VALUES (new_MaSoTaiKhoan);
    ELSE
        INSERT INTO NhaQuanLy(MaSoNhaQuanLy) VALUES (new_MaSoTaiKhoan);
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
    IN p_TenDanhMuc VARCHAR(50),
	IN p_anh VARCHAR(1000),
    IN p_MoTa VARCHAR(2000)

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
ELSEIF p_TenDanhMuc = 'Ngoai Ngu' THEN
    SET masodanhmuc = 'DM009';
END IF;
    SET new_masoSach = CONCAT('S', LPAD(nextId, 3, '0'));
	INSERT INTO Sach (MaSoSach, TenSach, TacGia, NhaPhatHanh, SoLuong, DanhMuc,TrangThai,Anh,MoTa)
	VALUES (new_masoSach, p_TenSach, p_TacGia, p_NhaPhatHanh, p_SoLuong, masodanhmuc,p_TrangThai,p_anh,p_MoTa);
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
ELSEIF p_TenDanhMuc = 'Ngoai Ngu' THEN
    SET masodanhmuc = 'DM009';
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


-- CALL deleteSach('S001');

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
INSERT INTO TaiKhoan (MaSoTaiKhoan, TenTaiKhoan, MatKhau, HoVaTen, NgaySinh, VaiTro, DiaChi, SoDienThoai)
VALUES
('TK0002', 'admin', '123', 'quy', '1990-01-01', 'Admin', '123 Main St, City', '1424567890');
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
('DM008', 'Am Nhac', 'Sách về âm nhạc'),
('DM009', 'Ngoai Ngu', 'Sách về ngoại ngữ');

CALL insertSach('NO VACAB - NO WORRIES','Vũ Hải','Nhà Xuất Bản Đại Học Kinh Tế Quốc Dân',10,'HoatDong','Ngoai Ngu','https://salt.tikicdn.com/cache/w1200/ts/product/a9/61/a8/16ac9af340421f04af8c7420c4ef0b25.jpg','Cuốn IELTS No Vocab No Worries sẽ giúp bạn “hóa giải” những trở ngại trên con đường chinh phục đỉnh cao IELTs. Cuốn sách được in màu với những hình minh họa sinh động, đề cập đến nhiều chủ đề khác nhau trong các đề thi thực của IELTs giúp thí sinh nâng cao vốn từ vựng cần thiết và lối tư duy để nảy ra ý tưởng và ứng biến với mọi trường hợp, mọi câu hỏi. Những mẹo nhỏ cũng được tác giả chọn lọc và trình bày ngắn gọn, dễ hiểu. Đây quả là một cuốn sách thiết thực mà bất cứ ai trên hành trình chinh phục tấm chứng chỉ IELTS cũng nên sở hữu cho mình một cuốn.');
CALL insertSach('Giải thích ngữ pháp tiếng Anh','Mai Lan Hương','Nhà Xuất Bản Đà Nẵng',20,'HoatDong','Ngoai Ngu', 'https://salt.tikicdn.com/cache/750x750/ts/product/37/59/f1/1101788da61ed1ad411251aff1927a29.jpg.webp','Ngữ pháp Tiếng Anh tổng hợp các chủ điểm ngữ pháp trọng yếu mà học sinh cần nắm vững. Các chủ điểm ngữ pháp được trình bày rõ ràng, chi tiết. Sau mỗi chủ điểm ngữ pháp là phần bài tập & đáp án nhằm giúp các em củng cố kiến thức đã học, đồng thời tự kiểm tra kết quả.');
CALL insertSach('Cẩm nang cấu trúc tiếng anh','Trang Anh','Nhà Xuất Bản Đại Học Sư Phạm',15,'HoatDong','Ngoai Ngu', 'https://salt.tikicdn.com/cache/750x750/ts/product/b2/c7/b2/617e1165b21f498aea14cfd110bd5f10.jpg.webp','Cuốn sách Cẩm Nang Cấu Trúc Tiếng Anh gồm 25 phần, mỗi phần là một phạm trù kiến thức trong tiếng Anh được trình bày một cách ngắn gọn, đơn giản, cô đọng và hệ thống hoá dưới dạng sơ đồ, bảng biểu nhằm phát triển khả năng tư duy của người học và từ đó giúp người học nhớ kiến thức nhanh hơn và sâu hơn. Sau hầu hết các phần lí thuyết đều có 20-30 câu bài tập áp dụng để kiểm tra cũng như khắc sâu kiến thức cho người học. Tuy dày chưa đến 250 trang nhưng cuốn sách lại có thể bao trọn toàn bộ kiến thức từ đơn giản đến phức tạp cộng với cách tận dụng tối đa và áp dụng triệt để cách học tiếng Anh bằng sơ đồ tư duy.');
CALL insertSach('Economix - Các Nền Kinh Tế Vận Hành (Và Không Vận Hành) Thế Nào Và Tại Sao?', 'Michael Goodwin', 'Nhà Xuất Bản Dân Trí', 10, 'HoatDong','Kinh Te','https://salt.tikicdn.com/cache/750x750/ts/product/d7/3c/17/c807a27bc03b4f8176c4f7fd89b94ff9.jpg.webp' , 'Có thể coi đây là một cuốn sử về lịch sử kinh tế thế giới kể từ khi nền kinh tế hàng hóa ra đời. Chúng ta sẽ lướt qua vài thế kỷ với vô số học thuyết về kinh tế học cùng những vụ khủng hoảng kinh tế lớn như thể đang đọc một cuốn truyện tranh, cả bi lẫn hài, căng thẳng mà không kém phần sảng khoái.');
CALL insertSach('NFT – Cuộc Cách Mạng Công Nghệ Tiếp Nối Blockchain Và Kỷ Nguyên Tiền Điện Tử', 'Marc Beckman', 'Nhà Xuất Bản Công Thương', 10, 'HoatDong','Kinh Te','https://salt.tikicdn.com/cache/750x750/ts/product/e3/47/57/119c459cccb302d6445500a50f08359d.jpg.webp', 'Cuốn sách dẫn đường NFT đi sâu vào nền tảng của công nghệ NFT theo một khung nội dung mạch lạc, đi kèm với những giải thích chi tiết cùng ví dụ sinh động, giúp bất cứ ai cũng có thể hiểu được bản chất của NFT và tiềm năng của công nghệ mới này trong thời gian ngắn nhất.');
CALL insertSach('THE EXPERIENCE ECONOMIC ', 'B.Joseph Pine II', 'Nhà Xuất Bản Công Thương', 5, 'HoatDong', 'Kinh Te','https://salt.tikicdn.com/cache/750x750/ts/product/21/87/73/862091831b2e3d4f062a01f7f2c3567b.jpg.webp', 'Cuốn sách chuyên sâu về đổi mới trải nghiệm này của Joe Pine và Jim Gilmore khám phá cách các công ty trở nên khác biệt và vượt trội bằng cách cung cấp trải nghiệm hấp dẫn cho khách hàng của họ, không chỉ khiến khách hàng trung thành mà còn mang lại lợi nhuận cao hơn.');
CALL insertSach('CHÂN TRẦN CHÍ THÉP ', 'James G.Zumwalt', 'Nhà Xuất Bản Tổng hợp TP.HCM', 5, 'HoatDong', 'Van Hoc','https://salt.tikicdn.com/cache/750x750/ts/product/4b/9f/28/b46073f6807a20854b3f7be34d4ab2ba.jpg.webp', 'Cuốn sách Bare Feet, Iron Will do NXB Fortis ấn hành tại Mỹ tháng 4/2010. Cuốn sách ngay lập tức được nhiều bạn đọc Mỹ đón nhận. Trên mạng bán sách trực tuyến Amazon, có độc giả để lại nhận xét về cuốn sách như sau: "Các nhà lãnh đạo trên thế giới, những người có thẩm quyền phát động chiến tranh, cần đọc cuốn sách của Zumwalt. Thông điệp ở đây là, chính quyết tâm của nhân dân và "quy mô" trái tim của họ, chứ không phải sức mạnh quân đội và quy mô của kho vũ khí, quyết định chiến thắng".');
CALL insertSach('CHÍ PHÈO', 'Nam Cao', 'NXB Văn Học', 8, 'HoatDong', 'Van Hoc','https://salt.tikicdn.com/cache/750x750/ts/product/d7/5f/4e/50bb49ddd526e17de4ef8116dada8aa4.jpeg.webp', 'Chí Phèo là tập truyện ngắn với các truyện Cái mặt không chơi được, Chí Phèo, Quái dị, Tư cách mõ, Điếu văn, Một bữa no, Lang rận, Quên điều độ, Nghèo, Cái chết của con mực, Mua danh, Một chuyện Xúvơnia.".');
CALL insertSach('GIÁO TRÌNH KINH TẾ CHÍNH TRỊ MÁC-LÊNIN', 'GS.Trần Tiến Hải', 'Nhà Xuất Bản Chính Trị Quốc Gia Sự Thật', 20, 'HoatDong', 'Tu Tuong','https://salt.tikicdn.com/cache/750x750/ts/product/d4/51/60/6a5c49d0e64b233150faad9bd3386b73.jpg.webp', 'Để giúp sinh viên nắm chắc và vận dụng các kiến thức đã học, cuối mỗi chương các tác giả tóm tắt lại nội dung của chương và đưa ra các thuật ngữ cần ghi nhớ, vấn đề thảo luận, câu hỏi ôn tập.Giáo trình trang bị cho sinh viên hệ thống tri thức lý luận cốt lõi của kinh tế chính trị Mác - Lênin trong bối cảnh phát triển mới của Việt Nam và thế giới.');
CALL insertSach('chủ nghĩa xã hội khoa học', 'GS.TS. Hoàng Chí Bảo', 'Nhà Xuất Bản Chính Trị Quốc Gia Sự Thật', 20, 'HoatDong', 'Tu Tuong','https://salt.tikicdn.com/cache/750x750/ts/product/a5/7d/1b/7ef579c2f4374af3816b5709b054d636.jpg.webp', 'Giáo trình gồm 7 chương. Ngoài chương nhập môn trình bày sự ra đời, các giai đoạn phát triển của chủ nghĩa xã hội gắn liền với vai trò của C. Mác, Ph. Ăngghen và V.I. Lênin; đối tượng, phương pháp và ý nghĩa việc nghiên cứu, học tập môn Chủ nghĩa xã hội khoa học; các chương còn lại trình bày một cách hệ thống, toàn diện lý luận về chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội với những đặc trưng bản chất về: Sứ mệnh lịch sử của giai cấp công nhân; Chủ nghĩa xã hội và thời kỳ quá độ lên chủ nghĩa xã hội; Nền dân chủ và Nhà nước xã hội chủ nghĩa; Cơ cấu xã hội - giai cấp và liên minh giai cấp, tầng lớp trong thời kỳ quá độ lên chủ nghĩa xã hội;');
CALL insertSach('Lược sử Việt Nam', 'Trần Trọng Kim', 'Nhà Xuất Bản Kim Đồng', 2, 'HoatDong', 'Lich Su','https://salt.tikicdn.com/cache/750x750/ts/product/a6/7f/4c/637f81b354fafa4813198a25a2b25c29.png.webp', 'Sử là sách không những là chỉ để ghi chép những công việc đã qua mà thôi, nhưng lại phải suy xét việc gốc ngọn, tìm tòi cái căn nguyên những công việc của người ta đã làm để hiểu cho rõ những vận hội trị loạn của một nước, những trình độ tiến hóa của một dân tộc. Chủ đích là để làm cái gương chung cổ cho người cả nước được đời đời soi vào đấy mà biết cái sự sinh hoạt của người trước đã phải lao tâm lao lực những thế nào, mới chiếm giữ được cái địa vị ở dưới bóng mặt trời này…');
CALL insertSach('Cuộc tổng tiến công và nổi dậy xuân Mậu Thân 1968', 'Thu Phương', 'Nhà Xuất Bản Tài Chính', 3, 'HoatDong', 'Lich Su','https://salt.tikicdn.com/cache/750x750/ts/product/61/4f/79/7956c4ba89cc0a46c7b62596b21367de.jpg.webp', 'Tết Quý Mão 2023 cả nước ta kỷ niệm một ngày lễ lớn: 55 năm cuộc Tổng Tiến công và nổi dậy Xuân Mậu Thân 1968. Câu lạc bộ Truyền thống Thành Đoàn cùng Ban Thường vụ Thành Đoàn Thành phố Hồ Chí Minh  thực hiện tập sách Từ đêm hội Quang Trung đến Chiến dịch Mậu Thân 1968.');
CALL insertSach('Phụ nữ Việt Nam', 'Hội liên hiệp phụ nữ Việt Nam', 'Nhà Xuất Bản Phụ Nữ Việt Nam', 5, 'HoatDong', 'Lich Su','https://salt.tikicdn.com/cache/750x750/ts/product/03/ed/a5/72e7c129574548a2e671de53ef2c3e18.jpg.webp','Cuốn sách đã thể hiện được quá khứ hào hùng và hiện tại vinh quang của phụ nữ Việt Nam. Dù ở giai đoạn lịch sử nào, phụ nữ Việt Nam luôn luôn nỗ lực để khẳng định vai trò và vị thế của m.ình trên mọi lĩnh vực: văn hóa, xã hội, kinh tế, chính trị, an ninh, quốc phòng,… góp phần xây dựng đất nước ngày càng phát triển và hội nhập sâu rộng.');
CALL insertSach('Học đàn piano', 'Brad Hill', 'Nhà Xuất Bản Hồng Đức', 5, 'HoatDong', 'Am Nhac','https://salt.tikicdn.com/cache/750x750/ts/product/7f/a6/b8/b0c80a5ffcea8221675b51f284984242.jpg.webp',' Cuốn sách trình bày chi tiết lịch sử ra đời của đàn Piano, cách phân biệt vạch nhịp, số nhịp, đếm nhịp, cách tập đàn một tay và hai tay. Sau mỗi bài học , sách còn đính kèm những bài luyện tập thiết thực dành cho những học viên không có thời giờ đến các trung tâm dạy nhạc. Có cuốn sách học đàn Piano bên cạnh , bạn có thể yên tâm tự học và tự tin trình diễn những bản nhạc từ đơn giản đến phức tạp của đàn Piano hay bất cứ loại nhạc cụ có bàn phím nào khác .');
CALL insertSach('Kỹ thuật ghi âm', 'Phạm Xuân Ánh', 'Nhà Xuất Bản Dân Trí', 3, 'HoatDong', 'Am Nhac','https://salt.tikicdn.com/cache/750x750/ts/product/a4/41/74/bbe211b122a909154f402e361deab6ba.jpg.webp','Ngày nay, thế giới có rất nhiều sách và tài liệu trong lĩnh vực xử lý âm thanh và âm nhạc, mỗi cuốn sách đều có những khía cạnh riêng và đem lại những giá trị khác nhau. Thế nhưng ở Việt Nam lại chưa từng có một tài liệu cụ thể hay thống nhất nào về lĩnh vực này. Một số cuốn sách nổi tiếng trên thế giới chủ yếu cung cấp kiến thức dựa trên âm thanh của nhạc cụ, trong khi những cuốn sách của các nghệ sĩ trẻ lại mang những kiến thức mới trên nền xử lý âm thanh hiện đại.');

INSERT INTO DonMuonSach (MaDonMuon, NgayTaoDon, NgayQuyetDinh, NgayTraSach, Gia, TinhTrangThanhToan, MaSoDocGia)
VALUES
('DH004', '2024-02-01', '2024-02-02', '2024-02-10', 50.00, 'Thanh Cong', 'TK0001');

INSERT INTO SachMuon (MaDonMuonSach, MaSoSach, SoLuong)
VALUES
('DH004', 'S001', 5);
select * from TaiKhoan;
SELECT * FROM Sach join DanhMuc on sach.DanhMuc=DanhMuc.MaSoDanhMuc where DanhMuc.ten in ("Ngoai Ngu");


DELIMITER //

CREATE FUNCTION TinhGiaTien(ngay_muon DATE, ngay_tra DATE, so_luong INT) RETURNS DECIMAL(10, 2) deterministic
BEGIN
    DECLARE gia_tien DECIMAL(10, 2);
    DECLARE so_ngay_muon INT;

    -- Thêm câu lệnh SET để khởi tạo giá trị của biến gia_tien
    SET gia_tien = 0.0;

    SET so_ngay_muon = DATEDIFF(ngay_tra, ngay_muon);
    IF so_ngay_muon <= 0 THEN
        RETURN 0.0;
    END IF;

    -- Tính giá tiền dựa trên số ngày mượn, số lượng sách và giá tiền mỗi ngày (mặc định là 1000)
    SET gia_tien = so_ngay_muon * so_luong * 1000.00;

    RETURN gia_tien;
END //
DELIMITER ;


DROP PROCEDURE IF EXISTS insertDonMuonSach;
 DELIMITER //
Create   procedure  insertDonMuonSach 
(
    p_NgayTraSach date,
    p_MaSoDocGia Varchar(8),
    p_DS_SachMuon JSON
)
BEGIN
	DECLARE nextID INT;
	DECLARE new_MaDonMuon VARCHAR(10);
	DECLARE i INT DEFAULT 0;
	DECLARE masach_val VarChar(8);
	DECLARE soluong_val INT;
	DECLARE num_items INT;
	DECLARE tong_so_luong  INT ;
	DECLARE gia_tien DECIMAL(10,2) ;  
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error occurred during transaction';
	END;

	START TRANSACTION;
		SELECT COALESCE(MAX(CAST(SUBSTRING(MaDonMuon, 3, LENGTH(MaDonMuon) - 2) AS SIGNED)), 0) + 1
		INTO nextID
		FROM DonMuonSach;

		SET new_MaDonMuon = CONCAT('DH', LPAD(nextID, 2, '0'));
		INSERT INTO DonMuonSach (MaDonMuon, NgayTaoDon, NgayQuyetDinh,TrangThai, NgayTraSach, Gia, TinhTrangThanhToan, MaSoDocGia)
		VALUES (new_MaDonMuon, CURDATE(), NULL,"DangCho", p_NgayTraSach, 0, "Thanh Cong", p_MaSoDocGia) ;
		
        -- Thêm sách vào đơn mượn sách  
        SET i  = 0 ;
        SET num_items = JSON_LENGTH(p_DS_SachMuon);
        SET tong_so_luong = 0 ;
        WHILE i < num_items DO
			SET masach_val = JSON_UNQUOTE(JSON_EXTRACT(p_DS_SachMuon, CONCAT('$[', i, '].MaSoSach')));
			SET soluong_val = CAST(JSON_EXTRACT(p_DS_SachMuon, CONCAT('$[', i, '].SoLuong')) AS UNSIGNED);
			INSERT INTO sachmuon(MaDonMuonSach, MaSoSach, SoLuong)
			VALUES (new_MaDonMuon, masach_val, soluong_val);
            
            SET tong_so_luong = tong_so_luong + soluong_val ;
			SET i = i + 1;
		END WHILE;
	
        -- Cập nhật giá tiền 
        SET gia_tien = TinhGiaTien(curdate(), p_NgayTraSach, tong_so_luong) ;
		UPDATE DonMuonSach 
		SET Gia = gia_tien
		WHERE MaDonMuon = new_MaDonMuon;
        
        
     COMMIT;
END //
DELIMITER ;

CALL insertDonMuonSach('2024-04-29', 'TK0001', '[{"MaSoSach": "S001", "SoLuong": 100 }]');

DROP PROCEDURE IF EXISTS ThemSachVaoGioHang;
 DELIMITER //
CREATE PROCEDURE ThemSachVaoGioHang(
	p_MaSoDocGia varchar(8),
    p_MaSoSach varchar(8),
    p_SoLuong INT
)
BEGIN
    DECLARE i INT DEFAULT 0;
	DECLARE sach_count INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		ROLLBACK;
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Error occurred during transaction';
	END;

	START TRANSACTION;
		SELECT COUNT(*) INTO sach_count
		FROM SachTrongGioHang s
		WHERE MaSoDocGia = p_MaSoDocGia AND s.MaSoSach = p_MaSoSach ;
		
		IF sach_count > 0 THEN
			UPDATE SachTrongGioHang s  
			SET SoLuong = s.SoLuong + p_SoLuong 
			WHERE MaSoDocGia = p_MaSoDocGia AND s.MaSoSach = p_MaSoSach ;
		ELSE 
			INSERT INTO SachtrongGioHang(MaSoSach, MaSoDocGia, SoLuong) 
			VALUES(p_MaSoSach, p_MaSoDocGia, p_SoLuong) ;
		END IF;
    COMMIT ;
END //
DELIMITER ;

SELECT * FROM DonMuonSach;
CALL ThemSachVaoGioHang("TK0001", "S001", 100) ;



Select * from SachTrongGioHang stgh JOIN Sach s On stgh.MaSoSach = s.MaSoSach  Where MaSoDocGia = "TK0001" ;