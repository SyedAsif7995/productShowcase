import { useState } from "react";
import { fetchEnquiriesByProduct } from "../api";
import EnquiryForm from "./EnquiryForm";

export default function ProductModal({ product, onClose }) {
  const [enquiries, setEnquiries] = useState([]);
  const [showEnquiries, setShowEnquiries] = useState(false);

  
  async function loadEnquiries(id) {
    console.log("Loading enquiries for product:", id);
    const data = await fetchEnquiriesByProduct(id);
    setEnquiries(data);
    setShowEnquiries(true);
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        
        <h2>{product.name}</h2>

        <img src={product.image_url} alt="" style={{ width: "100%" }} />

        <p>{product.long_desc}</p>
        <p><b>Price:</b> ₹{product.price}</p>

        <hr />

        
        <button
          className="btn"
          style={{ marginBottom: "10px", background: "green" }}
          onClick={() => loadEnquiries(product.id)}
        >
          See Enquiries
        </button>

        
        <EnquiryForm productId={product.id} />

        
        {showEnquiries && (
          <div style={{ marginTop: "20px" }}>
            <h3>Enquiries for this product</h3>

            {enquiries.length === 0 ? (
              <p>No enquiries yet.</p>
            ) : (
              enquiries.map((e) => (
                <div
                  key={e.id}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                    padding: "10px",
                    marginBottom: "10px",
                    background: "#fafafa"
                  }}
                >
                  <p><b>Name:</b> {e.name}</p>
                  <p><b>Email:</b> {e.email}</p>
                  <p><b>Phone:</b> {e.phone}</p>
                  <p><b>Message:</b> {e.message}</p>
                  <small>{new Date(e.created_at).toLocaleString()}</small>
                </div>
              ))
            )}
          </div>
        )}

        <button onClick={onClose} className="btn" style={{ marginTop: "10px" }}>
          Close
        </button>

      </div>
    </div>
  );
}
