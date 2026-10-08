import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar"
import HomePage from "./components/homePage";
import Login from "./components/login";
import Register from "./components/register";
import AuthProfileApi from "./apis/authProfile.api";
import { readAuthSession, saveAuthSession } from "./utils/authSession";
import AboutUs from "./components/aboutUs";
import HowItWorks from "./components/howitwork";
import PrivacyPolicy from "./components/privacypolicy";
import TermsConditions from "./components/termCondition";
import Campaigns from "./components/campaigns";
import ServiceAndGifts from "./components/serviceGifts";
import Contact from "./components/contact";
import CampaignsGetOne from "./components/campaignsGetOne";
import MyProfile from "./components/myProfile";
import GetMyDonations from "./components/getMyDonations";
import MakeaDonation from "./components/makeaDonation";
import PaymentSuccess from "./components/paymentSuccess";
import PaymentFailed from "./components/paymentfai";
import AdminDashboard from "./components/adminDashboard";
import Footer from "./components/footer";
import FAQS from "./components/faqS";
import GlobalLoading from "./components/GlobalLoading";
import OurValues from "./components/ourValues";
import OurStory from "./components/ourStory";
import WhatWeDo from "./components/whatWeDo";
import WhyHelpTogether from "./components/whyHelpTogether";
import OurImpact from "./components/ourImpact";
import OurPartners from "./components/ourPartners";
import OurSuccessStories from "./components/success-story";
import { CurrencyProvider } from "./utils/CurrencyProvider";
import FundedCampaigns from "./components/fullyFundedCauses";
import CampaignsUpdates from "./components/updates";
import QuickDonate from "./components/quickDonate";
import "./styles/theme.css";

function App() {
  useEffect(() => {
    const session = readAuthSession();
    if (!session?.token) return;

    AuthProfileApi(session.token)
      .then((data) => saveAuthSession({ ...data, token: session.token }))
      .catch((error) => console.error('Profile refresh failed:', error));
  }, []);

  return (
    <CurrencyProvider>
      <>
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/how-it-work" element={<HowItWorks />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/term-condition" element={<TermsConditions />} />
          <Route path="/service-gifts/:id" element="ServiceGiftDetails" />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/donate/:type/:id" element={<MakeaDonation />} />
          <Route path="/campaigns/:id" element={<CampaignsGetOne />} />
          <Route path="/service-gifts" element={<ServiceAndGifts />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQS />} />
          <Route path="/profile/:id" element={<MyProfile />} />
          <Route path="/my-donations" element={<GetMyDonations />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/payment-cancel" element={<PaymentFailed />} />
          <Route path="/our-values" element={<OurValues />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/what-we-do" element={<WhatWeDo />} />
          <Route path="/why-helptogether" element={<WhyHelpTogether />} />
          <Route path="/our-impact" element={<OurImpact />} />
          <Route path="/our-partners" element={<OurPartners />} />
          <Route path="/our-success-story" element={<OurSuccessStories />} />
          <Route path="/funded_Campaigns" element={<FundedCampaigns />} />
          <Route path="/campaigns-updates" element={<CampaignsUpdates />} />
          <Route path="/quick-donate" element={<QuickDonate />} />
        </Routes>
        <Footer />
        <GlobalLoading />
      </>
    </CurrencyProvider>
  )
}

export default App
