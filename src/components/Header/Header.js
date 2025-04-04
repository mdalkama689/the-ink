import React, { useState, useEffect } from "react";
import "../../assets/css/color.css";
import "../../assets/css/responsive.css";
import "../../assets/css/style.css";
import "../../assets/css/widgets.css";
import "../../assets/css/vendor/slicknav.css";
import newsLogo from "../../assets/images/NewsLogo2.png";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "axios";
import { API_BASE_URL } from "../../config/Config";
import { Link } from "react-router-dom";
const Header = () => {
  const [CategorieList, setCategorieList] = useState([]);
  const [webDashBoard, setWebDashBoard] = useState({
    reals: [],
    posts: [],
    all_posts: [],
    slider: [],
    tranding_post: [],
  });
  const GetCategorieList = async () => {
    await axios.get(`${API_BASE_URL}/category-list`).then((response) => {
      setCategorieList(response.data.data);
    });
  };
  const GetWebDashBoardCategory = async (id) => {
    await axios
      .get(`${API_BASE_URL}/web-dashboard?category_id=${id}`)
      .then((response) => {
        setWebDashBoard(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    GetCategorieList();
    GetWebDashBoardCategory(1);
  }, []);

  return (
    <div className="main-wrap">
      <div id="top-head" className="header-top-bar align-items-center p-9">
        <div className="container">
          <div className="row">
            <div className="col-md-8">
              {/* <ul class="con-info-list m-0">
                <li><i class="ti-calendar" aria-hidden="true"></i><span id="current_date">December 6, 2023</span></li>
                <li><i class="ti-alarm-clock" aria-hidden="true"></i>Last Update November 30, 2018 11:07 am</li>
                <li><i class="ti-location-arrow" aria-hidden="true"></i>Australia</li></ul> */}
            </div>
            <div className="col-md-4 text-right">
              <ul className="top-head-social m-0">
                <li>
                  <a href="https://www.facebook.com/">
                    <i className="ti-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.twitter.com/">
                    <i className="ti-twitter-alt"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/">
                    <i className="ti-linkedin"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.pinterest.com/">
                    <i className="ti-pinterest-alt"></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/">
                    <i className="ti-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Navbar
        expand="lg"
        bg="white"
        data-bs-theme="white"
        className="nav_custome"
      >
        <Container>
          {/* <Navbar.Brand href="#home"><img src={newsLogo} alt="" /> </Navbar.Brand> */}
          <Link to="/">
            <Navbar.Brand href="#home">
              <img src={newsLogo} alt="" />{" "}
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              {/* {
              CategorieList?.map((CategorieListResult)=>{
                return(
                  <>
            <Nav.Link to="#home">{CategorieListResult?.title}</Nav.Link>
                  </>
                )
              })
            } */}
              {/* </Nav>
          <Nav>
            <Nav.Link href="#deets"><i class="ti-search"></i></Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
