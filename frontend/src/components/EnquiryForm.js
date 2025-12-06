import { useState } from "react";
import { sendEnquiry } from "../api";
import '../styles.css';
export default function EnquiryForm({ productId }) {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    message: "" 
  });

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await sendEnquiry({ product_id: productId, ...form });

    if (res.error) {
      alert("Validation failed: " + res.fields?.join(", "));
    } else {
      alert("Message sent!");
      setForm({ name: "", email: "", phone: "", message: "" });
    }
  }

  return (
    <form className="enquiry-form" onSubmit={handleSubmit}>
      <input
        name="name"
        type="text"
        placeholder="Your Name"
        required
        value={form.name}
        onChange={updateField}
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        value={form.email}
        onChange={updateField}
      />

      <input
        name="phone"
        type="text"
        placeholder="Phone"
        value={form.phone}
        onChange={updateField}
      />

      <textarea
        name="message"
        placeholder="Message"
        required
        value={form.message}
        onChange={updateField}
      />

      <button type="submit" className="send-btn">Send Enquiry</button>
    </form>
  );
}
