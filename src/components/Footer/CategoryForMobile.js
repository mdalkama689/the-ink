import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/Config";

const CategoryForMobile = ({ activeCategoryId, setActiveCategoryId }) => {
  return (
    <div>
      <div className="footer-section">
        <div className="category-heading">
          <span className="category-heading-text">Popular Categories</span>
        </div>
        <div className="category-container">
          <CategoryList
            activeCategoryId={activeCategoryId}
            setActiveCategoryId={setActiveCategoryId}
          />
        </div>
      </div>
    </div>
  );
};

function CategoryList({ activeCategoryId, setActiveCategoryId }) {
  const [CategorieList, setCategorieList] = useState([]);

  useEffect(() => {
    const GetCategorieList = async () => {
      await axios.get(`${API_BASE_URL}/category-list`).then((response) => {
        setCategorieList(response.data.data);
      });
    };

    GetCategorieList();
  }, []);

  const handleSearchKey = (value) => {
    setActiveCategoryId(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <ul className="category-list">
        {CategorieList.map((item) => (
          <li key={item.id} onClick={() => handleSearchKey(item.id)}>
            <div
              className={`category-link category-link-div ${
                activeCategoryId === item.id ? "category-selected-active" : ""
              }`}
            >
              {item.title}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryForMobile;
