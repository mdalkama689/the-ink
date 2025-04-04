import React, { useState } from "react";
import { Link } from "react-router-dom";
import newsLogo from "../../assets/images/NewsLogo2.png";
import { Navbar } from "react-bootstrap";
import useDeviceType from "../../hooks/useDeviceType";
import CategoryForMobile from "./CategoryForMobile";
import FooterLinksForMobile from "./FooterLinksForMobile";
import FooterLinks from "./FooterLinks";
import Category from "./Category";
import SocialLinks from "./SocialLinks";
import CopyRight from "./CopyRight";

const Footer = ({ activeCategoryId, setActiveCategoryId, categorieList }) => {
  const deviceType = useDeviceType();

  return (
    <div className="footer">
      <CompanyLogo />

      {deviceType == "big" ? (
        <div className="footer-content">
          <Category
            activeCategoryId={activeCategoryId}
            setActiveCategoryId={setActiveCategoryId}
          />
          <FooterLinks />
        </div>
      ) : (
        <>
          <CategoryForMobile
            activeCategoryId={activeCategoryId}
            setActiveCategoryId={setActiveCategoryId}
          />
          <FooterLinksForMobile />
        </>
      )}

      <div className="footer-social">
        <SocialLinks />
      </div>
      <div className="footer-copyright">
        <CopyRight />
      </div>
    </div>
  );
};

function CompanyLogo() {
  return (
    <Link
      to="/"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "30px",
      }}
    >
      <Navbar.Brand href="#home">
        <img src={newsLogo} alt="" />{" "}
      </Navbar.Brand>
    </Link>
  );
}

export default Footer;
