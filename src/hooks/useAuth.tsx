import { useEffect, useState } from "react";

const useAuth = () => {
  const [auth, setAuth] = useState(() => {
    // Initialize auth state from localStorage
    const token = localStorage.getItem("authToken");
    return token ? { token } : null;
  });

  // Expose the state and updater
  return { auth, setAuth };
};

export default useAuth;


export const userinfo = () => {
    const [userdata, setuserData] = useState(() => {
      // Initialize user data from localStorage
      const storedUserData = localStorage.getItem('userdata');
      return storedUserData ? JSON.parse(storedUserData) : null;
    });
  
    useEffect(() => {
      // Sync state with localStorage on mount or change
      const storedUserData = localStorage.getItem('userdata');
      if (storedUserData) {
        setuserData(JSON.parse(storedUserData));
      }
    }, []);
  
    return { userdata, setuserData };
  };

