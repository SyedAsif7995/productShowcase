import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProductDetails from "./components/ProductDetails";
import ProductEnquiriesPage from "./components/ProductEnquiriesPage";
import ProductList from "./components/ProductList";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product/:id/enquiries" element={<ProductEnquiriesPage />} />
      </Routes>
    </BrowserRouter>
  );
}
