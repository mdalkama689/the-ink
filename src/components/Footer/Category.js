import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../config/Config";

const Category = ({ activeCategoryId, setActiveCategoryId }) => {
  const [CategorieList, setCategorieList] = useState([]);

  useEffect(() => {
    const GetCategorieList = async () => {
      await axios.get(`${API_BASE_URL}/category-list`).then((response) => {
        setCategorieList(response.data.data);
      });
    };

    GetCategorieList();
  }, []);

  const noOfCols = 2;
  const splitIndex =
    CategorieList && Math.ceil(CategorieList?.length / noOfCols);
  const categoryColumns = CategorieList && [
    CategorieList.slice(0, splitIndex),
    CategorieList.slice(splitIndex),
  ];

  return (
    <div className="footer-section">
      <div className="footerheading">Popular Categories</div>
      <div className="category-container">
        {CategorieList &&
          categoryColumns.map((col, ind) => (
            <CategoryColumn
              key={ind}
              activeCategoryId={activeCategoryId}
              CategorieList={col}
              setActiveCategoryId={setActiveCategoryId}
            />
          ))}
      </div>
    </div>
  );
};

function CategoryColumn({
  CategorieList,
  activeCategoryId,
  setActiveCategoryId,
}) {
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

export default Category;
