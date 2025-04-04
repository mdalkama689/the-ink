import React, { useEffect, useState } from "react";
import "../pages/Privacypolicy.css";
import Footer from "../Footer/Footer";
import { API_BASE_URL } from "../../config/Config";
import axios from "axios";
import ReactHtmlParser from "react-html-parser";

const PublisherDetailsApp = () => {
  const [PrivacyPolicy, setPrivacyPolicy] = useState({});

  const GetPrivacyPolicy = async () => {
    await axios
      .get(`${API_BASE_URL}/publisher-details`)
      .then((response) => {
        setPrivacyPolicy(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("PrivacyPolicy", PrivacyPolicy);
  useEffect(() => {
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

export default PublisherDetailsApp;
