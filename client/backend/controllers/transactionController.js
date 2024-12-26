const Transaction = require("../models/Transaction");
const User = require("../models/User");

exports.createTransaction = async (req, res) => {
  const { receiver, amount } = req.body;
  try {
    const sender = await User.findById(req.user.id);
    if (sender.balance < amount) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    const transaction = await Transaction.create({
      sender: sender.upiId,
      receiver,
      amount,
    });

    sender.balance -= amount;
    await sender.save();

    const receiverUser = await User.findOne({ upiId: receiver });
    if (receiverUser) {
      receiverUser.balance += amount;
      await receiverUser.save();
    }

    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ sender: req.user.upiId });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
