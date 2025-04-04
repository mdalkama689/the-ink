const socialMediaLinks = [
  { id: 1, url: "https://www.facebook.com", iconClass: "ti-facebook" },
  { id: 2, url: "https://twitter.com", iconClass: "ti-twitter-alt" },
  { id: 3, url: "https://www.linkedin.com", iconClass: "ti-linkedin" },
  { id: 4, url: "https://www.pinterest.com", iconClass: "ti-pinterest-alt" },
  { id: 5, url: "https://www.instagram.com", iconClass: "ti-instagram" },
];

const SocialLinks = () => {
  return (
    <div className="tex">
      <ul className="top-head-social m-0">
        {socialMediaLinks.map((link, ind) => (
          <li key={ind}>
            <a target="_blank" href={link.url}>
              <i className={`${link.iconClass} social-icon`}></i>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;
