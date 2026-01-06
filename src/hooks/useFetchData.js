import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = (baseUrl, autoFetch = true) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      // fetch query if param
      const queryString = new URLSearchParams(params).toString();
      const url = queryString ? `${baseUrl}?${queryString}` : baseUrl;

      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, refetch: fetchData };
};

export default useFetchData;
