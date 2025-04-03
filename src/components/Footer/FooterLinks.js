const FooterLinks = () => {
  return (
    <div className="footer-section">
      <div className="footerheading">Quick Links</div>
      <div className="category-container">
        {/* First Column */}
        <div>
          <ul className="category-list">
            <li>
              <a href="#" className="category-link">
                About
              </a>
            </li>
            <li>
              <a href="#" className="category-link">
                Contact
              </a>
            </li>
            <li>
              <a href="/privacy-policy" className="category-link">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Second Column */}
        <div>
          <ul className="category-list">
            <li>
              <a href="/terms-condition" className="category-link">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/publisher-details" className="category-link">
                Publisher Details
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
