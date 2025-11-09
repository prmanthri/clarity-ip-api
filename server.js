// server.js

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/data', (req, res) => {
  console.log('GET /data called');
   const sampleData = [
    { id: 1, name: 'Alice', score: 85 },
    { id: 2, name: 'Bob', score: 92 },
    { id: 3, name: 'Charlie', score: 78 }
  ];
  res.json(sampleData);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});