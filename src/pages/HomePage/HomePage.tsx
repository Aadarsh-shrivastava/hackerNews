import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import "./HomePage.css";

export const Homepage = () => {
  return (
    <div className="homepage-container">
      <Header />
      <div className="homepage-body"></div>
      <Footer />
    </div>
  );
};
