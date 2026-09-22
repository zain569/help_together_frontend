import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar"
import HomePage from "./components/homePage";
import Login from "./components/login";
import Register from "./components/register";
import AuthProfileApi from "./apis/authProfile.api";
import { readAuthSession, saveAuthSession } from "./utils/authSession";
import Footer from "./components/footer";

function App() {
  useEffect(() => {
    const session = readAuthSession();
    if (!session?.token) return;

    AuthProfileApi(session.token)
      .then((data) => saveAuthSession({ ...data, token: session.token }))
      .catch((error) => console.error('Profile refresh failed:', error));
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/service-gifts/:id" element="ServiceGiftDetails" />"
      </Routes>
      <Footer />
    </>
  )
}

export default App
