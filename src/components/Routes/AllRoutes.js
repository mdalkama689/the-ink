import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NewsDetails from "../pages/NewsDetails";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Category from "../pages/Category";
import Privacypolicy from "../pages/Privacypolicy";
import Terms_Condition from "../pages/Terms_Condition";
import Contact from "../pages/Contact";
import ReletedPostDetails from "../pages/ReletedPostDetails";
import PublisherDetailsPage from "../pages/PublisherDetailsPage";
import RequestDataDeletion from "../pages/RequestDataDeletion";
import PrivacypolicyApp from "../pages/PrivacyPloicyApp";
import PublisherDetailsApp from "../pages/PublisherDetailsApp";
import Terms_Condition_App from "../pages/Terms_Condition_App";
import { HelmetProvider } from "react-helmet-async";
const AllRoutes = () => {
  return (
    <div>
      <HelmetProvider>
        <Routes>
          <Route path="/Header" element={<Header />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/NewsDetails/:id" element={<NewsDetails />} /> */}
          
          {/* <Route path="/:title/:id" element={<NewsDetails />} /> // changes  */}
          <Route path="/:category/:title/:id" element={<NewsDetails />} />
          {/* changes end  */}
          <Route path="/:title1/:id" element={<ReletedPostDetails />} />
          {/* <Route path="/ReletedPostDetails/:id" element={<ReletedPostDetails />} /> */}
          <Route path="/Footer" element={<Footer />} />
          <Route path="/Category/:id" element={<Category />} />
          <Route path="/privacy-policy" element={<Privacypolicy />} />
          <Route path="/privacy-policy-app" element={<PrivacypolicyApp />} />
          <Route path="/publisher-details" element={<PublisherDetailsPage />} />
          <Route path="/publisher-details-app" element={<PublisherDetailsApp />} />
          <Route path="/request-data-deletion" element={<RequestDataDeletion />} />
          <Route path="/terms-condition" element={<Terms_Condition />} />
          <Route path="/terms-condition-app" element={<Terms_Condition_App />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </HelmetProvider>

    </div>
  );
};

export default AllRoutes;
