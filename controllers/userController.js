const User = require('../models/user');

exports.addUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) { 
      res.status(400).json({ error: "Validation Error: Email already exists" });
    } else {
      res.status(500).json({ error: "Server Error" });
    }
  }
};


exports.listUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

