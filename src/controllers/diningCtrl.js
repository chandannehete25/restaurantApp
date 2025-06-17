// controllers/diningController.js
const Table = require('../models/tableModel');

exports.showTables = (req, res) => {
  Promise.all([Table.getAvailable(), Table.getOccupied()])
    .then(([availableTables, occupiedTables]) => {
      // success: render the view with both datasets
      res.render('tables', { availableTables, occupiedTables });
    })
    .catch(err => {
      // any DB / query error ends up here
      console.error('Dining controller error:', err);
      res.status(500).send('Server error');
    });
};
