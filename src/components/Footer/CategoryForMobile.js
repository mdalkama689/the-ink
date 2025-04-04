const CategoryForMobile = ({
  categorieList,
  activeCategoryId,
  setActiveCategoryId,
}) => {
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
            categorieList={categorieList}
          />
        </div>
      </div>
    </div>
  );
};

function CategoryList({
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
          <li
          key={item.id}
          onClick={() => handleSearchKey(item.id)}>
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
