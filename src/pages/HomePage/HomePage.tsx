import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Feed } from "../../components/Feed/Feed";
import "./HomePage.css";

export const Homepage = () => {
  return (
    <div className="homepage-container">
      <Header />
      <BrowserRouter>
        <Routes>
          {/* Redirect root path to /new */}
          <Route path="/" element={<Navigate to="/new" replace />} />

          {/* Dynamic feedtype route */}
          <Route path="/:feedtype" element={<Feed />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
};
