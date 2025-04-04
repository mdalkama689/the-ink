import axios from "axios";
import React, { useEffect } from "react";
import { API_BASE_URL } from "../../config/Config";
import { useParams } from "react-router-dom";

const searchKey = "Delhi";

//search functionality start

// const GetSearchData = async () => {
//   const ApiData = {
//     language: localStorage.getItem("lang")
//       ? localStorage.getItem("lang")
//       : "En",
//   };

//   // const response = await axios.get(
//   //   `${API_BASE_URL}/category-topnews?search=${searchKey}&language=${ApiData.language}`
//   // );
//   // console.log(response.data);
//   const response = await axios.get(
//     `${API_BASE_URL}/category-topnews?category_id=${activeCategoryId}&language=${ApiData.language}`
//   );
// };

const NewsByStateOrAuthor = () => {
  const { category } = useParams();

  useEffect(() => {
    GetSearchData();
  }, []);
  return <div>NewsByStateOrAuthor</div>;
};

export default NewsByStateOrAuthor;
