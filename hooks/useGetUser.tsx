import { useState, useEffect } from "react";

import { isLoggedIn } from "@/auth.service";
import axios from "axios";
import { getFromLocalStorage } from "@/utils";
import { authKey } from "@/constants";

const useGetUser = () => {
  const [userData, setUserData] = useState(null) as any;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const userLoggedIn = isLoggedIn();
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const accessToken = getFromLocalStorage(authKey);

        // if (!accessToken) {
        //   throw new Error("Something is wrong. Please log in.");
        // }

        // const res = await axiosInstance({
        //   url: `${getBaseUrl()}/users/me`,
        //   method: "GET",
        //   headers: { "Content-Type": "application/json" },
        // });

        const res = await axios.get(
          `https://visa-tech-backend.onrender.com/api/v1/client-registration/user-info`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = res.data;

        setUserData(data); // Set decrypted data to state
      } catch (err: any) {
        return setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userLoggedIn]);

  return { userData, error, loading };
};

export default useGetUser;
