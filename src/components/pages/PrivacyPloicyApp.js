import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "../pages/Privacypolicy.css";
import Footer from "../Footer/Footer";
import Navbar from "react-bootstrap/Navbar";
import { Link, useParams } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Container from "react-bootstrap/Container";
import newsLogo from "../../assets/images/NewsLogo2.png";
import { API_BASE_URL } from "../../config/Config";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import { FaFacebook } from "react-icons/fa";
import { LuInstagram } from "react-icons/lu";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaPinterest } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import ReactHtmlParser from "react-html-parser";
const PrivacypolicyApp = () => {
  const [CategorieList, setCategorieList] = useState([]);
  const [PrivacyPolicy, setPrivacyPolicy] = useState({});
  // This Methods for the Get CateGoriesList
  const GetCategorieList = async () => {
    await axios.get(`${API_BASE_URL}/category-list`).then((response) => {
      setCategorieList(response.data.data);
    });
  };

  const GetPrivacyPolicy = async () => {
    await axios
      .get(`${API_BASE_URL}/privacy-policy`)
      .then((response) => {
        setPrivacyPolicy(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("PrivacyPolicy", PrivacyPolicy);
  useEffect(() => {
    GetCategorieList();
    GetPrivacyPolicy();
  }, []);
  return (
    <>
      <div>
        <div className="PrivacypolicyMain">
          <h1 className="PrivacypolicyMainHeading">{PrivacyPolicy?.title}</h1>
          <p> {ReactHtmlParser(PrivacyPolicy?.description)}</p>
        </div>
      </div>
    </>
  );
};

export default PrivacypolicyApp;
