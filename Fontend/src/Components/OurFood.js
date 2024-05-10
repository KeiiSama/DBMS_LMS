import React, { useState } from 'react'
import './OurFood.css'
import { MyContext } from './Context/CounterContext'

const OurFood = ({
  MaSoSach,
  NhaPhatHanh,
  SoLuong,
  SoLuongConLai,
  DanhMuc,
  TrangThai,
  Mota,
  Anh,
  TacGia,
  TenSach,
}) => {
  const { handleIncrease } = MyContext()
  const [showDetail, setShowDetail] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [reviews, setReviews] = useState([])

  // Tạo dữ liệu giả cho các review
  const fakeReviews = [
    {
      name: 'Nguyễn Văn Quý',
      comment:
        'Rất hài lòng với sản phẩm này, chất lượng tuyệt vời và giá cả hợp lý.',
      rating: 5,
    },
    {
      name: 'Trần Thị Quý',
      comment:
        'Sản phẩm này không đáp ứng được mong đợi của tôi. Chất lượng kém và dịch vụ sau bán hàng không tốt.',
      rating: 2,
    },
    {
      name: 'Hoàng Văn Quý',
      comment:
        'Rất ấn tượng với tính năng và hiệu suất của sản phẩm. Đáng giá tiền bỏ ra.',
      rating: 4,
    },
  ]

  // Đưa dữ liệu giả vào state reviews khi component được render
  useState(() => {
    setReviews(fakeReviews)
  }, []) // Sử dụng mảng rỗng để chỉ chạy một lần khi component được render

  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }

  const toggleReview = () => {
    setShowReview(!showReview)
  }

  const handleReviewSubmit = (review) => {
    setReviews([...reviews, review])
  }

  const { handleDanhgia } = MyContext()
  return (
    <>
      <div className="row">
        <div
          className="col-lg-3 my-2 d-flex justify-content-center align-items-center ourfood"
          // style={{ marginRight: "10px" }}
        >
          <img src={Anh} className="ourImg" alt="Food" />
        </div>

        <div
          className="col-lg-3 my-2 d-flex justify-content-center align-items-center"
          style={{ marginRight: '100px' }}
        >
          <div
            className="col-lg-12 d-flex justify-content-center flex-column align-items-left"
            style={{ maxWidth: '400px' }}
          >
            <h4 className="text-bold" style={{ maxWidth: '400px' }}>
              {TenSach}
            </h4>
            <h4
              className="text-bold"
              style={{ fontSize: '16px', fontStyle: 'italic' }}
            >
              Tác giả: {TacGia}
            </h4>
            <h4
              className="text-bold"
              style={{ fontSize: '14px', fontStyle: 'italic' }}
            >
              Số lượng: {SoLuong}
            </h4>
            <div className="button-group">
              <button className="btn btn-dark mr-1" onClick={handleIncrease}>
                Add to cart
              </button>
              <button className="btn btn-warning ml-1" onClick={toggleDetail}>
                Detail
              </button>
              <button className="btn btn-info ml-1" onClick={toggleReview}>
                Review
              </button>
            </div>
          </div>
        </div>

        {showDetail && (
          <div className="col-lg-3 my-2">
            <div className="col-lg-12">
              <h4
                className="text-bold text-primary text-center text-nowrap"
                style={{ fontSize: '18px', fontStyle: 'italic' }}
              >
                Mã số sách: {MaSoSach}
              </h4>

              <h4
                className="text-bold text-nowrap"
                style={{ fontSize: '18px', fontStyle: 'italic' }}
              >
                Nhà phát hành: {NhaPhatHanh}
              </h4>
              <h4
                className="text-bold text-nowrap"
                style={{ fontSize: '18px', fontStyle: 'italic' }}
              >
                Tác giả: {TacGia}
              </h4>
              <h4
                className="text-bold text-nowrap"
                style={{ fontSize: '18px', fontStyle: 'italic' }}
              >
                Số lượng còn lại: {SoLuongConLai}
              </h4>

              {/* <h4
              className=" text-nowrap"
              style={{ fontSize: "18px", fontStyle: "italic" }}
            >
              Trạng thái:
              <span className="detail_mota_font">{TrangThai}</span>
            </h4> */}
              <h4 className="outbook_detail_mota" style={{ fontSize: '18px' }}>
                <span style={{ fontStyle: 'italic' }}>Mô tả:</span>{' '}
                <span className="detail_mota_font">{Mota}</span>
              </h4>
            </div>
          </div>
        )}

        {showReview && (
          <div className="col-lg-4 my-2">
            <div className="review-section">
              <h4 className="review-title">Reviews:</h4>
              {reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <h5 className="reviewer-name">Reviewer {index + 1}</h5>
                  <p className="review-content">Tên: {review.name}</p>
                  <p className="review-content">Nhận xét: {review.comment}</p>
                  <p className="review-content">Rating: {review.rating}/5</p>
                </div>
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const newReview = {
                    name: 'Bạn',
                    comment: e.target.comment.value,
                    rating: parseInt(e.target.rating.value),
                  }
                  handleReviewSubmit(newReview)
                }}
              >
                <div className="form-group">
                  <label htmlFor="comment">Nhận xét:</label>
                  <textarea
                    className="form-control"
                    id="comment"
                    rows="3"
                  ></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="rating">Rating:</label>
                  <input
                    type="number"
                    className="form-control"
                    id="rating"
                    min="1"
                    max="5"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default OurFood
