import { useState, useEffect } from 'react';

const useFetch = (endpoint: string) => {
  const URL_API = 'https://norma.nomoreparties.space/api/';
  const [data, setData] = useState({ isLoading: true, isError: false, data: null });

  useEffect(() => {
    const getData = () => {
      fetch(`${URL_API}${endpoint}`)
        .then((res) => res.json())
        .then((res) => res.success && setData({ isLoading: false, isError: false, data: res.data }))
        .catch(() => setData({ isLoading: false, isError: true, data: null }));
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoading: data.isLoading, isError: data.isError, data: data.data };
};

export default useFetch;
