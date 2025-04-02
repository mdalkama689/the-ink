import React, { useEffect, useState } from "react";
import "../pages/Privacypolicy.css"
import Footer from '../Footer/Footer';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import newsLogo from "../../assets/images/NewsLogo2.png";
import { API_BASE_URL } from "../../config/Config";
import Nav from 'react-bootstrap/Nav';
import axios from "axios";
import { FaFacebook } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import ReactHtmlParser from "react-html-parser";

const PublisherDetailsPage = () => {
    const [CategorieList, setCategorieList] = useState([]);
    const [PrivacyPolicy, setPrivacyPolicy] = useState({});
    // This Methods for the Get CateGoriesList
    const GetCategorieList = async () => {
        await axios.get(`${API_BASE_URL}/category-list`).then((response) => {
            setCategorieList(response.data.data);
        });
    };

    const GetPrivacyPolicy = async () => {
        await axios.get(`${API_BASE_URL}/publisher-details`).then((response) => {
            setPrivacyPolicy(response.data.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    console.log("PrivacyPolicy", PrivacyPolicy)
    useEffect(() => {
        GetCategorieList();
        GetPrivacyPolicy();
    }, [])
    return (
        <>
            <div>
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
                <div className='PrivacypolicyMain'>

                    <h1 className='PrivacypolicyMainHeading'>{PrivacyPolicy?.title}</h1>
                    <p> {ReactHtmlParser(PrivacyPolicy?.description)}</p>
                </div>

            </div>
            <Footer />
        </>
    )
}

export default PublisherDetailsPage