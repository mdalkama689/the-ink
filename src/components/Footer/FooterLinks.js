const FooterLinks = () => {
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

  const noOfCols = 2;
  const splitIndex = Math.ceil(links.length / noOfCols);

  const subLinks = [links.slice(0, splitIndex), links.slice(splitIndex)];

  return (
    <div className="footer-section">
      <div className="footerheading">Quick Links</div>
      <div className="category-container">
        {subLinks.map((item, ind) => (
          <FooterLinksColumn key={ind} links={item} />
        ))}
      </div>
    </div>
  );
};

export default FooterLinks;

function FooterLinksColumn({ links }) {
  return (
    <div>
      <ul className="category-list">
        {links.map((link, ind) => (
          <li key={ind}>
            <a href={link.url} className="category-link">
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Extra() {
  return (
    <>
      <div>
        <ul className="category-list">
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
    </>
  );
}
