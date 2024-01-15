// import "./App.css";
// import React, { useState } from 'react';
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Home from "./pages/HomePage";
// import SignIn from "./pages/SignInPage";
// import SignUp from "./pages/SignUpPage";
// import PrivateRoute from "./PrivateRoute";
// import CreateEvent from "./pages/CreateEventPage";
// import { getAuth, onAuthStateChanged } from "firebase/auth";
// import {  Link } from 'react-router-dom';

// function App() {
//   const [user, setUser] = React.useState(null);
//   const handleLogin = (email) => setUser(email);
//   const handleLogout = () => setUser(null);
//   const auth = getAuth()

//   onAuthStateChanged(auth, (firebaseUser) => {
//      if (firebaseUser) {
//       console.log(firebaseUser.email)
//       handleLogin(firebaseUser.email)
//       console.log(user)
//     } else {
//       handleLogout()
//     }
//   });

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/createevent" element={<PrivateRoute user={user} />}/>
//           {/* <Route element={<CreateEvent />} path="/createevent" exact />
//         </Route> */}
//         <Route path="/" element={<Home />} exact />
//         <Route path="/signin" element={<SignIn />} exact />
//         <Route path="/signup" element={<SignUp />} exact />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

//

import { useState } from "react";
import { initializeApp } from "firebase/app";
import "./App.css";
import { auth } from "./firebase";
import { getAuth, signOut } from "firebase/auth";
import Login from "./components/Login/Login";
import Stats from "./components/Stats";
import Home from "./pages/Home";
import Events from "./Events";
import NoMatch from "./NoMatch";
import Hero from "./components/Hero/Hero";
import CreateEvent from "./pages/CreateEvent";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useParams,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navigation/Navbar/Navbar";
import Navigation from "./components/Navigation/Navigation";
import Register from "./components/Register/Register";

// const AppLayout = () => {
//   const [user, setUser] = useState();
//   const navigate = useNavigate();
//   const location = useLocation();

//   function logOut() {
//     signOut(getAuth())
//       .then(() => {
//         // Sign-out successful.
//         console.log("Logout Success");
//         setUser(null);
//         navigate("/");
//       })
//       .catch((error) => {
//         console.log("Logout Error");
//       });
//     // Add firebase logout
//   }

//   const isLoginPage = location.pathname === "/login";
//   const isRegisterPage = location.pathname === "/register";
//   const shouldRenderNavigation = !isLoginPage && !isRegisterPage;

//   return (
//     <>
//       {shouldRenderNavigation && <Navigation user={user} logOut={logOut} />}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         {/* <Route path="/posts" element={<Posts />}>
//             <Route index element={<PostLists />} />
//             <Route path=":slug" element={<Post />} />
//           </Route> */}
//         <Route path="/events" element={<Events />} />
//         <Route path="/login" element={<Login onLogin={setUser} />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/stats" element={<Stats user={user} />} />
//         <Route path="*" element={<NoMatch />} />
//       </Routes>
//     </>
//   );
// };

// function App() {
//   const firebaseConfig = {
//     apiKey: "AIzaSyD-mFG8kVjCXqwQkNxUw0x_WGlvlKwijns",
//     authDomain: "eventapp-6524a.firebaseapp.com",
//     projectId: "eventapp-6524a",
//     storageBucket: "eventapp-6524a.appspot.com",
//     messagingSenderId: "484510317077",
//     appId: "1:484510317077:web:c51b2c81e93c5f8456ac1c",
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   return (
//     <Router>
//       <AppLayout />
//     </Router>
//   );
// }

// export default App;

function App() {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  function logOut() {
    signOut(getAuth())
      .then(() => {
        // Sign-out successful.
        console.log("Logout Success");
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.log("Logout Error");
      });
    // Add firebase logout
  }

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const shouldRenderNavigation = !isLoginPage && !isRegisterPage;

  return (
    <>
      {shouldRenderNavigation && <Navigation user={user} logOut={logOut} />}
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/posts" element={<Posts />}>
            <Route index element={<PostLists />} />
            <Route path=":slug" element={<Post />} />
          </Route> */}
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/stats" element={<Stats user={user} />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
export default App;
