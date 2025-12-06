import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchEnquiriesByProduct, fetchProduct } from "../api";

export default function ProductEnquiriesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setProduct(await fetchProduct(id));
    setEnquiries(await fetchEnquiriesByProduct(id));
  }

  if (!product) return <h2>Loading...</h2>;

  return (
    <div className="enquiries-page">

      <div className="enquiries-container">
        
        <h1 className="enquiries-title">
          Enquiries for {product.name}
        </h1>

        {enquiries.length === 0 ? (
          <p>No enquiries yet.</p>
        ) : (
          enquiries.map((e) => (
            <div className="enquiry-card" key={e.id}>
              <p><b>Name:</b> {e.name}</p>
              <p><b>Email:</b> {e.email}</p>
              <p><b>Phone:</b> {e.phone}</p>
              <p><b>Message:</b> {e.message}</p>
              <small className="date">
                {new Date(e.created_at).toLocaleString()}
              </small>
            </div>
          ))
        )}

        <button className="back-btn" onClick={() => navigate(`/product/${id}`)}>
          ← Back to Product
        </button>
      </div>

    </div>
  );
}
