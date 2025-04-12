import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Feed } from "../../components/Feed/Feed";
import "./HomePage.css";

export const Homepage = () => {
  return (
    <div className="homepage-container">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Feed />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};
