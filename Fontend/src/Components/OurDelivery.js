import React from "react";
import "./OurDelivery.css";

const OurDelivery = () => {
  return (
    <>
      {/* <h2
        className="text-center my-5 text-bold"
        style={{ fontStyle: 'italic' }}
      >
        BK Book
      </h2> */}

      <div className="conatiner-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-5 d-flex justify-content-end my-2 p-2">
            <img
              src={
                "https://divbyzero.com/wp-content/uploads/2024/01/best-personal-growth-books.jpg"
              }
              alt="TwoPhoneImage"
              className="ShoutImage"
            />
          </div>

          <div className="col-lg-3  d-flex flex-column justify-content-center my-2 align-items-center">
            <h3 className="text-success text-bold">
              Choose a book for yourself
            </h3>
            <h4
              className="text-center text-bold"
              style={{ fontStyle: "italic" }}
            >
              Việc đọc rất quan trọng. Nếu bạn biết cách đọc, cả thế giới sẽ mở
              ra cho bạn
            </h4>
            <button className="btn btn-dark">Get Started</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurDelivery;
