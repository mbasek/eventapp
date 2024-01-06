import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/HomePage";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} exact />
        <Route path="/login" Component={Login} exact />
        <Route path="/register" Component={Register} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
