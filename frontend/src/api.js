const API = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API}/products?${query}`);
  return res.json();
}

export async function fetchProduct(id) {
  const res = await fetch(`${API}/products/${id}`);
  return res.json();
}
export async function fetchEnquiriesByProduct(productId) {
  const res = await fetch(`${API}/enquiries/product/${productId}`);
  return res.json();
}


export async function sendEnquiry(body) {
  const res = await fetch(`${API}/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });

  return res.json();
}
