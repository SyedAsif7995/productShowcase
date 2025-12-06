import { useNavigate } from "react-router-dom";
import '../styles.css';
export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <img src={product.image_url} alt={product.name} className="product-img" />

      <h3>{product.name}</h3>
      <p>{product.short_desc}</p>
      <p className="price">₹{product.price}</p>

      <button
        className="view-btn"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        View
      </button>
    </div>
  );
}
