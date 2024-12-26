import React, { useState } from "react";
import axios from "axios";

function TransactionForm() {
  const [formData, setFormData] = useState({ receiver: "", amount: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/transactions", formData);
      setMessage("Transaction successful!");
    } catch (err) {
      setMessage("Transaction failed!");
    }
  };

  return (
    <div>
      <h3>Make a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="receiver"
          placeholder="Receiver UPI ID"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          onChange={handleChange}
          required
        />
        <button type="submit">Send</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default TransactionForm;
