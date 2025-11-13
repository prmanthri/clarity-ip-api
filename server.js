const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.get('/api/data', (req, res) => {
  const results = {};
  const start = new Date('2020-01-01');
  const end = new Date('2025-11-30');

  fs.createReadStream(path.join(__dirname, 'data', 'metrics.csv'))
    .pipe(csv())
    .on('data', (row) => {
      const date = new Date(row['Date Commence']);
      if (date >= start && date <= end) {
        const country = row.Country;
        const count = parseInt(row.Licences);
        results[country] = (results[country] || 0) + count;
      }
    })
    .on('end', () => {
      const formatted = Object.entries(results).map(([country, amount]) => ({
        label: country,
        amount
      }));
      res.json(formatted);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});