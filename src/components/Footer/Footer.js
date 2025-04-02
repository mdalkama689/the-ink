import React from "react";
import { Link } from "react-router-dom";
import newsLogo from "../../assets/images/NewsLogo2.png";
const Footer = () => {
  return (
    <div>
      <footer className="bg-light">
        <div class="footer-area pt-50">
          <div class="container">
            <div class="row pb-30">
              <div class="col-12 col-md-6 footersec">
                <Link to="/">
                  <div className="footerlogo mb-4">
                    <img src={newsLogo} width={200} alt="logo" />
                  </div>
                </Link>

                {/* <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p> */}
                <div class="tex">
                  <ul class="top-head-social m-0">
                    <li>
                      <a target="_blank" href="#">
                        <i class="ti-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="#">
                        <i class="ti-twitter-alt"></i>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="#">
                        <i class="ti-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="#">
                        <i class="ti-pinterest-alt"></i>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="#">
                        <i class="ti-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div class="col footersec">
                                <div className="footerheading">Popular Categories</div>
                                <ul class="float-left mr-30 font-medium">
                                    <li class="cat-item cat-item-2"><a href="#">Healthy Living</a></li>
                                    <li class="cat-item cat-item-3"><a href="#">Medical Research</a></li>
                                    <li class="cat-item cat-item-4"><a href="#">Children’s Health</a></li>
                                    <li class="cat-item cat-item-5"><a href="#">Around the World</a></li>
                                    <li class="cat-item cat-item-6"><a href="#">Ad Choices</a></li>
                      
                                </ul>
                            </div> */}

              <div class="col-12 col-md-6 footersec">
                <div className="footerheading">Popular Categories</div>
                <Category />

                <div className="footer-quick-links">Quick Links</div>
                <FooterLinks />
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom-area text-muted">
          <div class="container">
            <div class="footer-border pt-20 pb-20">
              <div class="row d-flex align-items-center justify-content-between">
                <div class="col-12">
                  <div class="footer-copy-right">
                    <p class="font-small text-muted">
                      © 2024, News | All rights reserved
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

function FooterLinks() {
  return (
    <ul class="float-left d-md-flex font-medium">
      <li class="cat-item cat-item-2">
        <a href="#">About</a>
      </li>
      <li class="cat-item cat-item-3">
        <a href="#">Contact</a>
      </li>
      <li class="cat-item cat-item-4">
        <Link to="/privacy-policy">Privacy Policy</Link>
      </li>
      <li class="cat-item cat-item-4">
        <Link to="/terms-condition">Terms & Conditions</Link>
      </li>
      <li class="cat-item cat-item-4">
        <Link to="/publisher-details">Publisher Details</Link>
      </li>
    </ul>
  );
}

function Category() {
  return (
    <ul class="float-left d-md-flex font-medium">
      <li class="cat-item cat-item-2">
        <a href="/">Home</a>
      </li>
      <li class="cat-item cat-item-3">
        <a href="/">Education</a>
      </li>
      <li class="cat-item cat-item-4">
        <Link to="/">Politics</Link>
      </li>
      <li class="cat-item cat-item-4">
        <Link to="/">Sports</Link>
      </li>
      <li class="cat-item cat-item-4">
        <Link to="/">Travel</Link>
      </li>
      <li class="cat-item cat-item-4">
        <Link to="/">Art</Link>
      </li>
      <li class="cat-item cat-item-4">
        <Link to="/">State</Link>
      </li>
    </ul>
  );
}
