const Category = ({ activeCategoryId, setActiveCategoryId, categorieList }) => {
  const noOfCols = 2;
  const splitIndex = Math.ceil(categorieList.length / noOfCols);
  const categoryColumns = [
    categorieList.slice(0, splitIndex),
    categorieList.slice(splitIndex),
  ];

  return (
    <div className="footer-section">
      <div className="footerheading">Popular Categories</div>
      <div className="category-container">
        {categoryColumns.map((col, ind) => (
          <CategoryColumn
            key={ind}
            activeCategoryId={activeCategoryId}
            categorieList={col}
            setActiveCategoryId={setActiveCategoryId}
          />
        ))}
      </div>
    </div>
  );
};

function CategoryColumn({
  categorieList,
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
        {categorieList.map((item) => (
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
