import React from "react";
import zomato from "../Components/Images/zomatoAboutImage.avif";
import "./About.css";

const About = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-8  my-2 p-2" style={{ fontStyle: "italic" }}>
            <h2 className="text-bold">Chúng tôi là ai ?</h2>
            <p className="text-wrap">
              Chúng tôi là nhóm người đứng sau dự án BK Book, bao gồm các nhà
              phát triển web, nhà thiết kế đồ họa, chuyên gia về dữ liệu và một
              nhóm người đam mê về việc cung cấp nguồn tài nguyên học thuật cho
              cộng đồng. Đội ngũ này bao gồm sinh viên những người đam mê giáo
              dục và chia sẻ kiến thức.
            </p>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-4 p-2" style={{ fontStyle: "italic" }}>
            <h1>Sứ mệnh của chúng tôi</h1>
            <p>
              Chúng tôi cam kết tạo ra một nền tảng thư viện trực tuyến đồng văn
              hóa và tiện lợi, nơi mọi người có thể dễ dàng truy cập vào các tài
              liệu giáo trình, sách tham khảo và văn phòng phẩm liên quan đến
              học tập và nghiên cứu. Chúng tôi tôn trọng và khuyến khích sự chia
              sẻ và hợp tác, tạo điều kiện cho mọi người cùng nhau khám phá và
              học hỏi. Sứ mệnh của chúng tôi là cung cấp một nguồn tài nguyên
              phong phú và đa dạng, góp phần nâng cao kiến thức và năng lực của
              cộng đồng trong lĩnh vực học thuật và chuyên môn.
            </p>
          </div>

          <div className="col-lg-4 zomatoImage">
            <img
              src={
                "https://assets-global.website-files.com/604a97c70aee09eed25ce991/61897a35583a9b51db018d3e_MartinPublicSeating-97560-Importance-School-Library-blogbanner1.jpg"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
