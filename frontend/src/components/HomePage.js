import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Product Showcase</h1>
      <p className="home-subtitle">Explore our best products with amazing offers.</p>

      <button 
        className="home-button"
        onClick={() => navigate("/products")}
      >
        See Products →
      </button>
    </div>
  );
}
