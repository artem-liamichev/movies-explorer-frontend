import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500)
  }, [isLoading]);

  return isLoggedIn? children : !isLoading && <Redirect to="/" />

  };
  
  export default ProtectedRoute; 