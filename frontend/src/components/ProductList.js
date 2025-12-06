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
const fallbackProducts = [
  {
    id: 101,
    name: "Smart Speaker",
    category: "Electronics",
    short_desc: "Voice assistant",
    long_desc: "Compact smart speaker with AI voice recognition.",
    price: 7000,
    image_url: "https://tse3.mm.bing.net/th/id/OIP.CcjLOnz3KJE3SjFbzxOHZQHaEJ?pid=Api&P=0&h=180"
  },
  {
    id: 102,
    name: "Eco Water Bottle",
    category: "Accessories",
    short_desc: "Steel bottle",
    long_desc: "Keeps water cold for 24 hours and hot for 12 hours.",
    price: 349,
    image_url: "https://www.milton.in/cdn/shop/files/Stream750_Green_1.jpg?v=1740550838&width=1240"
  },
  {
    id: 103,
    name: "Travel Backpack",
    category: "Bags",
    short_desc: "25L capacity",
    long_desc: "Durable water-resistant travel backpack.",
    price: 800,
    image_url: "https://tse1.mm.bing.net/th/id/OIP.L2o42tAG_319VHx0ZYPy_AHaFF?pid=Api&P=0&h=180"
  },
  {
    id: 104,
    name: "Yoga Mat",
    category: "Fitness",
    short_desc: "6mm thick",
    long_desc: "Non-slip workout yoga mat with grip surface.",
    price: 300,
    image_url: "https://tse4.mm.bing.net/th/id/OIP.70QorvFW7wTH1SDC1IY4awHaEk?pid=Api&P=0&h=180"
  },
  {
    id: 105,
    name: "Bluetooth Earbuds",
    category: "Electronics",
    short_desc: "Wireless earbuds",
    long_desc: "Lightweight earbuds with 24h battery life.",
    price: 789,
    image_url: "https://tse3.mm.bing.net/th/id/OIP.kthyQJ-T1SgBI1q2ue_GygHaHa?pid=Api&P=0&h=180"
  },
  {
    id: 106,
    name: "Running Shoes",
    category: "Fitness",
    short_desc: "Comfort running shoes",
    long_desc: "Breathable running shoes for daily exercise.",
    price: 1474,
    image_url: "https://tse4.mm.bing.net/th/id/OIP.5Kcks9i4txw6-D8g72iGsQHaHa?pid=Api&P=0&h=180"
  },
  {
    id: 107,
    name: "Laptop Sleeve",
    category: "Accessories",
    short_desc: "Protective sleeve",
    long_desc: "Shock-proof and water-resistant laptop sleeve.",
    price: 450,
    image_url: "https://m.media-amazon.com/images/I/81pIqEZlyzL._AC_SL1400_.jpg"
  }
];

  async function load(page = 1) {
  try {
    const result = await fetchProducts({ search, category, page, limit: 6 });

    if (result?.data?.length > 0) {
      setData(result);
    } else {
      // If API returns empty, use fallback
      setData({
        data: fallbackProducts,
        page: 1,
        pages: 1
      });
    }
  } catch (err) {
    console.log("API error, loading fallback products:", err);

    setData({
      data: fallbackProducts,
      page: 1,
      pages: 1
    });
  }
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
