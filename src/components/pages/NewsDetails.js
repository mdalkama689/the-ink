import React, { useEffect, useState } from "react";
import "../../assets/css/color.css";
import "../../assets/css/responsive.css";
import "../../assets/css/widgets.css";
import "../../assets/css/style.css";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer/Footer";
import { API_BASE_URL } from "../../config/Config";
import axios from "axios";
import moment, { min } from "moment";
import "moment/locale/hi";
import { FaBars } from "react-icons/fa";
import ReactHtmlParser from "react-html-parser";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import newsLogo from "../../assets/images/NewsLogo2.png";
import { FaFacebook } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { FaLinkedinIn } from "react-icons/fa6";
import SpinnerLoader from "../loader/SpinnerLoader";
import Loader from "../loader/Loader";

const NewsDetails = () => {
  const [CategorieList, setCategorieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [NewsDetails, setNewsDetails] = useState({});
  const [videoPath, setVideoPath] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("lang")
  );
  const [shortDetails, setShortDetails] = useState("");

  const { id } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  // Calculate indexes for slicing the array
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = NewsDetails?.related_post?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  // Handle pagination
  const totalPages = Math.ceil(
    (NewsDetails?.related_post?.length || 0) / postsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    const GetNewsDetails = async () => {
      setIsLoading(true);
      let ApiData = {
        language: localStorage.getItem("lang")
          ? localStorage.getItem("lang")
          : "En",
      };
      axios
        .get(
          `${API_BASE_URL}/web-post-detail?id=${id}&language=${ApiData.language}`
        )
        .then((response) => {
          setNewsDetails(response.data);
          setVideoPath(response.data.data.vedio_file);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          console.log(error);
        });
    };
    GetNewsDetails();
    // GetCategorieList();
  }, [id]);
  console.log("NewsDetails", NewsDetails?.data?.title);

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
  }, []);

  // const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(NewsDetails?.data?.title)}&quote=${NewsDetails?.data?.description}`;

  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(NewsDetails?.data?.title);
  const pageDescription = encodeURIComponent(NewsDetails?.data?.description);
  const imageUrl = encodeURIComponent(NewsDetails?.data?.image);

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
  const linkedinShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
  const pinterestShareUrl = `https://www.pinterest.com/pin/create/button/?url=${pageUrl}&media=${imageUrl}&description=${pageTitle}`;

  const shareUrl = window.location.href;
  const newsTitle = NewsDetails?.data?.title || "Default News Title";
  const newsDescription =
    NewsDetails?.data?.description || "Default News Description";
  const newsImage =
    NewsDetails?.data?.image || "https://yourwebsite.com/default-image.jpg";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const author_name = NewsDetails?.data?.author_name;
    const formatted_author_name = author_name
      ? author_name.charAt(0).toUpperCase() + author_name.slice(1).toLowerCase()
      : "";
    const state = NewsDetails?.data?.state;

    const updated_at = NewsDetails?.data?.updated_at;

    const formatted_updated_at = new Date(updated_at);
    const year = formatted_updated_at.getFullYear();
    const month = formatted_updated_at.getMonth();
    const date = formatted_updated_at.getDate();
    let hour = formatted_updated_at.getHours();
    const minute = formatted_updated_at.getMinutes();

    const timePeriod = hour >= 12 ? "PM" : "AM";

    hour = hour > 12 ? hour - 12 : hour;

    const date_in_good_form = `Last updated: ${date}-${months[month]}-${year}, ${hour}:${minute} ${timePeriod}`;
    const all_details_in_format = `${state} | ${formatted_author_name} | ${date_in_good_form}`;

    setShortDetails(all_details_in_format);
  }, [NewsDetails]);
  return (
    <div>
      <div className={`main-wrap ${isCanvasOpen ? "canvas-opened" : ""}`}>
        <Helmet>
          <title>{newsTitle}</title>
          <meta property="og:title" content={newsTitle} />
          <meta property="og:description" content={newsDescription} />
          <meta property="og:image" content={newsImage} />
          <meta property="og:url" content={shareUrl} />
          <meta property="og:type" content="article" />
        </Helmet>
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
                <div className="menu-container" onClick={closeCanvas}></div>
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
                    <a href={facebookShareUrl} target="_blank">
                      <li>
                        <FaFacebook />
                      </li>
                    </a>
                    {/* <a href="https://www.instagram.com/"><li><LuInstagram /></li></a> */}
                    <a href={twitterShareUrl}>
                      <li>
                        <FaTwitter />
                      </li>
                    </a>
                    {/* <a href={pinterestShareUrl}><li><FaPinterest /></li></a> */}
                    <a href={linkedinShareUrl}>
                      <li>
                        <FaLinkedinIn />
                      </li>
                    </a>
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
                              <span>Hindi </span>
                            ) : (
                              <span>English </span>
                            )
                          ) : (
                            <span>English</span>
                          )}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="select_language DropdownMenu">
                          <Dropdown.Item eventKey="Hi">
                            <span>Hindi </span>
                          </Dropdown.Item>
                          <Dropdown.Item eventKey="En">
                            <span>English </span>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
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
              <Link to="/" className="m-0">
                <Navbar.Brand>
                  <img src={newsLogo} alt="" />{" "}
                </Navbar.Brand>
              </Link>
              {/* <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse
                id="navbarScroll"
                className="justify-content-between m-0 ml-30"
              >
                <Nav className="me-auto">
                  {CategorieList?.map((CategorieListResult) => {
                    return (
                      <>
                        <Link
                          to="/"
                          role="tab"
                          // onClick={() => GetWebDashBoardCategory(CategorieListResult?.id)}
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                        
                          {CategorieListResult?.title}
                        </Link>
                      </>
                    );
                  })}
             
                </Nav>
                {/* <Nav className="d-none d-md-none d-lg-block">
                    <form
                      action="#"
                      method="get"
                      className="search-form d-lg-inline float-right
               position-relative m-xs-0 mr-30"
                      onChange={(e) => GetSearchData(e.target.value)}
                      onSubmit={(e) => {
                        e.preventDefault();
                        GetSearchData(searchKey);
                      }}
                    >
                      <div class="buscar-caja">
                        <input type="text" name="" value={searchKey} onChange={(e) =>
                          setSearchKey(e.target.value)} class="buscar-txt" placeholder="Search ....." />
                        <a class="buscar-btn"> <i class="fa fa-search" onClick={(e) =>
                          GetSearchData(e.target.value)}></i> </a>
                      </div>
                    </form>
                  </Nav> */}
              {/* </Navbar.Collapse> */} 
              <Category CategorieList={CategorieList} />
            </Container>

            <div className="mobile_viewsearch d-block d-md-none d-lg-none">
              <div className="container">
                <div className="row">
                  <div className="col-12 p-0">
                    {/* <form
                        action="#"
                        method="get"
                        className="search-form d-lg-inline float-right
               position-relative m-xs-0"
                        onChange={(e) => GetSearchData(e.target.value)}
                        onSubmit={(e) => {
                          e.preventDefault();
                          GetSearchData(searchKey);
                        }}
                      >
                        <div class="buscar-caja">
                          <input type="text" name="" value={searchKey} onChange={(e) =>
                            setSearchKey(e.target.value)} class="buscar-txt" placeholder="Search ....." />
                          <a class="buscar-btn"> <i class="fa fa-search" onClick={(e) =>
                            GetSearchData(e.target.value)}></i> </a>
                        </div>
                      </form> */}
                  </div>
                </div>
              </div>
            </div>
          </Navbar>
        </div>
        {/* off-canvas-toggle-cover */}
        {/* <div className="off-canvas-toggle-cover">
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
        </div> */}
        {/* <!-- Main Wrap Start --> */}
        {isLoading ? (
          <SpinnerLoader />
        ) : (
          <>
            <main className="position-relative">
              <div className="container">
                <div className="row mb-50 pt-100">
                  <div className="col-lg-8 col-md-12 ">
                    <div class="entry-bottom mb-20">
                      <div class="overflow-hidden">
                        <div class="tags text-muted font-small pt-1 my-auto">
                          {/* <span className="entry-meta meta-0 font-small mb-30">
                    <Link to="/" className="p-0">
                      <span className="post-cat bg-success color-white py-2">
                        {NewsDetails?.data?.tags}
                      </span>
                    </Link>
                  </span> */}
                          {/* <span className="post-by py-2"> <Link to="#"><i class="ti-user"></i> {NewsDetails?.data?.author_name} </Link></span> */}
                          <span class="update-on">
                            {NewsDetails?.data?.language === "Hi"
                              ? moment().diff(
                                  moment(NewsDetails?.data?.created_at),
                                  "hours"
                                ) < 24
                                ? moment(NewsDetails?.data?.created_at)
                                    .locale("hi")
                                    .fromNow()
                                : moment(NewsDetails?.data?.created_at)
                                    .locale("hi")
                                    .format("DD MMMM YYYY")
                                    .replace(/[०१२३४५६७८९]/g, function (match) {
                                      return "0123456789"[
                                        "०१२३४५६७८९".indexOf(match)
                                      ];
                                    })
                              : moment().diff(
                                  moment(NewsDetails?.data?.created_at),
                                  "hours"
                                ) < 24
                              ? moment(NewsDetails?.data?.created_at)
                                  .locale("en")
                                  .fromNow()
                              : moment(NewsDetails?.data?.created_at)
                                  .locale("en")
                                  .format("DD MMMM YYYY")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="entry-header entry-header-1">
                      <h4 className="post-title 1hbase mb-20">
                        {NewsDetails?.data?.title}
                      </h4>
                      <p>{shortDetails}</p>
                    </div>
                    <div className="news_post_view">
                      {NewsDetails?.data ? (
                        NewsDetails?.data?.file_type == "videos" ? (
                          <video
                            controls
                            poster={NewsDetails?.data?.thumbnel}
                            autoplay
                            className="photo-item__video NewsDetailsVideos"
                            loop
                            muted
                            preload="auto"
                          >
                            <source src={videoPath} type="video/mp4" />
                          </video>
                        ) : (
                          <img
                            src={NewsDetails?.data?.get_images[0]?.image}
                            alt="post-slider"
                          />
                        )
                      ) : (
                        <figure className="single-thumnail mb-30">
                          <img
                            src={NewsDetails?.data?.thumbnel}
                            alt=""
                            style={{ width: "100%" }}
                          />
                          <div className="credit mt-15 font-small color-grey">
                            <i className="ti-credit-card mr-5"></i>
                          </div>
                        </figure>
                      )}
                    </div>

                    <div className="single-excerpt">
                      <ul className="d-flex justify-content-end">
                        <a href={facebookShareUrl} target="_blank">
                          <li>
                            <FaFacebook />
                          </li>
                        </a>
                        {/* <a href="https://www.instagram.com/"><li><LuInstagram /></li></a> */}
                        <a href={twitterShareUrl}>
                          <li>
                            <FaTwitter />
                          </li>
                        </a>
                        {/* <a href={pinterestShareUrl}><li><FaPinterest /></li></a> */}
                        <a href={linkedinShareUrl}>
                          <li>
                            <FaLinkedinIn />
                          </li>
                        </a>
                      </ul>
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
                            Latest <span>Comments</span>
                          </h5>
                        </div>
                        <div className="post-block-list post-module-6">
                          {NewsDetails?.postComment?.map((Commentresult) => {
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
                                        <Link to="#">
                                          {Commentresult?.get_user?.name}{" "}
                                          {Commentresult?.get_user?.lname}
                                        </Link>
                                      </span>
                                      <span className="post-on">
                                        {Commentresult?.language === "Hi"
                                          ? moment().diff(
                                              moment(Commentresult?.created_at),
                                              "hours"
                                            ) < 24
                                            ? moment(Commentresult?.created_at)
                                                .locale("hi")
                                                .fromNow()
                                            : moment(Commentresult?.created_at)
                                                .locale("hi")
                                                .format("DD MMMM YYYY")
                                                .replace(
                                                  /[०१२३४५६७८९]/g,
                                                  function (match) {
                                                    return "0123456789"[
                                                      "०१२३४५६७८९".indexOf(
                                                        match
                                                      )
                                                    ];
                                                  }
                                                )
                                          : moment().diff(
                                              moment(Commentresult?.created_at),
                                              "hours"
                                            ) < 24
                                          ? moment(Commentresult?.created_at)
                                              .locale("en")
                                              .fromNow()
                                          : moment(Commentresult?.created_at)
                                              .locale("en")
                                              .format("DD MMMM YYYY")}
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
                <div className="row">
                  <div className="col-md-12">
                    <div className="entry-main-content">
                      <hr className="wp-block-separator is-style-wide " />
                      <strong>
                        {" "}
                        {ReactHtmlParser(NewsDetails?.data?.short_decription)}
                      </strong>
                    </div>

                    <div className="entry-main-content">
                      <hr className="wp-block-separator is-style-wide" />
                      {ReactHtmlParser(NewsDetails?.data?.decription)}
                    </div>
                  </div>
                </div>
                <div className="related-posts mt-30">
                  <h5 className="mb-30 border-bottom pb-3">Related Posts</h5>
                  <div className="row">
                    {currentPosts?.map((RelatedPostResult, index) => (
                      <article className="col-lg-3" key={index}>
                        <div className="background-white mb-20">
                          <div className="post-thumb mb-15 img-hover-scale">
                            <Link
                              // to={`/${encodeURIComponent(
                              //   RelatedPostResult?.title
                              // )}/${RelatedPostResult?.id}`}

                              to={`/${RelatedPostResult.get_category.title.toLowerCase()}/${RelatedPostResult?.title
                                ?.replace(/[^a-zA-Z]/g, "-")
                                ?.replace(/-+/g, "-")
                                ?.toLowerCase()}/${RelatedPostResult.id}`}
                            >
                              {RelatedPostResult?.file_type == "image" ? (
                                <div className="color-white">
                                  <img
                                    className="img-fluid"
                                    style={{ width: "100%", height: "200px" }}
                                    src={
                                      RelatedPostResult?.get_images[0]?.image
                                    }
                                    alt=""
                                  />
                                </div>
                              ) : (
                                <div className="color-white">
                                  <img
                                    className="img-fluid"
                                    style={{ width: "100%", height: "200px" }}
                                    src={RelatedPostResult?.thumbnel}
                                    alt=""
                                  />
                                </div>
                              )}
                            </Link>
                          </div>
                          <div className="pl-10 pr-10">
                            <Link
                              // to={`/${encodeURIComponent(
                              //   RelatedPostResult?.title
                              // )}/${RelatedPostResult?.id}`}

                              to={`/${RelatedPostResult.get_category.title.toLowerCase()}/${RelatedPostResult?.title
                                ?.replace(/[^a-zA-Z]/g, "-")
                                ?.replace(/-+/g, "-")
                                ?.toLowerCase()}/${RelatedPostResult.id}`}
                            >
                              <h6 className="post-title textline mb-15">
                                {RelatedPostResult?.title}
                              </h6>
                            </Link>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="pagination-buttons mt-3">
                      <button onClick={handlePrev} disabled={currentPage === 1}>
                        Previous
                      </button>
                      <span>
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </main>
          </>
        )}

        {/* <!-- Footer Start--> */}
        <Footer CategorieList={CategorieList} />
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

export default NewsDetails;


 function Category({CategorieList}){
  return (
 <>
   <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse
                id="navbarScroll"
                className="justify-content-between m-0 ml-30"
              >
                <Nav className="me-auto">
                  {CategorieList?.map((CategorieListResult) => {
                    return (
                      <>
                        <Link
                          to="/"
                          role="tab"
                          // onClick={() => GetWebDashBoardCategory(CategorieListResult?.id)}
                          aria-controls="pills-home"
                          aria-selected="true"
                        >
                        
                          {CategorieListResult?.title}
                        </Link>
                      </>
                    );
                  })}
             
                </Nav>
                {/* <Nav className="d-none d-md-none d-lg-block">
                    <form
                      action="#"
                      method="get"
                      className="search-form d-lg-inline float-right
               position-relative m-xs-0 mr-30"
                      onChange={(e) => GetSearchData(e.target.value)}
                      onSubmit={(e) => {
                        e.preventDefault();
                        GetSearchData(searchKey);
                      }}
                    >
                      <div class="buscar-caja">
                        <input type="text" name="" value={searchKey} onChange={(e) =>
                          setSearchKey(e.target.value)} class="buscar-txt" placeholder="Search ....." />
                        <a class="buscar-btn"> <i class="fa fa-search" onClick={(e) =>
                          GetSearchData(e.target.value)}></i> </a>
                      </div>
                    </form>
                  </Nav> */}
              </Navbar.Collapse>
 </>
  )
}