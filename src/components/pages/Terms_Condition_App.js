import React, { useEffect, useState } from "react";
import "../pages/Privacypolicy.css";
import { API_BASE_URL } from "../../config/Config";
import axios from "axios";
import "../pages/Privacypolicy.css";
import ReactHtmlParser from "react-html-parser";
const Terms_Condition_App = () => {
  const [TermsCondition, setTermsCondition] = useState({});

  const GetTermsCondition = async () => {
    await axios
      .get(`${API_BASE_URL}/terms-condition`)
      .then((response) => {
        setTermsCondition(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log("TermsCondition", TermsCondition);
  useEffect(() => {
    GetTermsCondition();
  }, []);
  return (
    <>
      <div>
        <div className="PrivacypolicyMain">
          <h1 className="PrivacypolicyMainHeading">{TermsCondition?.title}</h1>
          <p> {ReactHtmlParser(TermsCondition?.description)}</p>
        </div>
      </div>
    </>
  );
};

export default Terms_Condition_App;
