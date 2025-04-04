const FooterLinksForMobile = () => {
  const links = [
    {
      id: 1,
      url: "#",
      name: "About",
    },
    {
      id: 2,
      url: "#",
      name: "Contact",
    },
    {
      id: 3,
      url: "/privacy-policy",
      name: "Privacy Policy",
    },
    {
      id: 4,
      url: "/terms-condition",
      name: "Terms and Conditions",
    },
    {
      id: 5,
      url: "/publisher-details",
      name: "Publisher Details",
    },
  ];

  return (
    <div>
      <div className="footer-section">
        <div className="category-heading">
          <span className="category-heading-text">Quick Links</span>
        </div>
        <div className="category-container">
          <div>
            <ul className="category-list footer-links-list">
              {links.map((link) => (
                <li>
                  <a href={link.url} className="category-link">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterLinksForMobile;
