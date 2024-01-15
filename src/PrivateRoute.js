// import { Outlet, Navigate } from "react-router-dom";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { useState } from "react";

// const PrivateRoute = () => {
//   const [isLoggedIn, setLoggedIn] = useState(false);

//   const auth = getAuth();
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       setLoggedIn(true);

//       const uid = user.uid;
//       console.log(uid);
//       console.log("aaaa");
//       return (<Outlet />);
//     } else {
//       setLoggedIn(false);
//       return (<Navigate to="/signin" />);
//     }
//   });

//   console.log(isLoggedIn);
// //   return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
// };

// export default PrivateRoute;


import React from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Outlet, Navigate } from "react-router-dom";


const PrivateRoute = ({
  user,
  redirectPath = '/'
}) => {
    console.log("-------")
    console.log(user)
    console.log("-------")
    return  <Outlet/>
   
  //   let auth = {'token':true}
  // return (
  //   auth.token ? <Outlet/> : <Navigate to='signin'/>
  // )
}

export default PrivateRoute 


// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { Outlet, Navigate } from "react-router-dom";


// const PrivateRoute = () => {
//     const auth = getAuth();

//     onAuthStateChanged(auth, (user) => {
//         if (user) {
//           return <Outlet/>
//         } else {
//           return <Navigate to='signin'/>
//         }
//       });
    
 
// }

// export default PrivateRoute


