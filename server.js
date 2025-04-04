// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: ['https://blockza-events-frontend.netlify.app', 'http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943', 'http://localhost:3000', 'http://127.0.0.1:4943', 'https://lkj7b-gyaaa-aaaal-qskmq-cai.icp0.io', 'http://127.0.0.1:4943', 'http://localhost:4943', 
 ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("API is running...");
  });

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/directory', require('./routes/companyRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});