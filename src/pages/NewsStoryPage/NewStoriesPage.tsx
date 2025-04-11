import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import "./NewStoriesPage.css";

export const NewStoryPage = () => {
  return (
    <div className="newstory-container">
      <Header />
      <div className="newstory-body"></div>
      <Footer />
    </div>
  );
};
