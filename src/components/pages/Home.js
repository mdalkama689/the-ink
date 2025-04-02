import React, { useEffect, useState, useRef } from "react";
import "../../assets/css/color.css";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";
import "../../assets/css/widgets.css";
import { Link } from "react-router-dom";
import moment from "moment";
import "moment/locale/hi";
import Footer from "../Footer/Footer";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
import { API_BASE_URL } from "../../config/Config";
import Loader from "../loader/Loader";
import SpinnerLoader from "../loader/SpinnerLoader";
import politics from "../../assets/images/politics.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import newsLogo from "../../assets/images/NewsLogo2.png";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { FaFacebook } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";

const Home = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("lang")
  );
  const [CategorieList, setCategorieList] = useState([]);
  const [CategoryTopNews, setCategoryTopNews] = useState([]);
  console.log("CategoryTopNews1231321", CategoryTopNews);
  const [CategoryTopNewsImages, setCategoryTopNewsImages] = useState(
    CategoryTopNews.length && CategoryTopNews
  );
  const [activeCategoryId, setActiveCategoryId] = useState(1);
  const [searchKey, setSearchKey] = useState("");
  const [webDashBoard, setWebDashBoard] = useState({
    posts: [],
    slider: [],
    tranding_post: [],
    category: [],
  });

  const marqueeRef = useRef(null);

  const handleMouseEnter = () => {
    marqueeRef.current.style.animationPlayState = "paused";
  };

  const handleMouseLeave = () => {
    marqueeRef.current.style.animationPlayState = "running";
  };

  //search functionality start
  const GetSearchData = async () => {
    const ApiData = {
      language: localStorage.getItem("lang")
        ? localStorage.getItem("lang")
        : "En",
    };
    await axios
      .get(
        `${API_BASE_URL}/category-topnews?search=${searchKey}&language=${ApiData.language}`
      )
      .then((SearchDataResponse) => {
        setCategoryTopNews(SearchDataResponse?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // This Methods For the GetWebDashBoard
  const GetWebDashBoard = async () => {
    try {
      let ApiData = {
        language: localStorage.getItem("lang")
          ? localStorage.getItem("lang")
          : "En",
      };

      const response = await axios.get(
        `${API_BASE_URL}/web-dashboard?language=${ApiData.language}`
      );

      setWebDashBoard(response?.data?.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log("webDashBoarddfmng", webDashBoard);

  //  Top News Categroy Wise
  const GetTopCategoryNews = async (id) => {
    setIsLoading(true);
    try {
      let ApiData = {
        language: localStorage.getItem("lang")
          ? localStorage.getItem("lang")
          : "En",
      };
      const response = await axios.get(
        `${API_BASE_URL}/category-topnews?category_id=${activeCategoryId}&language=${ApiData.language}`
      );
      setCategoryTopNews(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    } finally {
    }
  };

  // This Methods for the Get category li
  const GetCategorieList = async () => {
    await axios.get(`${API_BASE_URL}/category-list`).then((response) => {
      setCategorieList(response.data.data);
    });
  };

  //<-------------- This UseEffect Call for the Show the data Bydefault-------------->
  useEffect(() => {
    GetCategorieList();
    GetWebDashBoard();
    GetTopCategoryNews();
  }, []);

  // This UseEffect Call for the Show the data GetSearchData
  useEffect(() => {
    if (searchKey) {
      setTimeout(() => {
        GetSearchData();
      }, 1000);
    }
  }, [searchKey]);
  // This UseEffect Call When We Select The Language
  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      GetWebDashBoard();
      GetTopCategoryNews();
    }
  }, [localStorage.getItem("lang")]);

  // <---------------- This Function for the Select the Laguage ------------------>
  const handleLanguageDropdown = (eventKey) => {
    console.log("selected lang", eventKey);
    localStorage.setItem("lang", eventKey);
    setSelectedLanguage(eventKey);
  };

  // This Methods for the ScrollDown And ScrollUp
  const [showTopIcon, setShowTopIcon] = useState(true);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setShowTopIcon(scrollTop > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const toggleCanvas = () => {
    setIsCanvasOpen(!isCanvasOpen);
  };

  // Set the active category to the ID of the first category when the component mounts
  useEffect(() => {
    if (CategorieList && CategorieList.length > 0) {
      const initialCategoryId = CategorieList[0].id;
      setActiveCategoryId(initialCategoryId);
      // Fetch data for the initial active category
      GetTopCategoryNews(initialCategoryId);
    }
  }, [CategorieList]);
  useEffect(() => {
    // Fetch data for the active category when the language changes
    if (activeCategoryId !== null) {
      GetTopCategoryNews(activeCategoryId);
    }
  }, [activeCategoryId]);

  useEffect(() => {
    // Fetch data for the default language when the component loads
    GetTopCategoryNews(activeCategoryId);
  }, [selectedLanguage, activeCategoryId]);

  const HandleActiveTab = (index) => {
    setActiveTab(index);
    // selectSingleNews(webDashBoard);
  };

  // Active Tab
  useEffect(() => {
    // Set the first element as active when the component mounts
    if (CategoryTopNews?.post?.length > 0) {
      setActiveTab(0);
      selectSingleNews(CategoryTopNews.post[0]);
    }
  }, [CategoryTopNews]);
  // selectSingleNews
  const selectSingleNews = (data) => {
    setCategoryTopNewsImages(data);
  };

  const videoRefs = useRef([]);

  // <---------- videos run for the multiple times for the first top categories news ----------->
  useEffect(() => {
    const intervalIds = [];

    CategoryTopNews?.post?.slice(0, 1).forEach((_, index) => {
      const videoRef = videoRefs?.current[index];
      if (videoRef) {
        // Set an interval to restart the video every 2 seconds
        const intervalId = setInterval(() => {
          if (videoRef) {
            videoRef.currentTime = 0; // Reset the video to start
            videoRef.play(); // Start playing the video
          }
        }, 2000); // Restart every 2 seconds (play for 1 second)

        intervalIds.push(intervalId);
      }
    });

    // Cleanup intervals when the component unmounts
    return () => intervalIds.forEach(clearInterval);
  }, [CategoryTopNews]);

  useEffect(() => {
    const intervalIds = [];

    CategoryTopNews?.post?.slice(1, 5).forEach((_, index) => {
      const videoRef = videoRefs?.current[index];
      if (videoRef) {
        // Set an interval to restart the video every 2 seconds
        const intervalId = setInterval(() => {
          if (videoRef) {
            videoRef.currentTime = 0; // Reset the video to start
            videoRef.play(); // Start playing the video
          }
        }, 2000); // Restart every 2 seconds (play for 1 second)

        intervalIds.push(intervalId);
      }
    });

    // Cleanup intervals when the component unmounts
    return () => intervalIds.forEach(clearInterval);
  }, [CategoryTopNews]);

  useEffect(() => {
    const intervalIds = [];

    // Loop through the posts and apply the video reset functionality
    webDashBoard?.category?.get_posts?.slice(0, 1).forEach((_, index) => {
      const videoRef = videoRefs.current[index];
      if (videoRef) {
        // Set an interval to play the video for 1 second and reset it
        const intervalId = setInterval(() => {
          if (videoRef) {
            videoRef.currentTime = 0; // Reset the video to the beginning
            videoRef.play(); // Play the video
            setTimeout(() => {
              videoRef.pause(); // Pause the video after 1 second
            }, 1000); // Pause after 1 second
          }
        }, 2000); // Trigger this every 2 seconds to reset and play for 1 second

        intervalIds.push(intervalId);
      }
    });

    // Cleanup intervals when the component unmounts
    return () => intervalIds.forEach(clearInterval);
  }, [webDashBoard]);

  useEffect(() => {
    const intervalIds = [];

    // Loop through the posts and apply the video reset functionality
    webDashBoard?.category?.get_posts?.slice(1, 5).forEach((_, index) => {
      const videoRef = videoRefs.current[index];
      if (videoRef) {
        // Set an interval to play the video for 1 second and reset it
        const intervalId = setInterval(() => {
          if (videoRef) {
            videoRef.currentTime = 0; // Reset the video to the beginning
            videoRef.play(); // Play the video
            setTimeout(() => {
              videoRef.pause(); // Pause the video after 1 second
            }, 1000); // Pause after 1 second
          }
        }, 2000); // Trigger this every 2 seconds to reset and play for 1 second

        intervalIds.push(intervalId);
      }
    });

    // Cleanup intervals when the component unmounts
    return () => intervalIds.forEach(clearInterval);
  }, [webDashBoard]);

  return (
    <div>
      <div className={`main-wrap ${isCanvasOpen ? "canvas-opened" : ""}`}>
        {isCanvasOpen && (
          <aside
            id="sidebar-wrapper"
            className="custom-scrollbar p-5 offcanvas-sidebar position-right
                ps ps--active-x ps--active-y d-block d-md-none d-lg-none d-xl-none"
          >
            <div className="ps__rail-x">
              <div class="ps__thumb-x"></div>
            </div>
            <div className="ps__rail-y">
              <div className="ps__thumb-y"></div>
            </div>
          </aside>
        )}
        {/* <!-- Main Header --> */}
        {/* <Header /> */}
        <div className="main-wrap">
          <div id="top-head" class="header-top-bar align-items-center">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-7 col-md-8">
                  <ul class="top-head-social m-0">
                    <ul className="d-flex">
                      <a href="https://www.facebook.com/">
                        <li>
                          <FaFacebook />
                        </li>
                      </a>
                      <a href="https://www.instagram.com/">
                        <li>
                          <LuInstagram />
                        </li>
                      </a>
                      <a href="https://www.twitter.com/">
                        <li>
                          <FaTwitter />
                        </li>
                      </a>
                      <a href="https://www.pinterest.com/">
                        <li>
                          <FaPinterest />
                        </li>
                      </a>
                      <a href="https://www.linkedin.com/in/">
                        <li>
                          <FaLinkedinIn />
                        </li>
                      </a>
                    </ul>
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

          {isLoading ? (
            <Loader />
          ) : (
            <Navbar expand="lg" className="nav_custome">
              <Container>
                <Link to="/" className="m-0">
                  <Navbar.Brand>
                    <img src={newsLogo} alt="" />{" "}
                  </Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse
                  id="navbarScroll"
                  className="justify-content-between m-0 ml-30"
                >
                  <Nav className="me-auto">
                    {CategorieList?.map((CategorieListResult) => {
                      return (
                        <>
                          <a
                            href={`#cat_sec_${CategorieListResult?.id}`}
                            role="tab"
                            aria-controls="pills-home"
                            aria-selected="true"
                          >
                            {CategorieListResult?.title}
                          </a>
                        </>
                      );
                    })}
                  </Nav>
                  <Nav className="d-none d-md-none d-lg-block">
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
                        <input
                          type="text"
                          name="search"
                          value={searchKey}
                          onChange={(e) => setSearchKey(e.target.value)}
                          class="buscar-txt"
                          placeholder="Search ....."
                        />
                        <a class="buscar-btn">
                          {" "}
                          <i
                            class="fa fa-search"
                            onClick={(e) => GetSearchData(e.target.value)}
                          ></i>{" "}
                        </a>
                      </div>
                    </form>
                  </Nav>
                </Navbar.Collapse>
              </Container>

              <div className="mobile_viewsearch d-block d-md-none d-lg-none">
                <div className="container">
                  <div className="row">
                    <div className="col-12 p-0">
                      <form
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
                          <input
                            type="text"
                            name=""
                            value={searchKey}
                            onChange={(e) => setSearchKey(e.target.value)}
                            class="buscar-txt"
                            placeholder="Search ....."
                          />
                          <a class="buscar-btn">
                            {" "}
                            <i
                              class="fa fa-search"
                              onClick={(e) => GetSearchData(e.target.value)}
                            ></i>{" "}
                          </a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </Navbar>
          )}
        </div>
        <div></div>

        {/* <!-- Main Wrap Start --> */}
        {isLoading ? (
          <Loader />
        ) : (
          <main className="position-relative">
            <div className="container main-container">
              <div className="home_main_content">
                <div className="category_title mt-md-3 py-1">
                  <div className="d-lg-flex justify-content-between border-bottom border-danger p-0">
                    <div className="d-flex align-items-center">
                      <div className="topstories_title px-4 py-2 bg-danger text-white">
                        Top Stories{" "}
                      </div>
                      <div className="marquee-container">
                        <div
                          className="marquee-content d-flex"
                          ref={marqueeRef}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                        >
                          {CategoryTopNews?.post
                            ?.slice(0, 4)
                            .map((webDashBoardResult, index) => (
                              <Link
                                key={index}
                                // to={`/${encodeURIComponent(
                                //   webDashBoardResult?.title
                                // )}/${webDashBoardResult?.id}`}
                                className="marquee-item"
                                to={`/${webDashBoardResult.get_category.title.toLowerCase()}/${webDashBoardResult.title
                                  .replace(/[^a-zA-Z]/g, "-")
                                  .replace(/-+/g, "-")
                                  .toLowerCase()}/${webDashBoardResult.id}`}
                              >
                                
                                {webDashBoardResult?.title} &nbsp; | &nbsp;
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                    {isLoading ? (
                      <SpinnerLoader />
                    ) : (
                      <div className="table-responsive mobilecustomesc">
                        <ul
                          className="nav nav-pills mt-3 mt-md-0 mt-lg-0"
                          id="pills-tab"
                          role="tablist"
                        >
                          {CategorieList?.map((CategorieListResult) => (
                            <li
                              className="nav-item"
                              key={CategorieListResult?.id}
                            >
                              <div
                                onClick={() => {
                                  setActiveCategoryId(CategorieListResult?.id);
                                  GetTopCategoryNews(CategorieListResult?.id);
                                }}
                              >
                                <a
                                  className={`nav-link ${
                                    activeCategoryId === CategorieListResult?.id
                                      ? "active-category"
                                      : ""
                                  }`}
                                  id="pills-home-tab"
                                  data-toggle="pill"
                                  to="#pills-home"
                                  role="tab"
                                  aria-controls="pills-home"
                                  aria-selected="true"
                                >
                                  {CategorieListResult?.title}
                                </a>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div class="tab-content mt-3" id="pills-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="pills-home"
                      role="tabpanel"
                      aria-labelledby="pills-home-tab"
                    >
                      <div className="row">
                        {isLoading ? (
                          <Loader />
                        ) : (
                          <>
                            <div className="col-12 col-lg-6 col-md-12">
                              {/* <--------- Slider Sections ------------------> */}

                              {CategoryTopNews?.post
                                ?.slice(0, 1)
                                .map((fadeImage, index) => (
                                  <div key={index}>
                                    {fadeImage?.file_type == "image" ? (
                                      <div>
                                        <Link
                                          className="thumb_images mobile_auto_w"
                                          // to={`/${encodeURIComponent(
                                          //   fadeImage?.title
                                          // )}/${fadeImage?.id}`}

                                          to={`/${fadeImage.get_category.title.toLowerCase()}/${fadeImage.title
                                            .replace(/[^a-zA-Z]/g, "-")
                                            .replace(/-+/g, "-")
                                            .toLowerCase()}/${fadeImage.id}`}
                                        >
                                          <img
                                            className="img-fluid w-100"
                                            style={{ height: "370px" }}
                                            src={
                                              fadeImage?.get_images[0]?.image
                                            }
                                            alt=""
                                          />
                                        </Link>
                                      </div>
                                    ) : fadeImage?.file_type == "videos" ? (
                                      <div>
                                        <Link
                                          className="thumb_images mobile_auto_w"
                                          // to={`/${encodeURIComponent(
                                          //   fadeImage?.title
                                          // )}/${fadeImage?.id}`}

                                          to={`/${fadeImage.get_category.title.toLowerCase()}/${fadeImage.title
                                            .replace(/[^a-zA-Z]/g, "-")
                                            .replace(/-+/g, "-")
                                            .toLowerCase()}/${fadeImage.id}`}
                                        >
                                          <video
                                            ref={(el) =>
                                              (videoRefs.current[index] = el)
                                            } // Store the video reference
                                            loop
                                            muted
                                            autoPlay
                                            style={{
                                              width: "100%",
                                              height: "370px",
                                              objectFit: "cover",
                                            }}
                                          >
                                            <source
                                              src={fadeImage?.vedio_file}
                                              type="video/mp4"
                                            />
                                            Your browser does not support the
                                            video tag.
                                          </video>
                                        </Link>
                                      </div>
                                    ) : (
                                      <div>
                                        <Link
                                          className="thumb_images mobile_auto_w"
                                          to={`/${encodeURIComponent(
                                            fadeImage?.title
                                          )}/${fadeImage?.id}`}
                                        >
                                          <img
                                            className="img-fluid w-100"
                                            style={{
                                              height: "370px",
                                              marginTop: "20px",
                                            }}
                                            src={fadeImage?.thumbnel}
                                            alt=""
                                          />
                                        </Link>
                                      </div>
                                    )}
                                    <Link
                                      className="SliderImagesTitle SliderImagesTitle1"
                                      // to={`/${encodeURIComponent(
                                      //   fadeImage?.title
                                      // )}/${fadeImage?.id}`}

                                      to={`/${fadeImage.get_category.title.toLowerCase()}/${fadeImage.title
                                        .replace(/[^a-zA-Z]/g, "-")
                                        .replace(/-+/g, "-")
                                        .toLowerCase()}/${fadeImage.id}`}
                                    >
                                      {fadeImage?.title}
                                    </Link>
                                    <div className="sliderdescription">
                                      <Link
                                        className="SliderImagesTitle p-0"
                                        // to={`/NewsDetails/${fadeImage?.id}`}

                                        to={`/${fadeImage.get_category.title.toLowerCase()}/${fadeImage.title
                                          .replace(/[^a-zA-Z]/g, "-")
                                          .replace(/-+/g, "-")
                                          .toLowerCase()}/${fadeImage.id}`}
                                      >
                                        {ReactHtmlParser(
                                          fadeImage?.short_decription
                                        )}
                                      </Link>
                                    </div>

                                    <span className="post-in">
                                      <span
                                        className="post-on"
                                        style={{ fontWeight: "350" }}
                                      >
                                        {fadeImage?.language === "Hi"
                                          ? moment().diff(
                                              moment(fadeImage?.created_at),
                                              "hours"
                                            ) < 24
                                            ? moment(fadeImage?.created_at)
                                                .locale("hi")
                                                .fromNow()
                                            : moment(fadeImage?.created_at)
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
                                              moment(fadeImage?.created_at),
                                              "hours"
                                            ) < 24
                                          ? moment(fadeImage?.created_at)
                                              .locale("en")
                                              .fromNow()
                                          : moment(fadeImage?.created_at)
                                              .locale("en")
                                              .format("DD MMMM YYYY")}
                                      </span>
                                    </span>
                                  </div>
                                ))}
                            </div>
                            <div className="col-lg-6 col-md-12 sidebar-right">
                              <div className="latest-post newupdates">
                                <div className="row">
                                  {CategoryTopNews?.post
                                    ?.slice(1, 5)
                                    .map((postsResult, index) => {
                                      return (
                                        <div
                                          className="col-md-6 col-sm-6 col-6 px-2"
                                          key={postsResult?.id}
                                        >
                                          <div className="loop-list-style-1d">
                                            <Link
                                              // to={`/${encodeURIComponent(
                                              //   postsResult?.title
                                              // )}/${postsResult?.id}`}

                                              to={`/${postsResult.get_category.title.toLowerCase()}/${postsResult.title
                                                .replace(/[^a-zA-Z]/g, "-")
                                                .replace(/-+/g, "-")
                                                .toLowerCase()}/${
                                                postsResult.id
                                              }`}
                                            >
                                              <article className="background-white politics_right_box mb-20 wow fadeIn animated post_data">
                                                <div className="post_boxes">
                                                  <div
                                                    className="post-thumb img-hover-scale"
                                                    style={{
                                                      width: "100%",
                                                      height: "200px",
                                                      overflow: "hidden",
                                                    }}
                                                  >
                                                    {postsResult?.file_type ==
                                                    "image" ? (
                                                      <Link
                                                        className="color-white"
                                                        // to={`/${encodeURIComponent(
                                                        //   postsResult?.title
                                                        // )}/${postsResult?.id}`}

                                                        to={`/${postsResult.get_category.title.toLowerCase()}/${postsResult.title
                                                          .replace(
                                                            /[^a-zA-Z]/g,
                                                            "-"
                                                          )
                                                          .replace(/-+/g, "-")
                                                          .toLowerCase()}/${
                                                          postsResult.id
                                                        }`}
                                                      >
                                                        <img
                                                          className="img-fluid"
                                                          src={
                                                            postsResult
                                                              ?.get_images[0]
                                                              ?.image
                                                          }
                                                          alt=""
                                                          style={{
                                                            width: "100%",
                                                            height: "200px",
                                                            objectFit: "cover",
                                                          }} // Ensure images are consistent
                                                        />
                                                      </Link>
                                                    ) : postsResult?.file_type ==
                                                      "videos" ? (
                                                      <Link
                                                        className="color-white"
                                                        // to={`/${encodeURIComponent(
                                                        //   postsResult?.title
                                                        // )}/${postsResult?.id}`}

                                                        to={`/${postsResult.get_category.title.toLowerCase()}/${postsResult.title
                                                          .replace(
                                                            /[^a-zA-Z]/g,
                                                            "-"
                                                          )
                                                          .replace(/-+/g, "-")
                                                          .toLowerCase()}/${
                                                          postsResult.id
                                                        }`}
                                                      >
                                                        <video
                                                          ref={(el) =>
                                                            (videoRefs.current[
                                                              index
                                                            ] = el)
                                                          }
                                                          loop
                                                          muted
                                                          autoPlay
                                                          style={{
                                                            width: "100%",
                                                            height: "200px",
                                                            objectFit: "cover",
                                                          }} // Ensure videos are consistent
                                                        >
                                                          <source
                                                            src={
                                                              postsResult?.vedio_file
                                                            }
                                                            type="video/mp4"
                                                          />
                                                          Your browser does not
                                                          support the video tag.
                                                        </video>
                                                      </Link>
                                                    ) : (
                                                      <Link
                                                        className="color-white"
                                                        // to={`/${encodeURIComponent(
                                                        //   postsResult?.title
                                                        // )}/${postsResult?.id}`}

                                                        to={`/${postsResult.get_category.title.toLowerCase()}/${postsResult.title
                                                          .replace(
                                                            /[^a-zA-Z]/g,
                                                            "-"
                                                          )
                                                          .replace(/-+/g, "-")
                                                          .toLowerCase()}/${
                                                          postsResult.id
                                                        }`}
                                                      >
                                                        <img
                                                          className="img-fluid"
                                                          src={
                                                            postsResult?.thumbnel
                                                          }
                                                          alt=""
                                                          style={{
                                                            width: "100%",
                                                            height: "200px",
                                                            objectFit: "cover",
                                                          }} // Ensure thumbnails are consistent
                                                        />
                                                      </Link>
                                                    )}
                                                  </div>
                                                  <div className="post-content media-body">
                                                    <div className="post-title w-100">
                                                      <Link
                                                        // to={`/${encodeURIComponent(
                                                        //   postsResult?.title
                                                        // )}/${postsResult?.id}`}

                                                        to={`/${postsResult.get_category.title.toLowerCase()}/${postsResult.title
                                                          .replace(
                                                            /[^a-zA-Z]/g,
                                                            "-"
                                                          )
                                                          .replace(/-+/g, "-")
                                                          .toLowerCase()}/${
                                                          postsResult.id
                                                        }`}
                                                        className="SliderImagesTitle1"
                                                      >
                                                        {postsResult?.title}
                                                      </Link>
                                                      <div className="mt-1">
                                                        <span className="post-in">
                                                          <span
                                                            className="post-on"
                                                            style={{
                                                              fontWeight: "400",
                                                            }}
                                                          >
                                                            {postsResult?.language ===
                                                            "Hi"
                                                              ? moment().diff(
                                                                  moment(
                                                                    postsResult?.created_at
                                                                  ),
                                                                  "hours"
                                                                ) < 24
                                                                ? moment(
                                                                    postsResult?.created_at
                                                                  )
                                                                    .locale(
                                                                      "hi"
                                                                    )
                                                                    .fromNow()
                                                                : moment(
                                                                    postsResult?.created_at
                                                                  )
                                                                    .locale(
                                                                      "hi"
                                                                    )
                                                                    .format(
                                                                      "DD MMMM YYYY"
                                                                    )
                                                                    .replace(
                                                                      /[०१२३४५६७८९]/g,
                                                                      (match) =>
                                                                        "0123456789"[
                                                                          "०१२३४५६७८९".indexOf(
                                                                            match
                                                                          )
                                                                        ]
                                                                    )
                                                              : moment().diff(
                                                                  moment(
                                                                    postsResult?.created_at
                                                                  ),
                                                                  "hours"
                                                                ) < 24
                                                              ? moment(
                                                                  postsResult?.created_at
                                                                )
                                                                  .locale("en")
                                                                  .fromNow()
                                                              : moment(
                                                                  postsResult?.created_at
                                                                )
                                                                  .locale("en")
                                                                  .format(
                                                                    "DD MMMM YYYY"
                                                                  )}
                                                          </span>
                                                        </span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                              </article>
                                            </Link>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      <div className="border border-3"></div>
                      <div className="row pt-3">
                        {CategoryTopNews?.post
                          ?.slice(5, 9)
                          .map((postsResult) => {
                            return (
                              <>
                                <div className="col-md-3 col-sm-6 col-6">
                                  <div className="loop-list-style-1d">
                                    <Link
                                      // to={`/${encodeURIComponent(
                                      //   postsResult?.title
                                      // )}/${postsResult?.id}`}

                                      to={`/${postsResult.get_category.title.toLowerCase()}/${postsResult.title
                                        .replace(/[^a-zA-Z]/g, "-")
                                        .replace(/-+/g, "-")
                                        .toLowerCase()}/${postsResult.id}`}
                                    >
                                      <article
                                        key={postsResult?.id}
                                        className="background-white politics_right_box mb-20 wow
                                           fadeIn animated post_data"
                                      >
                                        <div className="post_boxes">
                                          <div className="post-content media-body">
                                            <div className="post-title w-100">
                                              <Link
                                                // to={`/${encodeURIComponent(
                                                //   postsResult?.title
                                                // )}/${postsResult?.id}`}

                                                to={`/${postsResult.get_category.title.toLowerCase()}/${postsResult.title
                                                  .replace(/[^a-zA-Z]/g, "-")
                                                  .replace(/-+/g, "-")
                                                  .toLowerCase()}/${
                                                  postsResult.id
                                                }`}
                                                className="SliderImagesTitle2"
                                              >
                                                {postsResult?.title}
                                              </Link>

                                              <div class="mt-1">
                                                <span class="post-in">
                                                  {" "}
                                                  <span
                                                    className="post-on"
                                                    style={{
                                                      fontWeight: "500",
                                                      fontSize: "15px",
                                                    }}
                                                  >
                                                    {postsResult?.language ===
                                                    "Hi"
                                                      ? moment().diff(
                                                          moment(
                                                            postsResult?.created_at
                                                          ),
                                                          "hours"
                                                        ) < 24
                                                        ? moment(
                                                            postsResult?.created_at
                                                          )
                                                            .locale("hi")
                                                            .fromNow()
                                                        : moment(
                                                            postsResult?.created_at
                                                          )
                                                            .locale("hi")
                                                            .format(
                                                              "DD MMMM YYYY"
                                                            )
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
                                                          moment(
                                                            postsResult?.created_at
                                                          ),
                                                          "hours"
                                                        ) < 24
                                                      ? moment(
                                                          postsResult?.created_at
                                                        )
                                                          .locale("en")
                                                          .fromNow()
                                                      : moment(
                                                          postsResult?.created_at
                                                        )
                                                          .locale("en")
                                                          .format(
                                                            "DD MMMM YYYY"
                                                          )}
                                                  </span>
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </article>
                                    </Link>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="pills-profile"
                      role="tabpanel"
                      aria-labelledby="pills-profile-tab"
                    >
                      <div className="row">
                        <div className="col-12 col-lg-4 col-md-4">
                          <div className="post-aside-topstory">
                            <article className="bg-white wow fadeIn animated position-relative">
                              <div className="post__banner post-thumb img-hover-scale ">
                                <Link to={`/NewsDetails}`}>
                                  <img
                                    className="img-fluid w-100"
                                    src={politics}
                                    alt="post"
                                  />
                                </Link>
                              </div>
                              <div className="mini_post position_bottom">
                                <div className="entry-meta meta-1 color-grey float-left mb-15 w-100 text-white">
                                  <div class="entry-meta meta-0 font-small mb-30">
                                    <a to="#" tabindex="0">
                                      <span class="post-cat bg-danger font-small color-white">
                                        Politics
                                      </span>
                                    </a>
                                  </div>
                                  <span className="post-by">
                                    <i class="ti-user"></i>{" "}
                                    <Link to="#">Admin</Link>
                                  </span>
                                  <span className="post-in">
                                    <i
                                      class="ti-alarm-clock"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    September 20, 2018
                                  </span>
                                </div>
                                <h5 className="post-title mt-15 text-white">
                                  <Link to={`/NewsDetails}`}>
                                    Magical fish basically has the power to
                                    conjure its
                                  </Link>
                                </h5>
                              </div>
                            </article>
                          </div>
                        </div>
                        <div className="col-12 col-lg-8 col-md-8 pl-md-0 sidebar-right">
                          <div className="latest-post">
                            {isLoading ? (
                              <Loader />
                            ) : (
                              <div className="loop-list-style-1d">
                                {/* {webDashBoard?.posts?.slice(0, 3).map((result) => {
                                    return (
                                      <>
                                        <Link to={`/${encodeURIComponent(result?.title)}/${result?.id}`}>
                                          <article
                                            key={result?.id}
                                            className="background-white politics_right_box mb-25 wow fadeIn animated post_data">
                                            <div className="post_boxes">
                                              <div className="post-thumb img-hover-scale">
                                                {result?.file_type == "image" ? (
                                                  <Link
                                                    className="color-white" to={`/${encodeURIComponent(result?.title)}/${result?.id}`}
                                                  >
                                                    <img
                                                      className="img-fluid"
                                                      src={result?.get_images[0]?.image}
                                                      alt=""
                                                    />
                                                  </Link>
                                                ) : (
                                                  <Link
                                                    className="color-white" to={`/${encodeURIComponent(result?.title)}/${result?.id}`}
                                                  >
                                                    <img
                                                      className="img-fluid"
                                                      src={result?.thumbnel}
                                                      alt=""
                                                    />
                                                  </Link>
                                                )}
                                              </div>
                                              <div className="post-content media-body">
                                                <div class="entry-meta">
                                                  <div class="entry-meta meta-0 font-small mb-20">
                                                    <a to="#" tabindex="0">
                                                      <span class="post-cat bg-success font-small 
                                                      color-white">Life Style</span></a>
                                                  </div>
                                                  <span class="post-in"><i class="ti-alarm-clock"
                                                    aria-hidden="true"></i> September 20, 2018</span></div>
                                                <div className="post-title w-100">

                                                  <Link to={`/${encodeURIComponent(result?.title)}/${result?.id}`}>
                                                    {result?.title}
                                                  </Link>
                                                </div>

                                              </div>
                                            </div>
                                          </article>
                                        </Link>
                                      </>
                                    );
                                  })} */}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12 p-md-0 sidebar-right">
                          <div className="latest-post">
                            {isLoading ? (
                              <Loader />
                            ) : (
                              <div className="loop-list-style-1d">
                                {/* {webDashBoard?.posts?.slice(0, 3).map((result) => {
                                    return (
                                      <>
                                        <Link to={`/${encodeURIComponent(result?.title)}/${result?.id}`}>
                                          <article
                                            key={result?.id}
                                            className="background-white politics_right_box mb-25 wow fadeIn animated post_data">
                                            <div className="post_boxes">
                                              <div className="post-thumb img-hover-scale">
                                                {result?.file_type == "image" ? (
                                                  <Link
                                                    className="color-white" to={`/${encodeURIComponent(result?.title)}/${result?.id}`}
                                                  >
                                                    <img
                                                      className="img-fluid"
                                                      src={result?.get_images[0]?.image}
                                                      alt=""
                                                    />
                                                  </Link>
                                                ) : (
                                                  <Link
                                                    className="color-white" to={`/${encodeURIComponent(result?.title)}/${result?.id}`}
                                                  >
                                                    <img
                                                      className="img-fluid"
                                                      src={result?.thumbnel}
                                                      alt=""
                                                    />
                                                  </Link>
                                                )}
                                              </div>
                                              <div className="post-content media-body">
                                                <div class="entry-meta">
                                                  <div class="entry-meta meta-0 font-small mb-20">
                                                    <Link to="#" tabindex="0">
                                                      <span class="post-cat bg-success
                                                     font-small color-white">Life Style</span></Link>
                                                  </div>
                                                  <span class="post-in"><i class="ti-alarm-clock" aria-hidden="true"></i> September 20, 2018</span></div>
                                                <div className="post-title w-100">

                                                  <Link to={`/${encodeURIComponent(result?.title)}/${result?.id}`}>
                                                    {result?.title}
                                                  </Link>
                                                </div>

                                              </div>
                                            </div>
                                          </article>
                                        </Link>
                                      </>
                                    );
                                  })} */}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="pills-contact"
                      role="tabpanel"
                      aria-labelledby="pills-contact-tab"
                    >
                      <div className="row">
                        <div className="col-12 col-lg-4 col-md-4">
                          <div className="post-aside-topstory">
                            <article className="bg-white wow fadeIn animated position-relative">
                              <div className="post__banner post-thumb img-hover-scale ">
                                <Link to={`/NewsDetails}`}>
                                  <img
                                    className="img-fluid w-100"
                                    src={politics}
                                    alt="post"
                                  />
                                </Link>
                              </div>
                              <div className="mini_post position_bottom">
                                <div className="entry-meta meta-1 color-grey float-left mb-15 w-100 text-white">
                                  <div class="entry-meta meta-0 font-small mb-30">
                                    <Link to="#" tabindex="0">
                                      <span class="post-cat bg-danger font-small color-white">
                                        Politics
                                      </span>
                                    </Link>
                                  </div>
                                  <span className="post-in">
                                    <i
                                      class="ti-alarm-clock"
                                      aria-hidden="true"
                                    ></i>{" "}
                                    September 20, 2018
                                  </span>
                                </div>
                                <h5 className="post-title mt-15 text-white">
                                  <Link to={`/NewsDetails}`}>
                                    Magical fish basically has the power to
                                    conjure its
                                  </Link>
                                </h5>
                              </div>
                            </article>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12 pl-md-0 sidebar-right">
                          <div className="latest-post">
                            <div className="loop-list-style-1d">
                              {/* {webDashBoard?.posts?.slice(0, 3).map((result) => {
                                return (
                                  <>
                                    <Link to={`/${encodeURIComponent(result?.title)}/${result?.id}`}>
                                      <article
                                        key={result?.id}
                                        className="background-white politics_right_box mb-25 wow fadeIn animated post_data">
                                        <div className="post_boxes">
                                          <div className="post-thumb img-hover-scale">
                                            {result?.file_type == "image" ? (
                                              <Link
                                                className="color-white" to={`/${encodeURIComponent(result?.title)}/${result?.id}`}
                                              >
                                                <img
                                                  className="img-fluid"
                                                  src={result?.get_images[0]?.image}
                                                  alt=""
                                                />
                                              </Link>
                                            ) : (
                                              <Link
                                                className="color-white" to={`/${encodeURIComponent(result?.title)}/${result?.id}`}
                                              >
                                                <img
                                                  className="img-fluid"
                                                  src={result?.thumbnel}
                                                  alt=""
                                                />
                                              </Link>
                                            )}
                                          </div>
                                          <div className="post-content media-body">
                                            <div class="entry-meta">
                                              <div class="entry-meta meta-0 font-small mb-20">
                                                <Link to="#" tabindex="0">
                                                  <span
                                                    class="post-cat bg-success font-small
                                                   color-white">Life Style</span></Link>
                                              </div>
                                              <span class="post-in"><i class="ti-alarm-clock" aria-hidden="true"></i> September 20, 2018</span></div>
                                            <div className="post-title w-100">

                                              <Link to={`/${encodeURIComponent(result?.title)}/${result?.id}`}>
                                                {result?.title}
                                              </Link>
                                            </div>

                                          </div>
                                        </div>
                                      </article>
                                    </Link>
                                  </>
                                );
                              })} */}
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-12 p-md-0 sidebar-right">
                          <div className="latest-post">
                            <div className="loop-list-style-1d">
                              {/* {webDashBoard?.posts?.slice(0, 3).map((result) => {
                                return (
                                  <>
                                    <Link to={`/${encodeURIComponent(result?.title)}/${result?.id}`}>
                                      <article
                                        key={result?.id}
                                        className="background-white politics_right_box mb-25 wow fadeIn animated post_data">
                                        <div className="post_boxes">
                                          <div className="post-thumb img-hover-scale">
                                            {result?.file_type == "image" ? (
                                              <Link
                                                className="color-white" to={`/${encodeURIComponent(result?.title)}/${result?.id}`}
                                              >
                                                <img
                                                  className="img-fluid"
                                                  src={result?.get_images[0]?.image}
                                                  alt=""
                                                />
                                              </Link>
                                            ) : (
                                              <Link
                                                className="color-white" to={`/${encodeURIComponent(result?.title)}/${result?.id}`}
                                              >
                                                <img
                                                  className="img-fluid"
                                                  src={result?.thumbnel}
                                                  alt=""
                                                />
                                              </Link>
                                            )}
                                          </div>
                                          <div className="post-content media-body">
                                            <div class="entry-meta">
                                              <div class="entry-meta meta-0 font-small mb-20">
                                                <Link to="#" tabindex="0">
                                                  <span class="post-cat bg-success 
                                                  font-small color-white">Life Style</span></Link>
                                              </div>
                                              <span class="post-in"><i class="ti-alarm-clock" aria-hidden="true"></i> September 20, 2018</span></div>
                                            <div className="post-title w-100">

                                              <Link to={`/${encodeURIComponent(result?.title)}/${result?.id}`}>
                                                {result?.title}
                                              </Link>
                                            </div>

                                          </div>
                                        </div>
                                      </article>
                                    </Link>
                                  </>
                                );
                              })} */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="category_title bg-white py-3">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 col-lg-12">
                    <div className="d-flex justify-content-between pb-2 p-0 w-100">
                      <div className="topstories_title px-4 py-2 bg-primary text-white">
                        Trending News{" "}
                      </div>
                    </div>
                    <div className="border border-3"></div>
                    <div class="tab-content mt-3" id="pills-tabContent">
                      <div
                        class="tab-pane fade show active"
                        id="pills-home"
                        role="tabpanel"
                        aria-labelledby="pills-home-tab"
                      >
                        <div className="morenews sidebar-right">
                          <div className="latest-post">
                            <div className="loop-list-style-1d row">
                              {webDashBoard?.tranding_post?.map(
                                (tranding_post) => (
                                  <div
                                    className="col-md-3 col-lg-3 col-sm-6"
                                    key={tranding_post?.id}
                                  >
                                    <Link
                                      // to={`/${encodeURIComponent(
                                      //   tranding_post?.title
                                      // )}/${tranding_post?.id}`}

                                      to={`${tranding_post.get_category.title.toLowerCase()}/${tranding_post.title
                                        .replace(/[^a-zA-Z]/g, "-")
                                        .replace(/-+/g, "-")
                                        .toLowerCase()}/${tranding_post.id}`}
                                    >
                                      <article className="background-white politics_right_box wow fadeIn animated post_data">
                                        <div className="post_boxes">
                                          <div className="post-content media-body p-0">
                                            <div class="entry-meta">
                                              <div className="Trending_Post_Details">
                                                <div className="post-title  w-100 SliderImagesTitle2">
                                                  <Link
                                                    // to={`/${encodeURIComponent(
                                                    //   tranding_post?.title
                                                    // )}/${tranding_post?.id}`}

                                                    to={`${tranding_post.get_category.title.toLowerCase()}/${tranding_post.title
                                                      .replace(
                                                        /[^a-zA-Z]/g,
                                                        "-"
                                                      )
                                                      .replace(/-+/g, "-")
                                                      .toLowerCase()}/${
                                                      tranding_post.id
                                                    }`}
                                                  >
                                                    {tranding_post?.title}
                                                  </Link>
                                                </div>

                                                <div className="mt-1">
                                                  <span class="post-in mt-2">
                                                    <span
                                                      className="post-on"
                                                      style={{
                                                        fontWeight: "500",
                                                      }}
                                                    >
                                                      {tranding_post?.language ===
                                                      "Hi"
                                                        ? moment().diff(
                                                            moment(
                                                              tranding_post?.created_at
                                                            ),
                                                            "hours"
                                                          ) < 24
                                                          ? moment(
                                                              tranding_post?.created_at
                                                            )
                                                              .locale("hi")
                                                              .fromNow()
                                                          : moment(
                                                              tranding_post?.created_at
                                                            )
                                                              .locale("hi")
                                                              .format(
                                                                "DD MMMM YYYY"
                                                              )
                                                              .replace(
                                                                /[०१२३४५६७८९]/g,
                                                                function (
                                                                  match
                                                                ) {
                                                                  return "0123456789"[
                                                                    "०१२३४५६७८९".indexOf(
                                                                      match
                                                                    )
                                                                  ];
                                                                }
                                                              )
                                                        : moment().diff(
                                                            moment(
                                                              tranding_post?.created_at
                                                            ),
                                                            "hours"
                                                          ) < 24
                                                        ? moment(
                                                            tranding_post?.created_at
                                                          )
                                                            .locale("en")
                                                            .fromNow()
                                                        : moment(
                                                            tranding_post?.created_at
                                                          )
                                                            .locale("en")
                                                            .format(
                                                              "DD MMMM YYYY"
                                                            )}
                                                    </span>
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </article>
                                    </Link>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="pills-profile"
                        role="tabpanel"
                        aria-labelledby="pills-profile-tab"
                      >
                        <div className="morenews sidebar-right">
                          <div className="latest-post">
                            <div className="loop-list-style-1d">
                              {webDashBoard?.posts
                                ?.slice(0, 5)
                                .map((result) => {
                                  return (
                                    <>
                                      <Link
                                        to={`/${encodeURIComponent(
                                          result?.title
                                        )}/${result?.id}`}
                                      >
                                        <article
                                          key={result?.id}
                                          className="background-white politics_right_box mb-25 wow fadeIn animated post_data"
                                        >
                                          <div className="post_boxes">
                                            <div className="post-thumb img-hover-scale">
                                              {result?.file_type == "image" ? (
                                                <Link
                                                  className="color-white"
                                                  to={`/${encodeURIComponent(
                                                    result?.title
                                                  )}/${result?.id}`}
                                                >
                                                  <img
                                                    className="img-fluid"
                                                    src={
                                                      result?.get_images[0]
                                                        ?.image
                                                    }
                                                    alt=""
                                                  />
                                                </Link>
                                              ) : (
                                                <Link
                                                  className="color-white"
                                                  to={`/${encodeURIComponent(
                                                    result?.title
                                                  )}/${result?.id}`}
                                                >
                                                  <img
                                                    className="img-fluid"
                                                    src={result?.thumbnel}
                                                    alt=""
                                                  />
                                                </Link>
                                              )}
                                            </div>
                                            <div className="post-content media-body">
                                              <div className="post-title w-100">
                                                <Link
                                                  to={`/${encodeURIComponent(
                                                    result?.title
                                                  )}/${result?.id}`}
                                                >
                                                  {result?.title}
                                                </Link>
                                              </div>
                                              <p
                                                className="mb-0 mt-2"
                                                dangerouslySetInnerHTML={{
                                                  __html:
                                                    result?.short_decription,
                                                }}
                                              ></p>
                                              <div class="entry-meta">
                                                <span
                                                  class="post-in"
                                                  style={{ fontWeight: "500" }}
                                                >
                                                  {result?.language === "Hi"
                                                    ? moment().diff(
                                                        moment(
                                                          result?.created_at
                                                        ),
                                                        "hours"
                                                      ) < 24
                                                      ? moment(
                                                          result?.created_at
                                                        )
                                                          .locale("hi")
                                                          .fromNow()
                                                      : moment(
                                                          result?.created_at
                                                        )
                                                          .locale("hi")
                                                          .format(
                                                            "DD MMMM YYYY"
                                                          )
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
                                                        moment(
                                                          result?.created_at
                                                        ),
                                                        "hours"
                                                      ) < 24
                                                    ? moment(result?.created_at)
                                                        .locale("en")
                                                        .fromNow()
                                                    : moment(result?.created_at)
                                                        .locale("en")
                                                        .format("DD MMMM YYYY")}
                                                </span>
                                              </div>
                                            </div>
                                          </div>
                                        </article>
                                      </Link>
                                    </>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        class="tab-pane fade"
                        id="pills-contact"
                        role="tabpanel"
                        aria-labelledby="pills-contact-tab"
                      >
                        <div className="morenews sidebar-right">
                          <div className="latest-post">
                            <div className="loop-list-style-1d">
                              {webDashBoard?.posts
                                ?.slice(0, 5)
                                .map((result) => {
                                  return (
                                    <>
                                      <Link
                                        to={`/${encodeURIComponent(
                                          result?.title
                                        )}/${result?.id}`}
                                      >
                                        <article
                                          key={result?.id}
                                          className="background-white politics_right_box mb-25 wow fadeIn animated post_data"
                                        >
                                          <div className="post_boxes">
                                            <div className="post-thumb img-hover-scale">
                                              {result?.file_type == "image" ? (
                                                <Link
                                                  className="color-white"
                                                  to={`/${encodeURIComponent(
                                                    result?.title
                                                  )}/${result?.id}`}
                                                >
                                                  <img
                                                    className="img-fluid"
                                                    src={
                                                      result?.get_images[0]
                                                        ?.image
                                                    }
                                                    alt=""
                                                  />
                                                </Link>
                                              ) : (
                                                <Link
                                                  className="color-white"
                                                  to={`/${encodeURIComponent(
                                                    result?.title
                                                  )}/${result?.id}`}
                                                >
                                                  <img
                                                    className="img-fluid"
                                                    src={result?.thumbnel}
                                                    alt=""
                                                  />
                                                </Link>
                                              )}
                                            </div>
                                            <div className="post-content media-body">
                                              <div class="entry-meta">
                                                <div class="entry-meta meta-0 font-small mb-20">
                                                  <a to="#" tabindex="0">
                                                    <span class="post-cat bg-success font-small color-white">
                                                      Life Style
                                                    </span>
                                                  </a>
                                                </div>
                                                {/* <span class="post-in"><i class="ti-user" aria-hidden="true"></i> Admin</span> */}
                                                <span class="post-in">
                                                  <i
                                                    class="ti-alarm-clock"
                                                    aria-hidden="true"
                                                  ></i>{" "}
                                                  September 20, 2018
                                                </span>
                                              </div>
                                              <div className="post-title w-100">
                                                <Link
                                                  to={`/${encodeURIComponent(
                                                    result?.title
                                                  )}/${result?.id}`}
                                                >
                                                  {result?.title}
                                                </Link>
                                              </div>
                                              <p className="mb-0 mt-2">
                                                Nmply dummy text of the printing
                                                and typesetting industry. Lorem
                                                Ipsum has been the industry’s
                                              </p>
                                            </div>
                                          </div>
                                        </article>
                                      </Link>
                                    </>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-12 col-lg-4">
                    <div className="border-bottom pb-2 mb-3 p-0 w-100">
                      <div className="topstories_title px-4 py-2 bg-dark text-white">Latest Reviews</div>
                    </div>
                    <div className="sidebar-right">
                      <div className="latest-post">
                        <div className="loop-list-style-1d">
                          {webDashBoard?.posts?.slice(0, 6).map((result) => {
                            return (
                              <>
                                <Link to={`/NewsDetails/${result?.id}`}>
                                  <article
                                    key={result?.id}
                                    className="background-white politics_right_box mb-25 wow fadeIn animated post_data">
                                    <div className="post_boxes">
                                      <div className="post-thumb img-hover-scale">
                                        {result?.file_type == "image" ? (
                                          <Link
                                            className="color-white"
                                            to={`/NewsDetails/${result?.id}`}
                                          >
                                            <img
                                              className="img-fluid"
                                              src={result?.get_images[0]?.image}
                                              alt=""
                                            />
                                          </Link>
                                        ) : (
                                          <Link
                                            className="color-white"
                                            to={`/NewsDetails/${result?.id}`}
                                          >
                                            <img
                                              className="img-fluid"
                                              src={result?.thumbnel}
                                              alt=""
                                            />
                                          </Link>
                                        )}
                                      </div>
                                      <div className="post-content media-body">
                                        <div class="entry-meta">
                                          <span class="post-in"><i class="ti-alarm-clock" aria-hidden="true"></i> September 20, 2018</span>
                                        </div>
                                        <div className="post-title w-100">
                                          <Link to={`/NewsDetails/${result?.id}`}>
                                            {result?.title}
                                          </Link>
                                        </div>

                                      </div>
                                    </div>
                                  </article>
                                </Link>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Category list */}
            <div className="international_sec pb-5">
              <div className="container">
                {webDashBoard?.category?.map((categoryResult) => {
                  return (
                    <>
                      {categoryResult?.get_posts?.length > 0 ? (
                        <div
                          className="row mb-4"
                          id={`cat_sec_${categoryResult?.id}`}
                        >
                          <div className="col-12">
                            <div class="mb-2 pb-2 p-0">
                              <div class="topstories_title px-4 py-2 bg-success text-white">
                                {categoryResult?.title}{" "}
                              </div>
                            </div>
                            <div className="border border-3 mb-3"></div>
                          </div>
                          <div className="col-12 col-lg-6 col-md-12">
                            <div className="post-aside-topstory international_post">
                              {categoryResult?.get_posts
                                ?.slice(0, 1)
                                .map((GetPostsIndexResult, index) => (
                                  <div key={index}>
                                    
                                    <Link
                                      // to={`/${encodeURIComponent(
                                      //   GetPostsIndexResult?.title
                                      // )}/${GetPostsIndexResult?.id}`}

                                      to={`/${GetPostsIndexResult.type.toLowerCase()}/${GetPostsIndexResult.title
                                        .replace(/[^a-zA-Z]/g, "-")
                                        .replace(/-+/g, "-")
                                        .toLowerCase()}/${
                                        GetPostsIndexResult.id
                                      }`}
                                    >
                                      <article className="bg-white wow fadeIn animated position-relative">
                                        <div className="post__banner post-thumb img-hover-scale ">
                                          {GetPostsIndexResult?.file_type ==
                                          "image" ? (
                                            <Link
                                              className="color-white"
                                              // to={`/${encodeURIComponent(
                                              //   GetPostsIndexResult?.title
                                              // )}/${GetPostsIndexResult?.id}`}

                                              to={`/${GetPostsIndexResult.type.toLowerCase()}/${GetPostsIndexResult.title
                                                .replace(/[^a-zA-Z]/g, "-")
                                                .replace(/-+/g, "-")
                                                .toLowerCase()}/${
                                                GetPostsIndexResult.id
                                              }`}
                                            >
                                              <img
                                                className="img-fluid w-100"
                                                src={
                                                  GetPostsIndexResult
                                                    ?.get_images[0]?.image
                                                }
                                                alt=""
                                              />
                                            </Link>
                                          ) : GetPostsIndexResult?.file_type ==
                                            "videos" ? (
                                            <Link
                                              className="color-white"
                                              // to={`/${encodeURIComponent(
                                              //   GetPostsIndexResult?.title
                                              // )}/${GetPostsIndexResult?.id}`}

                                              to={`/${GetPostsIndexResult.type.toLowerCase()}/${GetPostsIndexResult.title
                                                .replace(/[^a-zA-Z]/g, "-")
                                                .replace(/-+/g, "-")
                                                .toLowerCase()}/${
                                                GetPostsIndexResult.id
                                              }`}
                                            >
                                              <video
                                                className="img-fluid w-100"
                                                ref={(el) =>
                                                  (videoRefs.current[index] =
                                                    el)
                                                } // Store the video reference
                                                loop
                                                muted
                                                // style={{ width: "100%", height: "370px", objectFit: "cover" }}
                                              >
                                                <source
                                                  src={
                                                    GetPostsIndexResult?.vedio_file
                                                  }
                                                  type="video/mp4"
                                                />
                                                Your browser does not support
                                                the video tag.
                                              </video>
                                            </Link>
                                          ) : (
                                            <Link
                                              className="color-white w-100"
                                              // to={`/${encodeURIComponent(
                                              //   GetPostsIndexResult?.title
                                              // )}/${GetPostsIndexResult?.id}`}

                                              to={`/${GetPostsIndexResult.type.toLowerCase()}/${GetPostsIndexResult.title
                                                .replace(/[^a-zA-Z]/g, "-")
                                                .replace(/-+/g, "-")
                                                .toLowerCase()}/${
                                                GetPostsIndexResult.id
                                              }`}
                                            >
                                              <img
                                                className="img-fluid w-100"
                                                src={
                                                  GetPostsIndexResult?.thumbnel
                                                }
                                                alt=""
                                              />
                                            </Link>
                                          )}
                                        </div>
                                        <div className="mini_post position_bottom">
                                          <h2 className="Category_post-title post-title mt-15 SliderImagesTitle1">
                                            <Link
                                              // to={`/${encodeURIComponent(
                                              //   GetPostsIndexResult?.title
                                              // )}/${GetPostsIndexResult?.id}`}

                                              to={`/${GetPostsIndexResult.type.toLowerCase()}/${GetPostsIndexResult.title
                                                .replace(/[^a-zA-Z]/g, "-")
                                                .replace(/-+/g, "-")
                                                .toLowerCase()}/${
                                                GetPostsIndexResult.id
                                              }`}
                                            >
                                              {GetPostsIndexResult?.title}
                                            </Link>
                                          </h2>
                                          <Link
                                            className="description_title SliderImagesTitle2"
                                            // to={`/${encodeURIComponent(
                                            //   GetPostsIndexResult?.title
                                            // )}/${GetPostsIndexResult?.id}`}

                                            to={`/${GetPostsIndexResult.type.toLowerCase()}/${GetPostsIndexResult.title
                                              .replace(/[^a-zA-Z]/g, "-")
                                              .replace(/-+/g, "-")
                                              .toLowerCase()}/${
                                              GetPostsIndexResult.id
                                            }`}
                                          >
                                            {ReactHtmlParser(
                                              GetPostsIndexResult?.short_decription
                                            )}
                                          </Link>
                                          <div className="entry-meta meta-1 color-grey float-left mb-10 w-100 text-white">
                                            <span className="post-in">
                                              {GetPostsIndexResult?.language ===
                                              "Hi"
                                                ? moment().diff(
                                                    moment(
                                                      GetPostsIndexResult?.created_at
                                                    ),
                                                    "hours"
                                                  ) < 24
                                                  ? moment(
                                                      GetPostsIndexResult?.created_at
                                                    )
                                                      .locale("hi")
                                                      .fromNow()
                                                  : moment(
                                                      GetPostsIndexResult?.created_at
                                                    )
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
                                                    moment(
                                                      GetPostsIndexResult?.created_at
                                                    ),
                                                    "hours"
                                                  ) < 24
                                                ? moment(
                                                    GetPostsIndexResult?.created_at
                                                  )
                                                    .locale("en")
                                                    .fromNow()
                                                : moment(
                                                    GetPostsIndexResult?.created_at
                                                  )
                                                    .locale("en")
                                                    .format("DD MMMM YYYY")}
                                            </span>
                                          </div>
                                        </div>
                                      </article>
                                    </Link>
                                  </div>
                                ))}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-12 sidebar-right">
                            <div className="latest-post">
                              <div className="loop-list-style-1d">
                                <div className="row">
                                  {/* {categoryResult?.get_posts?.slice(1, 5).map((GetPostsResult) => {
                                      return (
                                        <>

                                          <div className="col-6 col-md-6 col-sm-6">
                                            <Link to={`/${encodeURIComponent(GetPostsResult?.title)}/${GetPostsResult?.id}`}>
                                              <article
                                                key={GetPostsResult?.id}
                                                className="background-white politics_right_box mb-25 wow fadeIn animated post_data">
                                                <div className="post_boxes">
                                                  <div className="post-thumb img-hover-scale">
                                                    {GetPostsResult?.file_type == "image" ? (
                                                      <Link
                                                        className="color-white" to={`/${encodeURIComponent(GetPostsResult?.title)}/${GetPostsResult?.id}`}
                                                      >
                                                        <img
                                                          className="img-fluid w-100"
                                                          src={GetPostsResult?.get_images[0]?.image}
                                                          alt=""
                                                        />
                                                      </Link>
                                                    ) : (
                                                      <Link
                                                        className="color-white w-100" to={`/${encodeURIComponent(GetPostsResult?.title)}/${GetPostsResult?.id}`}
                                                      >
                                                        <img
                                                          className="img-fluid w-100"
                                                          src={GetPostsResult?.thumbnel}
                                                          alt=""
                                                        />
                                                      </Link>
                                                    )}

                                                  </div>
                                                  <div className="post-content media-body">

                                                    <div className="post-title w-100 SliderImagesTitle1">

                                                      <Link to={`/${encodeURIComponent(GetPostsResult?.title)}/${GetPostsResult?.id}`}>
                                                        {GetPostsResult?.title}
                                                      </Link>
                                                    </div>
                                                    <div class="entry-meta">
                                                      <span class="post-in">
                                                        {
                                                          GetPostsResult?.language === "Hi" ? (
                                                            moment().diff(moment(GetPostsResult?.created_at), 'hours') < 24
                                                              ? moment(GetPostsResult?.created_at).locale('hi').fromNow()
                                                              : moment(GetPostsResult?.created_at)
                                                                .locale('hi')
                                                                .format("DD MMMM YYYY")
                                                                .replace(/[०१२३४५६७८९]/g, function (match) {
                                                                  return "0123456789"["०१२३४५६७८९".indexOf(match)];
                                                                })
                                                          ) : (
                                                            moment().diff(moment(GetPostsResult?.created_at), 'hours') < 24
                                                              ? moment(GetPostsResult?.created_at).locale('en').fromNow()
                                                              : moment(GetPostsResult?.created_at).locale('en').format("DD MMMM YYYY")
                                                          )
                                                        }


                                                      </span>
                                                    </div>
                                                  </div>
                                                </div>
                                              </article>
                                            </Link>
                                          </div>

                                        </>
                                      );
                                    })} */}
                                  {categoryResult?.get_posts
                                    ?.slice(1, 5)
                                    .map((GetPostsResult, index) => (
                                      <div
                                        className="col-6 col-md-6 col-sm-6"
                                        key={GetPostsResult?.id}
                                      >
                                        <Link
                                          // to={`/${encodeURIComponent(
                                          //   GetPostsResult?.title
                                          // )}/${GetPostsResult?.id}`}

                                          to={`/${GetPostsResult.type.toLowerCase()}/${GetPostsResult.title
                                            .replace(/[^a-zA-Z]/g, "-")
                                            .replace(/-+/g, "-")
                                            .toLowerCase()}/${
                                            GetPostsResult.id
                                          }`}
                                        >
                                          <article className="background-white politics_right_box mb-25 wow fadeIn animated post_data">
                                            <div className="post_boxes">
                                              <div className="post-thumb img-hover-scale">
                                                {GetPostsResult?.file_type ==
                                                "image" ? (
                                                  <Link
                                                    className="color-white"
                                                    // to={`/${encodeURIComponent(
                                                    //   GetPostsResult?.title
                                                    // )}/${GetPostsResult?.id}`}

                                                    to={`/${GetPostsResult.type.toLowerCase()}/${GetPostsResult.title
                                                      .replace(
                                                        /[^a-zA-Z]/g,
                                                        "-"
                                                      )
                                                      .replace(/-+/g, "-")
                                                      .toLowerCase()}/${
                                                      GetPostsResult.id
                                                    }`}
                                                  >
                                                    <img
                                                      className="img-fluid w-100"
                                                      src={
                                                        GetPostsResult
                                                          ?.get_images[0]?.image
                                                      }
                                                      alt=""
                                                    />
                                                  </Link>
                                                ) : GetPostsResult?.file_type ==
                                                  "videos" ? (
                                                  <Link
                                                    className="color-white w-100"
                                                    // to={`/${encodeURIComponent(
                                                    //   GetPostsResult?.title
                                                    // )}/${GetPostsResult?.id}`}

                                                    to={`/${GetPostsResult.type.toLowerCase()}/${GetPostsResult.title
                                                      .replace(
                                                        /[^a-zA-Z]/g,
                                                        "-"
                                                      )
                                                      .replace(/-+/g, "-")
                                                      .toLowerCase()}/${
                                                      GetPostsResult.id
                                                    }`}
                                                  >
                                                    <video
                                                      ref={(el) =>
                                                        (videoRefs.current[
                                                          index
                                                        ] = el)
                                                      }
                                                      loop
                                                      muted
                                                      // style={{ width: "100%", height: "200px", objectFit: "cover" }}
                                                    >
                                                      <source
                                                        src={
                                                          GetPostsResult?.vedio_file
                                                        }
                                                        type="video/mp4"
                                                      />
                                                      Your browser does not
                                                      support the video tag.
                                                    </video>
                                                  </Link>
                                                ) : (
                                                  <Link
                                                    className="color-white w-100"
                                                    // to={`/${encodeURIComponent(
                                                    //   GetPostsResult?.title
                                                    // )}/${GetPostsResult?.id}`}

                                                    to={`/${GetPostsResult.type.toLowerCase()}/${GetPostsResult.title
                                                      .replace(
                                                        /[^a-zA-Z]/g,
                                                        "-"
                                                      )
                                                      .replace(/-+/g, "-")
                                                      .toLowerCase()}/${
                                                      GetPostsResult.id
                                                    }`}
                                                  >
                                                    <img
                                                      className="img-fluid w-100"
                                                      src={
                                                        GetPostsResult?.thumbnel
                                                      }
                                                      alt=""
                                                    />
                                                  </Link>
                                                )}
                                              </div>
                                              <div className="post-content media-body">
                                                <div className="post-title w-100 SliderImagesTitle1">
                                                  <Link
                                                    // to={`/${encodeURIComponent(
                                                    //   GetPostsResult?.title
                                                    // )}/${GetPostsResult?.id}`}

                                                    to={`/${GetPostsResult.type.toLowerCase()}/${GetPostsResult.title
                                                      .replace(
                                                        /[^a-zA-Z]/g,
                                                        "-"
                                                      )
                                                      .replace(/-+/g, "-")
                                                      .toLowerCase()}/${
                                                      GetPostsResult.id
                                                    }`}
                                                  >
                                                    {GetPostsResult?.title}
                                                  </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </article>
                                        </Link>
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </>
                  );
                })}
                {/* <--------------- Show the Footer Add To Text-------------------> */}
                <div className="Footer_Only_Title row">
                  {webDashBoard?.posts
                    ?.slice(0, 10)
                    .map((webDashBoardTitle, index) => {
                      return (
                        <>
                          <div className="col-md-6 col-sm-12 Footer_Only_Title_col">
                            <Link
                              // to={`/${encodeURIComponent(
                              //   webDashBoardTitle?.title
                              // )}/${webDashBoardTitle?.id}`}

                              to={`/${webDashBoardTitle.get_category.title.toLowerCase()}/${webDashBoardTitle.title
                                .replace(/[^a-zA-Z]/g, "-")
                                .replace(/-+/g, "-")
                                .toLowerCase()}/${webDashBoardTitle.id}`}
                            >
                              <span className="Footer_Only_Title_Number">
                                {index + 1}
                              </span>
                              <span className="Footer_Only_Title_Text">
                                {webDashBoardTitle?.title}
                              </span>
                            </Link>
                          </div>
                        </>
                      );
                    })}

                  {/* <div className="col-md-6 col-sm-12">
                    <span className="Footer_Only_Title_Number">1</span> <span className="Footer_Only_Title_Text">1</span>
                  </div> */}
                </div>
              </div>
            </div>
            {/* Categoryp list end */}
          </main>
        )}

        {/* <!-- Footer Start--> */}
        <Footer />
      </div>
      {/* <!-- Main Wrap End--> */}
      <div className="dark-mark"></div>

      {showTopIcon ? (
        <Link
          id="scrollUp"
          to="/"
          onClick={scrollToTop}
          style={{ position: "fixed", zIndex: "2147483647" }}
        >
          <i className="ti-arrow-up"></i>
        </Link>
      ) : (
        <Link
          id="srollbottom"
          to="/"
          onClick={scrollToBottom}
          style={{ position: "fixed", zIndex: "2147483647" }}
        >
          <i className="ti-arrow-down"></i>
        </Link>
      )}
    </div>
  );
};
export default Home;
