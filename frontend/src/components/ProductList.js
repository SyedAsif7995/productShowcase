import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProduct, fetchProducts } from "../api";
import '../styles.css';

import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
export default function ProductList() {
  const [data, setData] = useState({ data: [], page: 1, pages: 1 });
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState(null);
const navigate = useNavigate();

  async function load(page = 1) {
    const result = await fetchProducts({ search, category, page, limit: 6 });
    setData(result);
  }

  useEffect(() => {
    load(1);
  }, [search, category]);

  async function openProduct(id) {
    const p = await fetchProduct(id);
    setSelected(p);
  }

  return (
    <div className="product-page">
      
      <div className="product-controls">
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option>Electronics</option>
          <option>Accessories</option>
          <option>Bags</option>
          <option>Fitness</option>
        </select>
      </div>

      
      <div className="product-grid">
        {data.data.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={openProduct} />
        ))}
      </div>

      
      <div className="product-pagination">
        <button disabled={data.page <= 1} onClick={() => load(data.page - 1)}>
          Prev
        </button>

        <span>
          Page {data.page} / {data.pages}
        </span>

        <button disabled={data.page >= data.pages} onClick={() => load(data.page + 1)}>
          Next
        </button>
      </div>
      <button 
  className="back-home-btn"
  onClick={() => navigate("/")}
>
  ← Back to Home
</button>


      {selected && <ProductModal product={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
