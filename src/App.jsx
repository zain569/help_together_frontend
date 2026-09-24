import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar"
import HomePage from "./components/homePage";
import Login from "./components/login";
import Register from "./components/register";
import AuthProfileApi from "./apis/authProfile.api";
import { readAuthSession, saveAuthSession } from "./utils/authSession";
import Footer from "./components/footer";
import AboutUs from "./components/aboutUs";
import HowItWorks from "./components/howitwork";
import PrivacyPolicy from "./components/privacypolicy";
import TermsConditions from "./components/termCondition";
import Campaigns from "./components/campaigns";
import ServiceAndGifts from "./components/serviceGifts";
import Contact from "./components/contact";

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
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/how-it-work" element={<HowItWorks />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/term-condition" element={<TermsConditions />} />
        <Route path="/service-gifts/:id" element="ServiceGiftDetails" />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/donate/:id" element="This is donation Page" />
        <Route path="/campaigns/:id" element="Campaign Details" />
        <Route path="/service-gifts" element={<ServiceAndGifts />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
