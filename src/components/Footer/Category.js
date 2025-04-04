import axios from "axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../../config/Config";

const Category = ({setSearchKey}) => {
 
  
  useEffect(() => {
    const searchKey = "Education"
   const res = async () => {
    const ApiData = {
      language: localStorage.getItem("lang")
        ? localStorage.getItem("lang")
        : "En",
    };
    const response =     await axios
          .get(
            `${API_BASE_URL}/category-topnews?search=${searchKey}&language=${ApiData.language}`
          )

          console.log(response)
   }
   res()
  }, [])

  return (
    <div className="footer-section">
      <div className="footerheading">Popular Categories</div>
      <div className="category-container">
        {/* First Column */}
        <div>
          <ul className="category-list">
            <li>
              <a
          onClick={() => alert("hel")}
              href="/" className="category-link">
                Home
              </a>
            </li>
            <li
            onClick={() => addFunction("education")}
            >
              <a href="/"

              className="category-link">
                Education
              </a>
            </li>
            <li
              onClick={() => addFunction("Politics")}
            >
              <a href="/" className="category-link">
                Politics
              </a>
            </li>
            <li>
              <a href="/" className="category-link">
                Sports
              </a>
            </li>
          </ul>
        </div>

        {/* Second Column */}
        <div>
          <ul className="category-list">
            <li>
              <a href="/" className="category-link">
                Travel
              </a>
            </li>
            <li>
              <a href="/" className="category-link">
                Art
              </a>
            </li>
            <li>
              <a href="/" className="category-link">
                State
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Category;
