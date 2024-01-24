import { useState } from "react";
import "./App.css";
import { getAuth, signOut } from "firebase/auth";
import Login from "./components/Auth/Login/Login";
import Events from "./components/Events/Events";
import NoMatch from "./components/NoMatch/NoMatch";
import Hero from "./components/Hero/Hero";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Register from "./components/Auth/Register/Register";
import CreateEvent from "./components/CreateEvent/CreateEvent";

function App() {
  const [user, setUser] = useState(() => {
    // Pokušaj dohvatiti korisničke podatke iz localStorage
    const storedUser = localStorage.getItem("user");

    // Ako postoje korisnički podaci, vrati ih
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();
  const location = useLocation();

  function logOut() {
    signOut(getAuth())
      .then(() => {
        localStorage.removeItem("user");
        // Sign-out successful.
        console.log("Logout Success");
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.log("Logout Error");
      });
  }

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const shouldRenderNavigation = !isLoginPage && !isRegisterPage;

  return (
    <>
      {shouldRenderNavigation && <Navigation user={user} logOut={logOut} />}
      <Routes>
        <Route path="/" element={<Hero />} />
        {/* <Route path="/posts" element={<Posts />}>
            <Route index element={<PostLists />} />
            <Route path=":slug" element={<Post />} />
          </Route> */}
        <Route path="/events" element={<Events />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createevent/*" element={<CreateEvent user={user} />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}
export default App;
