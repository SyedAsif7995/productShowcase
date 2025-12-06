import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProduct } from "../api";
import EnquiryForm from "./EnquiryForm";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await fetchProduct(id);
    setProduct(data);
  }

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="details-page">
      <div className="details-card">

        <img src={product.image_url} alt={product.name} className="details-img" />

        <h1 className="details-title">{product.name}</h1>

        <p className="details-desc">{product.long_desc}</p>

        <h2 className="details-price">₹{product.price}</h2>

       
        <div className="details-form">
          <EnquiryForm productId={product.id} />
        </div>

       
        <div className="details-buttons">
          <button
            className="enquiry-btn"
            onClick={() => navigate(`/product/${id}/enquiries`)}
          >
            View Enquiries →
          </button>

          <button className="back-btn" onClick={() => navigate("/products")}>
            ← Back to Products
          </button>
        </div>
      </div>
    </div>
  );
}
