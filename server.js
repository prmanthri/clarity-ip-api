// server.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

const allowedOrigins = [
  'http://localhost:3000',
  'https://clarity-ip-pilot.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/api/data', (req, res) => {
  res.json([
    { label: 'Jan', amount: 120 },
    { label: 'Feb', amount: 150 },
    { label: 'Mar', amount: 90 },
    { label: 'Apr', amount: 180 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});