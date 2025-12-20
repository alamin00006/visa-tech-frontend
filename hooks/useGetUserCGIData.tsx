import { useState, useEffect } from "react";

import { isLoggedIn } from "@/auth.service";
import axios from "axios";
import { getFromLocalStorage } from "@/utils";
import { authKey } from "@/constants";

const useGetUserCGIData = (userId) => {
  const [cgiUserData, setUserCGIData] = useState(null) as any;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userLoggedIn = isLoggedIn();
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const accessToken = getFromLocalStorage(authKey);
        const res = await axios.get(
          `https://visa-tech-backend.onrender.com/api/v1/client-submission/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              //   Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = res.data;
        setUserCGIData(data);
      } catch (err: any) {
        return setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userLoggedIn]);

  return { cgiUserData, error, loading };
};

export default useGetUserCGIData;
