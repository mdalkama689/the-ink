const Category = () => {
  return (
    <div className="footer-section">
      <div className="footerheading">Popular Categories</div>
      <div className="category-container">
        {/* First Column */}
        <div>
          <ul className="category-list">
            <li>
              <a href="/" className="category-link">
                Home
              </a>
            </li>
            <li>
              <a href="/" className="category-link">
                Education
              </a>
            </li>
            <li>
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
