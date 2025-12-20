import { useState, useEffect } from "react";

import { isLoggedIn } from "@/auth.service";
import axios from "axios";
import { getFromLocalStorage } from "@/utils";
import { authKey } from "@/constants";

const useGetAllCGIData = () => {
  const [cgiData, setAllCGIData] = useState(null) as any;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userLoggedIn = isLoggedIn();
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const accessToken = getFromLocalStorage(authKey);
        const res = await axios.get(
          `https://visa-tech-backend.onrender.com/api/v1/client-submission`,
          {
            headers: {
              "Content-Type": "application/json",
              //   Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = res.data;
        setAllCGIData(data);
      } catch (err: any) {
        return setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userLoggedIn]);

  return { cgiData, error, loading };
};

export default useGetAllCGIData;
