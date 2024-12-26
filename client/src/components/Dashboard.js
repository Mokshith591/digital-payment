import React from "react";
import { useAuth } from "../context/AuthContext";
import TransactionForm from "./TransactionForm";
import axios from "axios";
import { useState, useEffect } from "react";

function Dashboard() {
  const { user, logout } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/transactions").then((res) => setTransactions(res.data));
  }, []);

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.username}</h2>
      <p>Balance: ₹{user?.balance}</p>
      <p>UPI ID: {user?.upiId}</p>
      <button onClick={logout}>Logout</button>

      <TransactionForm />

      <h3>Transaction History</h3>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            Sent ₹{transaction.amount} to {transaction.receiver} on{" "}
            {new Date(transaction.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
