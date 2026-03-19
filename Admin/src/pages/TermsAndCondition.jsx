import React, { useEffect, useState } from "react";
import { Container } from 'react-bootstrap'
import '../others.css';
import { BASE_URL_ADMIN, SINGLE_PAGE_CONTENT } from "../API";
import axios from "axios";
import parse from 'html-react-parser';
const TermsAndCondition = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(BASE_URL_ADMIN + SINGLE_PAGE_CONTENT + '?type=Terms and Conditions');
      if (response.data.code === 200 && response.data.status === true) {
        const dataResponse = response?.data?.data;
        setData(dataResponse);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error_description || "An error occurred";
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Container>
      <div className="card">
        <h1 className="primary-heading">{data?.type}</h1>
        <p className="paragraph">
          {data?.data ? parse(data?.data) : 'Loading...'}
        </p>
      </div>
    </Container>
  )
}

export default TermsAndCondition
