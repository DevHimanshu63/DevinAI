import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../context/user.context";
import { useNavigate } from "react-router-dom";
function UserAuth({ children }) {
  const navigate = useNavigate(); 
  const { user } = useContext(userContext);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  
  

  useEffect(() => {
    if (user) {
        setLoading(false);
      }
    if (!user) {
      navigate("/login");
    }
    if (!token) {
      navigate("/login");
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return <div>{children}</div>;
}

export default UserAuth;
