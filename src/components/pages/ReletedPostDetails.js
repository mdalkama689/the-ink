import React, { useEffect, useState } from "react";
import "../../assets/css/color.css";
import "../../assets/css/responsive.css";
import "../../assets/css/widgets.css";
import "../../assets/css/style.css";
import { Link, useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { API_BASE_URL } from "../../config/Config";
import axios from "axios";
import moment from "moment";
import 'moment/locale/hi';
import { FaBars } from "react-icons/fa";
import ReactHtmlParser from "react-html-parser";
import Dropdown from "react-bootstrap/Dropdown";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import newsLogo from "../../assets/images/NewsLogo2.png";
import { FaFacebook } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";

const ReletedPostDetails = () => {
  const [ReletedPostDetails, setReletedPostDetails] = useState({});
  const [CategorieList, setCategorieList] = useState([]);
  const [videoPath, setVideoPath] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("lang")
  );
  const { id } = useParams();
  useEffect(() => {
    const GetReletedPostDetails = async () => {
      let ApiData = {
        language: localStorage.getItem("lang")
          ? localStorage.getItem("lang")
          : "En",
      };
      axios
        .get(`${API_BASE_URL}/web-post-detail?id=${id}&language=${ApiData.language}`)
        .then((response) => {
          setReletedPostDetails(response.data);
          setVideoPath(response.data.data.vedio_file);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    GetReletedPostDetails();
    // GetCategorieList();
  }, [id]);
  console.log("ReletedPostDetails", ReletedPostDetails)

  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const toggleCanvas = () => {
    setIsCanvasOpen(!isCanvasOpen);
    console.log("isCanvasOpen", isCanvasOpen);
  };

  const closeCanvas = () => {
    console.log("out");
    setIsCanvasOpen(false);
  };
  const handleLanguageDropdown = (eventKey) => {
    console.log("selected lang", eventKey);
    localStorage.setItem("lang", eventKey);
    setSelectedLanguage(eventKey);
  };
  // This Methods for the Get CateGoriesList
  const GetCategorieList = async () => {
    await axios.get(`${API_BASE_URL}/category-list`).then((response) => {
      setCategorieList(response.data.data);
    });
  };
  useEffect(() => {
    GetCategorieList();
  }, [])

  
  return (
    <div>
      <div className={`main-wrap ${isCanvasOpen ? "canvas-opened" : ""}`}>
        {/* <!--Offcanvas sidebar--> */}
        {isCanvasOpen && (
          <aside
            id="sidebar-wrapper"
            className="custom-scrollbar p-5 offcanvas-sidebar position-right
                ps ps--active-x ps--active-y d-block d-md-none d-lg-none d-xl-none"
          >
            <button className="off-canvas-close" onClick={closeCanvas}>
              <i className="ti-close"></i>
            </button>
            <div className="sidebar-inner">
              <div className="sidebar-widget widget_categories border-radius-10 bg-white mb-30">
                <div className="widget-header position-relative mb-15">
                  <h5 className="widget-title">
                    <strong>Categories</strong>
                  </h5>
                </div>
                <div className="menu-container" onClick={closeCanvas}>
                </div>
              </div>
            </div>
            <div className="ps__rail-x">
              <div class="ps__thumb-x"></div>
            </div>
            <div className="ps__rail-y">
              <div className="ps__thumb-y"></div>
            </div>
          </aside>
        )}
        {/* <!-- Main Header --> */}
        <div className="main-wrap">
          <div id="top-head" class="header-top-bar align-items-center">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-7 col-md-8">

                  <ul className="top-head-social m-0 d-flex">
                    <a href="https://www.facebook.com/"><li><FaFacebook /></li></a>
                    <a href="https://www.instagram.com/"><li><LuInstagram /></li></a>
                    <a href="https://www.twitter.com/"><li><FaTwitter /></li></a>
                    <a href="https://www.pinterest.com/"><li><FaPinterest /></li></a>
                    <a href="https://www.linkedin.com/in/"><li><FaLinkedinIn /></li></a>
                  </ul>

                </div>
                <div className="col-5 col-md-4">
                  <div className="d-flex align-items-center justify-content-end">

                    <div className="select_language">
                      <Dropdown
                        onSelect={handleLanguageDropdown}
                        value={selectedLanguage}
                        className="bootstrapDropdown"
                      >
                        <Dropdown.Toggle
                          className="DropdownToggle"
                          style={{ color: "grey", backgroundColor: "#f7f8f9" }}
                        >
                          {selectedLanguage ? (
                            selectedLanguage == "Hi" ? (
                              <span>
                                Hindi </span>
                            ) : (
                              <span>
                                English </span>

                            )
                          ) : (
                            <span>English</span>
                          )}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="select_language DropdownMenu">
                          <Dropdown.Item eventKey="Hi">
                            <span>
                              Hindi </span>
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="En">
                            <span>
                              English </span>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <Navbar expand="lg" bg="white" data-bs-theme="white" className="nav_custome">
            <Container>
              <Link to="/" className="m-0">
                <Navbar.Brand><img src={newsLogo} alt="" /> </Navbar.Brand>
              </Link>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll" className="justify-content-between m-0 ml-30">
                <Nav className="me-auto">
                  {
                    CategorieList?.map((CategorieListResult) => {
                      return (
                        <>
                          <Link
                            to='/'
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                          >
                            {CategorieListResult?.title}
                          </Link>
                        </>
                      )
                    })
                  }
                </Nav>
              </Navbar.Collapse>
            </Container>

            <div className="mobile_viewsearch d-block d-md-none d-lg-none">
              <div className="container">
                <div className="row">
                  <div className="col-12 p-0">
                  </div>
                </div>
              </div>
            </div>
          </Navbar>
        </div>
        {/* off-canvas-toggle-cover */}
        <div className="off-canvas-toggle-cover">
          <div
            className="off-canvas-toggle hidden d-inline-block ml-15" id="off-canvas-toggle">
            <FaBars
              name="grid-outline"
              onClick={toggleCanvas}
              role="img"
              className="md hydrated  d-block d-md-none d-lg-none d-xl-none"
              aria-label="grid outline"
            />
          </div>
        </div>
        {/* <!-- Main Wrap Start --> */}

        <main className="position-relative">
          <div className="container">

            <div className="row mb-50 pt-100">
              <div className="col-lg-8 col-md-12 ">
                <div class="entry-bottom mb-20">
                  <div class="overflow-hidden">

                    <div class="tags text-muted font-small pt-1 my-auto">
                     
                      <span class="update-on mx-3">
                        {
                          ReletedPostDetails?.data?.language === "Hi" ? (
                            moment().diff(moment(ReletedPostDetails?.data?.created_at), 'hours') < 24
                              ? moment(ReletedPostDetails?.data?.created_at).locale('hi').fromNow()
                              : moment(ReletedPostDetails?.data?.created_at)
                                .locale('hi')
                                .format("DD MMMM YYYY")
                                .replace(/[०१२३४५६७८९]/g, function (match) {
                                  return "0123456789"["०१२३४५६७८९".indexOf(match)];
                                })
                          ) : (
                            moment().diff(moment(ReletedPostDetails?.data?.created_at), 'hours') < 24
                              ? moment(ReletedPostDetails?.data?.created_at).locale('en').fromNow()
                              : moment(ReletedPostDetails?.data?.created_at).locale('en').format("DD MMMM YYYY")
                          )
                        }
                      </span>
                    </div>
                  </div>
                </div>
                <div className="entry-header entry-header-1">

                  <h4 className="post-title 1hbase mb-20">{ReletedPostDetails?.data?.title}</h4>

                </div>
                <div className="news_post_view">
                  {ReletedPostDetails?.data ? (
                    ReletedPostDetails?.data?.file_type === "videos" ? (
                      <video
                        controls
                        poster={ReletedPostDetails?.data?.thumbnel}
                        autoplay
                        className="photo-item__video NewsDetailsVideos"
                        loop
                        muted
                        preload="auto"
                      >
                        <source src={videoPath} type="video/mp4" />
                      </video>
                    ) : (
                      <img src={ReletedPostDetails?.data?.get_images[0]?.image} alt="post-slider" />
                    )
                  ) : (
                    <figure className="single-thumnail mb-30">
                      <img src={ReletedPostDetails?.data?.thumbnel} alt="" style={{ width: "100%" }} />
                      <div className="credit mt-15 font-small color-grey">
                        <i className="ti-credit-card mr-5"></i>
                      </div>
                    </figure>
                  )}
                </div>
                <div className="single-excerpt">
                  <ul className="d-flex">
                    <a href="https://www.facebook.com/"><li><FaFacebook /></li></a>
                    <a href="https://www.instagram.com/"><li><LuInstagram /></li></a>
                    <a href="https://www.twitter.com/"><li><FaTwitter /></li></a>
                    <a href="https://www.pinterest.com/"><li><FaPinterest /></li></a>
                    <a href="https://www.linkedin.com/in/"><li><FaLinkedinIn /></li></a>
                  </ul>
                </div>
                <div className="entry-main-content">
                  <hr className="wp-block-separator is-style-wide" />
                  {ReactHtmlParser(ReletedPostDetails?.data?.short_decription)}
                </div>

                {/* <!--related posts--> */}

              </div>
              {/* <!--End col-lg-8--> */}
              <div className="col-lg-4 col-md-12 sidebar-right">
                {/* <div class="topstories_title px-4 py-2 bg-danger mb-3 text-white">Latest Update </div> */}
                <div className="sidebar-widget widget-latest-comments wow fadeIn animated">
                  <div className="p-20 bg-white">
                    <div className="widget-header">
                      <h5 className="widget-title">
                        Last <span>Comments</span>
                      </h5>
                    </div>
                    <div className="post-block-list post-module-6">
                      {ReletedPostDetails?.postComment?.map((Commentresult) => {
                        return (
                          <>
                            <div className="last-comment mb-20 d-flex wow fadeIn animated">
                              <span className="item-count vertical-align">
                                <Link
                                  className="red-tooltip author-avatar"
                                  to="#"
                                >
                                  <img
                                    src={Commentresult?.get_user?.profile}
                                  
                                    alt=""
                                  />
                                </Link>
                              </span>
                              <div className="alith_post_title_small">
                                <p className="font-medium mb-10">
                                  {Commentresult?.comment}
                                </p>
                                <div class="entry-meta meta-1 font-x-small color-grey float-left text-uppercase mb-10">
                                  <span className="post-by">
                                    By{" "}
                                    <Link to="/ ">
                                      {Commentresult?.get_user?.name}{" "}
                                      {Commentresult?.get_user?.lname}
                                    </Link>
                                  </span>
                                  <span className="post-on">

                                    {
                                      Commentresult?.language === "Hi" ? (
                                        moment().diff(moment(Commentresult?.created_at), 'hours') < 24
                                          ? moment(Commentresult?.created_at).locale('hi').fromNow()
                                          : moment(Commentresult?.created_at)
                                            .locale('hi')
                                            .format("DD MMMM YYYY")
                                            .replace(/[०१२३४५६७८९]/g, function (match) {
                                              return "0123456789"["०१२३४५६७८९".indexOf(match)];
                                            })
                                      ) : (
                                        moment().diff(moment(Commentresult?.created_at), 'hours') < 24
                                          ? moment(Commentresult?.created_at).locale('en').fromNow()
                                          : moment(Commentresult?.created_at).locale('en').format("DD MMMM YYYY")
                                      )
                                    }
                                  </span>
                                </div>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        </main>
        {/* <!-- Footer Start--> */}
        <Footer />
      </div>
      {/* <!-- Main Wrap End--> */}
      <div className="dark-mark"></div>
      <Link
        id="scrollUp"
        to="#top"
        style={{ display: "none", position: "fixed", zIndex: "214783647" }}
      >
        <i className="ti-arrow-up"></i>
      </Link>
    </div>
  );
};

export default ReletedPostDetails;
