const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

app.get('/api/data', (req, res) => {
  const results = {};
  fs.createReadStream(path.join(__dirname, 'data', 'metrics.csv'))
    .pipe(csv())
    .on('data', (row) => {
      const date = new Date(row['Date Commence']);
      const start = new Date('2020-01-01');
      const end = new Date('2025-11-30');
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