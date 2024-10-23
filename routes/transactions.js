// routes/transactions.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// Add a new transaction
router.post('/transactions', (req, res) => {
  const { type, category, amount, date, description } = req.body;
  if (!type || !category || !amount || !date) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  db.run(
    `INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`,
    [type, category, amount, date, description],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
});

// Get all transactions
router.get('/transactions', (req, res) => {
  db.all(`SELECT * FROM transactions`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(rows);
  });
});

// Get transaction by ID
router.get('/transactions/:id', (req, res) => {
  db.get(`SELECT * FROM transactions WHERE id = ?`, [req.params.id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json(row);
  });
});

// Update transaction
router.put('/transactions/:id', (req, res) => {
  const { type, category, amount, date, description } = req.body;
  if (!type || !category || !amount || !date) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  db.run(
    `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`,
    [type, category, amount, date, description, req.params.id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      res.status(200).json({ message: 'Transaction updated' });
    }
  );
});

// Delete transaction
router.delete('/transactions/:id', (req, res) => {
  db.run(`DELETE FROM transactions WHERE id = ?`, [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    res.status(200).json({ message: 'Transaction deleted' });
  });
});

// Get summary of income and expenses
router.get('/summary', (req, res) => {
  db.all(
    `SELECT type, SUM(amount) AS total FROM transactions GROUP BY type`,
    [],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const summary = rows.reduce(
        (acc, row) => {
          if (row.type === 'income') acc.income += row.total;
          if (row.type === 'expense') acc.expense += row.total;
          acc.balance = acc.income - acc.expense;
          return acc;
        },
        { income: 0, expense: 0, balance: 0 }
      );
      res.status(200).json(summary);
    }
  );
});

module.exports = router;