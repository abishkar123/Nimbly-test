import { useEffect, useState } from "react";

 export const useAuth = () => {
  const [auth, setAuth] = useState(() => {
  
  const token = localStorage.getItem("authToken");
  
  return token ? { token } : null;
  });

  return { auth, setAuth };
};

export const userinfo = () => {
    const [userdata, setuserData] = useState(() => {
      const storedUserData = localStorage.getItem('userdata');
      return storedUserData ? JSON.parse(storedUserData) : null;
    });
  
    useEffect(() => {
      const storedUserData = localStorage.getItem('userdata');
      if (storedUserData) {
        setuserData(JSON.parse(storedUserData));
      }
    }, []);
  
    return { userdata, setuserData };
  };

