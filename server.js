const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Serve frontend files
app.use(express.static(__dirname));

// MongoDB Atlas connection
const uri = "mongodb+srv://subratap6060_db_user:DIQMuweCZAKPS7pY@cluster0.zeiczov.mongodb.net/myData";
mongoose.connect(uri)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Schema & Model
const userSchema = new mongoose.Schema({
  name: String,
  age: Number
}, { collection: 'myData' });

const User = mongoose.model('User', userSchema);

// Save data
app.post('/api/save', async (req, res) => {
  try {
    const { name, age } = req.body;
    const newUser = new User({ name, age });
    await newUser.save();
    res.json({ message: "Data saved to MongoDB Atlas!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save data" });
  }
});

// Search data
app.get('/api/search', async (req, res) => {
  try {
    const { name } = req.query;
    const result = await User.find({ name: new RegExp(`^${name}$`, 'i') });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to search data" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
