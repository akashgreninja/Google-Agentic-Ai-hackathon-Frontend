import React, { useCallback, useState } from 'react';

export const useApi = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const baseUrl = 'https://e11398c9a4cc.ngrok-free.app/';
  const fn = async (args) => {
    let { url, method = 'GET', body, header, params, ...rest } = args;
    if (params) {
      const queryString = new URLSearchParams(params).toString();
      url += `?${queryString}`;
    }
    if (body) {
      body = JSON.stringify(body);
    }
    const res = await fetch(baseUrl + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...header,
      },
      body,
      ...rest,
    });

    return await res.json();
  };

  const callApi = useCallback(async (...args) => {
    try {
      setLoading(true);
      setData(await fn(...args));
    } catch (e) {
      console.error(`Error while making apiRequest request ${JSON.stringify(args)}`, {
        e,
      });
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);
  return {
    callApi,
    data,
    loading,
  };
};
