import React, { useEffect, useState } from "react";
import { BASE_URL_ADMIN, SINGLE_PAGE_CONTENT } from "../API";
import axios from "axios";
import parse from "html-react-parser";

const TermsAndCondition = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(BASE_URL_ADMIN + SINGLE_PAGE_CONTENT + "?type=Terms and Conditions");
        if (response.data.code === 200 && response.data.status === true) {
          setData(response?.data?.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="card">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">{data?.type}</h1>
        <div className="prose text-gray-600 leading-relaxed">
          {data?.data ? parse(data?.data) : <p className="text-gray-400">Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default TermsAndCondition;
