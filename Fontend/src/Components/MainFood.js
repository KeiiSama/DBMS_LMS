import React, { useState, useEffect } from "react";
import OurFood from "./OurFood";
import "./MainFood.css";
let globalFilter = false;
const MainFood = () => {
  const [foodData, setFoodData] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // console.log(foodData);
  useEffect(() => {
    fetch("http://localhost:3001/api/books/all")
      .then((response) => response.json())
      .then((data) => setFoodData(data.data))
      .catch((error) => console.error("Error fetching food data:", error));
  }, []);
  console.log("fooddataa", foodData);
  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    // console.log("value", value);
    if (checked) {
      if (value == "Sách kinh tế") {
        setSelectedCategories([...selectedCategories, "Kinh Te"]);
      }
      if (value == "Sách tiếng Anh") {
        setSelectedCategories([...selectedCategories, "Ngoai Ngu"]);
      }
      if (value == "Sách văn học") {
        setSelectedCategories([...selectedCategories, "Van Hoc"]);
      }
      if (value == "Sách lịch sử") {
        setSelectedCategories([...selectedCategories, "Lich Su"]);
      }
      if (value == "Sách địa lý") {
        setSelectedCategories([...selectedCategories, "Dia Ly"]);
      }
      if (value == "Sách khoa học") {
        setSelectedCategories([...selectedCategories, "Khoa Hoc"]);
      }
      if (value == "Sách tiểu thuyết") {
        setSelectedCategories([...selectedCategories, "Tieu Thuyet"]);
      }
      if (value == "Sách tư tưởng") {
        setSelectedCategories([...selectedCategories, "Tu Tuong"]);
      }
      if (value == "Sách âm nhạc") {
        setSelectedCategories([...selectedCategories, "Am Nhac"]);
      }
    } else {
      let check;
      if (value == "Sách kinh tế") {
        check = "Kinh Te";
      }
      if (value == "Sách tiếng Anh") {
        check = "Ngoai Ngu";
      }
      if (value == "Sách văn học") {
        check = "Van Hoc";
      }
      if (value == "Sách lịch sử") {
        check = "Lich Su";
      }
      if (value == "Sách địa lý") {
        check = "Dia Ly";
      }
      if (value == "Sách khoa học") {
        check = "Khoa Hoc";
      }
      if (value == "Sách tiểu thuyết") {
        check = "Tieu Thuyet";
      }
      if (value == "Sách tư tưởng") {
        check = "Tu Tuong";
      }
      if (value == "Sách âm nhạc") {
        check = "Am Nhac";
      }

      setSelectedCategories(
        selectedCategories.filter((category) => category !== check)
      );
    }
  };
  console.log("selectedCategories", selectedCategories);
  const callApi = () => {
    // setSelectedCategories([]);
    console.log("her", selectedCategories);
    if (selectedCategories.length === 0) {
      fetch("http://localhost:3001/api/all")
        .then((response) => response.json())
        .then((data) => setFoodData(data.data))
        .catch((error) => console.error("Error fetching food data:", error));
    } else {
      const params = new URLSearchParams({ categories: selectedCategories });
      const url = `http://localhost:3001/api/books/filterbook?${params}`;

      fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => setFoodData(data))
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <>
      <div className="mainfood">
        <div
          className="col-lg-1 d-flex justify-content-top flex-column align-items-left"
          style={{
            marginRight: "50px",
            marginTop: "80px",
            marginLeft: "50px",
            width: "100px",
          }}
        >
          <div className="mainbook_title_filter">Bộ lọc tìm kiếm</div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Sách kinh tế"
              id="flexCheckEconomic"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="flexCheckEconomic">
              Sách kinh tế
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Sách tiếng Anh"
              id="flexCheckEnglish"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="flexCheckEnglish">
              Sách tiếng Anh
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Sách văn học"
              id="flexCheckVanhoc"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="flexCheckVanhoc">
              Sách văn học
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Sách lịch sử"
              id="flexCheckHistorical"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="flexCheckHistorical">
              Sách lịch sử
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Sách địa lý"
              id="flexCheckGeography"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="flexCheckGeography">
              Sách địa lý.
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Sách khoa học"
              id="flexCheckScience"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="flexCheckScience">
              Sách khoa học
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Sách tư tưởng"
              id="flexIdeology"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="flexIdeology">
              Sách tư tưởng
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Sách tiểu thuyết"
              id="flexNovel"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="flexNovel">
              Sách tiểu thuyết
            </label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Sách âm nhạc"
              id="flexMusic"
              onChange={handleCheckboxChange}
            />
            <label className="form-check-label" htmlFor="flexMusic">
              Sách âm nhạc
            </label>
          </div>

          <button
            className="btn btn-dark mr-1"
            onClick={callApi}
            style={{ marginTop: "10px" }}
          >
            Tìm kiếm
          </button>
        </div>
        <div className="row d-flex jstify-content-between">
          {foodData.map((food, i) => (
            <OurFood key={i} {...food} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainFood;
