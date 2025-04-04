import React, { useEffect, useState } from "react";
import "../../assets/css/color.css";
import "../../assets/css/responsive.css";
import "../../assets/css/style.css";
import "../../assets/css/widgets.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import axios from "axios";
import { API_BASE_URL } from "../../config/Config";
import Loader from "../loader/Loader";
import Header from "../Header/Header";
const Contact = () => {
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
    }, 5000); // Simulated loading time
  }, []);

  const [CategorieList, setCategorieList] = useState([]);
  const [CategoryTopNews, setCategoryTopNews] = useState([]);
  const [activeCategoryId, setActiveCategoryId] = useState(null);
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
    try {
      const apiData = {
        language: localStorage.getItem("lang")
          ? localStorage.getItem("lang")
          : "En",
      };

      const response = await axios.get(
        `${API_BASE_URL}/web-dashboard?language=${apiData.language}`
      );
      setWebDashBoard(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading to false after the API request completes
    }
  };

  // This Function for the Categroy wise Data Show
  const GetWebDashBoardCategory = async (id) => {
    try {
      setIsLoading(true);
      let ApiData = {
        language: localStorage.getItem("lang")
          ? localStorage.getItem("lang")
          : "En",
      };
      const response = await axios.get(
        `${API_BASE_URL}/web-dashboard?category_id=${id}&language=${ApiData.language}`
      );
      setWebDashBoard(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

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
        `${API_BASE_URL}/category-topnews?category_id=${id}&language=${ApiData.language}`
      );
      setCategoryTopNews(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(true);
    } finally {
    }
  };
  // This Function Use When We select The Language Then show me By Default the First Data
  const GetTopCategoryNews1 = async () => {
    try {
      setIsLoading(true);
      let ApiData = {
        language: localStorage.getItem("lang")
          ? localStorage.getItem("lang")
          : "En",
      };
      const response = await axios.get(
        `${API_BASE_URL}/category-topnews?language=${ApiData.language}`
      );
      setCategoryTopNews(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
    GetTopCategoryNews();
    GetTopCategoryNews1();
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
      GetTopCategoryNews();
      GetTopCategoryNews1();
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
    GetTopCategoryNews(selectedLanguage);
  }, [selectedLanguage]);
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
        <Header />

        <div></div>
        {/* <!-- Main Wrap Start --> */}
        {isLoading ? (
          <Loader />
        ) : (
          <main className="position-relative">
            <div className="container">
              <div className="row mb-50">
                <div className="col-12 mb-50 text-center">
                  <div className="entry-main-content mt-50">
                    <h1>Contact us</h1>
                    <hr className="wp-block-separator is-style-wide"></hr>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged.
                    </p>
                  </div>
                </div>
                <div className="col-lg-8 col-md-6 pr-md-0">
                  <div className="entry-main-content bg-white p-4">
                    <h3>Get in touch</h3>
                    <hr className="wp-block-separator is-style-wide"></hr>
                    <form className="form-contact comment_form" action="#">
                      <div className="row">
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              className="form-control"
                              name="name"
                              id="name"
                              type="text"
                              placeholder="Name"
                            />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <input
                              className="form-control"
                              name="email"
                              id="email"
                              type="email"
                              placeholder="Email"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <input
                              className="form-control"
                              name="website"
                              id="website"
                              type="text"
                              placeholder="Phone"
                            />
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-group">
                            <textarea
                              className="form-control w-100"
                              name="comment"
                              id="comment"
                              cols="30"
                              rows="9"
                              placeholder="Message"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <button
                          type="submit"
                          className="button button-contactForm"
                        >
                          Send message
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6 pl-md-0 d-flex">
                  <div className="single-excerpt text-white bg-dark p-4">
                    <div className="my-auto pt-50">
                      <h3>About</h3>

                      <p className="text-white">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                      <div className="address-icon">
                        <p>
                          <span className="mr-5">
                            <i className="ti-location-pin"></i>
                          </span>
                          <div>
                            <strong>Address</strong> Lorem 142 Str., 2352,
                            Ipsum, State, USA
                          </div>
                        </p>
                        <p>
                          <span className="mr-5">
                            <i className="ti-mobile"></i>
                          </span>
                          <div>
                            <strong>Contact</strong> + 9850678910
                          </div>
                        </p>
                        <p>
                          <span className="mr-5">
                            <i className="ti-envelope"></i>
                          </span>

                          <div>
                            <strong>Gmail</strong> info@example.com{" "}
                          </div>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
export default Contact;
