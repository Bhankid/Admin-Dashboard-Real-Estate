const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/realestate");
// mongoose.connect("mongodb://localhost:27017/realestate", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Schema and Model
const itemSchema = new mongoose.Schema({
  description: String,
  imagePath: String,
});
const Item = mongoose.model("Item", itemSchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// API endpoint for uploading
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const newItem = new Item({
        description: req.body.description,
        location: req.body.location,
        price: req.body.price,
      imagePath: req.file.path,
    });
    await newItem.save();
    res.status(201).json({ message: "Item uploaded successfully!" });
  } catch (error) {
    console.error("Error saving item:", error);
    res.status(500).json({ message: "Failed to upload item." });
  }
});

const path = require("path");


// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
