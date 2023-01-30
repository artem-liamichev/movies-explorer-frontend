import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 200)
  }, [isLoading]);

  return isLoggedIn? children : !isLoading && <Redirect to="/" />

  if (isLoggedIn===undefined) {
    return <Redirect to="/signup" />
  }  else if (isLoggedIn===true) {
    return children
  } else {
    return <Redirect to="/signup" />
  }
  
  // return (
  //     <Route>
  //       {
  //         isLoggedIn ?  children : <Redirect to="/signin" />
  //       }
  //     </Route>
  //   );
  };
  
  export default ProtectedRoute; 