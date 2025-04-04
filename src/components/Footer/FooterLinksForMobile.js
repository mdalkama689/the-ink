
const FooterLinksForMobile =() => {
    return (
      <div>
        <div className="footer-section">
          <div className="category-heading">
            <span className="category-heading-text">Quick Links</span>
          </div>
          <div className="category-container">
            <div>
              <ul className="category-list footer-links-list">
                <li>
                  <a href="/#" className="category-link">
                    About
                  </a>
                </li>
                <li>
                  <a href="/#" className="category-link">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="/privacy-policy" className="category-link">
                    Privacy Policy
                  </a>
                </li>
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
      </div>
    );
  }

  export default FooterLinksForMobile