import React, { useEffect, useState } from "react";
import "../../assets/css/color.css";
import "../../assets/css/responsive.css";
import "../../assets/css/style.css";
import "../../assets/css/widgets.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import moment from "moment";
import Footer from "../Footer/Footer";
import axios from "axios";
import { API_BASE_URL } from "../../config/Config";
import Loader from "../loader/Loader";
import adsbanner from "../../assets/images/ads-banner.png";
import adsbanner2 from "../../assets/images/news-ads.jpg";
import politics from "../../assets/images/politics.jpg";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem("lang")
  );

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setContent("Your content here");
      setIsLoading(false);
    }, 1000); // Simulated loading time
  }, []);

  const [CategorieList, setCategorieList] = useState([]);
  const [webDashBoard, setWebDashBoard] = useState({
    reals: [],
    posts: [],
    all_posts: [],
    slider: [],
    tranding_post: [],
    category: [],
  });

  //search functionality start
  const [searchKey, setSearchKey] = useState("");
  const GetSearchData = async () => {
    const ApiData = {
      language: localStorage.getItem("lang")
        ? localStorage.getItem("lang")
        : "En",
    };
    await axios
      .get(
        `${API_BASE_URL}/web-dashboard?search=${searchKey}&language=${ApiData.language}`
      )
      .then((SearchDataResponse) => {
        setWebDashBoard(SearchDataResponse.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // This Methods For the GetWebDashBoard
  const GetWebDashBoard = async () => {
    let ApiData = {
      language: localStorage.getItem("lang")
        ? localStorage.getItem("lang")
        : "En",
    };
    await axios
      .get(`${API_BASE_URL}/web-dashboard?language=${ApiData.language}`)
      .then((response) => {
        setWebDashBoard(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // This Function for the Categroy wise Data Show
  const GetWebDashBoardCategory = async (id) => {
    let ApiData = {
      language: localStorage.getItem("lang")
        ? localStorage.getItem("lang")
        : "En",
    };
    await axios
      .get(
        `${API_BASE_URL}/web-dashboard?category_id=${id}&language=${ApiData.language}`
      )
      .then((response) => {
        setWebDashBoard(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // This Methods for the Get CateGoriesList
  const GetCategorieList = async () => {
    await axios.get(`${API_BASE_URL}/category-list`).then((response) => {
      setCategorieList(response.data.data);
    });
  };
  // This UseEffect Call for the Show the data GetCategorieList
  useEffect(() => {
    GetCategorieList();
    GetWebDashBoard();
    GetWebDashBoardCategory();
  }, []);
  // This UseEffect Call for the Show the data GetSearchData
  useEffect(() => {
    if (searchKey) {
      setTimeout(() => {
        GetSearchData();
      }, 1000);
    }
  }, [searchKey]);
  // This UseEffect Call for the Show the data GetWebDashBoard and GetWebDashBoardCategory
  useEffect(() => {
    const lang = localStorage.getItem("lang");
    if (lang) {
      GetWebDashBoard();
      GetWebDashBoardCategory();
    }
  }, [localStorage.getItem("lang")]);

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
    console.log("isCanvasOpen", isCanvasOpen);
  };

 
useEffect(() => {
    console.log(" inside home search key : ", searchKey)
})

  return (
    <div>
      <div className={`main-wrap ${isCanvasOpen ? "canvas-opened" : ""}`}>
        <Header />
        {isLoading ? (
          <Loader />
        ) : (
          <main className="position-relative">
            <div className="category_title mt-3 py-1">
              <div className="container">
                <div className="row">
                  <div className="col-md-12 col-lg-8">
                    <div className="morenews sidebar-right">
                      <div className="latest-post">
                        <div className="loop-list-style-1d">
                          {webDashBoard?.tranding_post?.map((tranding_post) => {
                            return (
                              <>
                                <Link to={`/NewsDetails/${tranding_post?.id}`}>
                                  <article
                                    key={tranding_post?.id}
                                    className="background-white politics_right_box mb-25 wow fadeIn animated post_data"
                                  >
                                    <div className="post_boxes">
                                      <div className="post-thumb img-hover-scale">
                                        <Link
                                          className="color-white"
                                          to={`/NewsDetails/${tranding_post?.id}`}
                                        >
                                          <img
                                            className="border-radius-15"
                                            src={tranding_post?.thumbnel}
                                            alt=""
                                          />
                                        </Link>
                                      </div>
                                      <div className="post-content media-body">
                                        <div class="entry-meta">
                                          <div class="entry-meta meta-0 font-small mb-20">
                                            <a to="#" tabindex="0">
                                              <span class="post-cat bg-success font-small color-white">
                                                {tranding_post?.tags}
                                              </span>
                                            </a>
                                          </div>
                                          <span class="post-in">
                                            <i
                                              class="ti-user"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            Admin
                                          </span>
                                          <span class="post-in">
                                            <i
                                              class="ti-alarm-clock"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            <span className="post-on">
                                              {moment(
                                                tranding_post?.created_at
                                              ).format("DD-MM-YYYY")}
                                            </span>
                                          </span>
                                        </div>
                                        <div className="post-title w-100">
                                          <Link
                                            to={`/NewsDetails/${tranding_post?.id}`}
                                          >
                                            {tranding_post?.title}
                                          </Link>
                                        </div>
                                        <p className="mb-0 mt-2">
                                          {tranding_post?.short_decription}
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
                  <div className="col-md-12 col-lg-4">
                    <div className="border-bottom pb-2 mb-3 p-0 w-100">
                      <div className="topstories_title px-4 py-2 bg-dark text-white">
                        Latest Reviews
                      </div>
                    </div>
                    <div className="p-20 bg-white">
                      <div className="sidebar-right">
                        <div className="latest-post">
                          <div className="loop-list-style-1d">
                            <div className="latestnews_update">
                              <ul
                                class="nav nav-pills"
                                id="pills-tab"
                                role="tablist"
                              >
                                <li className="nav-item">
                                  <a
                                    className="nav-link active"
                                    id="pills-home-tab"
                                    data-toggle="pill"
                                    href="#pills-home"
                                    role="tab"
                                    aria-controls="pills-home"
                                    aria-selected="true"
                                  >
                                    Recent
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    className="nav-link"
                                    id="pills-profile-tab"
                                    data-toggle="pill"
                                    href="#pills-profile"
                                    role="tab"
                                    aria-controls="pills-profile"
                                    aria-selected="false"
                                  >
                                    Popular
                                  </a>
                                </li>
                                <li className="nav-item">
                                  <a
                                    className="nav-link"
                                    id="pills-contact-tab"
                                    data-toggle="pill"
                                    href="#pills-contact"
                                    role="tab"
                                    aria-controls="pills-contact"
                                    aria-selected="false"
                                  >
                                    Common
                                  </a>
                                </li>
                              </ul>
                              <div
                                className="tab-content mt-3"
                                id="pills-tabContent"
                              >
                                <div
                                  className="tab-pane fade show active"
                                  id="pills-home"
                                  role="tabpanel"
                                  aria-labelledby="pills-home-tab"
                                >
                                  {webDashBoard?.posts
                                    ?.slice(0, 6)
                                    .map((result) => {
                                      return (
                                        <>
                                          <Link
                                            to={`/NewsDetails/${result?.id}`}
                                          >
                                            <article
                                              key={result?.id}
                                              className="background-white politics_right_box mb-25 wow fadeIn animated post_data"
                                            >
                                              <div className="post_boxes">
                                                <div className="post-thumb img-hover-scale">
                                                  {result?.file_type ==
                                                  "image" ? (
                                                    <Link
                                                      className="color-white"
                                                      to={`/NewsDetails/${result?.id}`}
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
                                                      to={`/NewsDetails/${result?.id}`}
                                                    >
                                                      <img
                                                        className="border-radius-15"
                                                        src={result?.thumbnel}
                                                        alt=""
                                                      />
                                                    </Link>
                                                  )}
                                                </div>
                                                <div className="post-content media-body">
                                                  <div class="entry-meta">
                                                    <span className="post-in">
                                                      <i
                                                        className="ti-alarm-clock"
                                                        aria-hidden="true"
                                                      ></i>{" "}
                                                      September 20, 2018
                                                    </span>
                                                  </div>
                                                  <div className="post-title w-100">
                                                    <Link
                                                      to={`/NewsDetails/${result?.id}`}
                                                    >
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
                                <div
                                  className="tab-pane fade"
                                  id="pills-profile"
                                  role="tabpanel"
                                  aria-labelledby="pills-profile-tab"
                                >
                                  {webDashBoard?.posts
                                    ?.slice(0, 6)
                                    .map((result) => {
                                      return (
                                        <>
                                          <Link
                                            to={`/NewsDetails/${result?.id}`}
                                          >
                                            <article
                                              key={result?.id}
                                              className="background-white politics_right_box mb-25 wow fadeIn animated post_data"
                                            >
                                              <div className="post_boxes">
                                                <div className="post-thumb img-hover-scale">
                                                  {result?.file_type ==
                                                  "image" ? (
                                                    <Link
                                                      className="color-white"
                                                      to={`/NewsDetails/${result?.id}`}
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
                                                      to={`/NewsDetails/${result?.id}`}
                                                    >
                                                      <img
                                                        className="border-radius-15"
                                                        src={result?.thumbnel}
                                                        alt=""
                                                      />
                                                    </Link>
                                                  )}
                                                </div>
                                                <div className="post-content media-body">
                                                  <div className="entry-meta">
                                                    <span className="post-in">
                                                      <i
                                                        className="ti-alarm-clock"
                                                        aria-hidden="true"
                                                      ></i>{" "}
                                                      September 20, 2018
                                                    </span>
                                                  </div>
                                                  <div className="post-title w-100">
                                                    <Link
                                                      to={`/NewsDetails/${result?.id}`}
                                                    >
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
                                <div
                                  className="tab-pane fade"
                                  id="pills-contact"
                                  role="tabpanel"
                                  aria-labelledby="pills-contact-tab"
                                >
                                  {webDashBoard?.posts
                                    ?.slice(0, 6)
                                    .map((result) => {
                                      return (
                                        <>
                                          <Link
                                            to={`/NewsDetails/${result?.id}`}
                                          >
                                            <article
                                              key={result?.id}
                                              className="background-white politics_right_box mb-25 wow fadeIn animated post_data"
                                            >
                                              <div className="post_boxes">
                                                <div className="post-thumb img-hover-scale">
                                                  {result?.file_type ==
                                                  "image" ? (
                                                    <Link
                                                      className="color-white"
                                                      to={`/NewsDetails/${result?.id}`}
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
                                                      to={`/NewsDetails/${result?.id}`}
                                                    >
                                                      <img
                                                        className="border-radius-15"
                                                        src={result?.thumbnel}
                                                        alt=""
                                                      />
                                                    </Link>
                                                  )}
                                                </div>
                                                <div className="post-content media-body">
                                                  <div className="entry-meta">
                                                    <span className="post-in">
                                                      <i
                                                        className="ti-alarm-clock"
                                                        aria-hidden="true"
                                                      ></i>{" "}
                                                      September 20, 2018
                                                    </span>
                                                  </div>
                                                  <div className="post-title w-100">
                                                    <Link
                                                      to={`/NewsDetails/${result?.id}`}
                                                    >
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        )}

        {/* <!-- Footer Start--> */}
        <Footer setSearchKey={setSearchKey} />
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
