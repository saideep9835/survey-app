const { Router } = require('express');
const { db } = require('../db');

const responsesRouter = Router();

responsesRouter.post('/', (req, res) => {
  const map = req.body?.responses;
  if (!map || typeof map !== 'object') return res.status(400).json({ message: 'Invalid payload' });
  db.run('BEGIN TRANSACTION');
  db.run('INSERT INTO responses DEFAULT VALUES', function (err) {
    if (err) { db.run('ROLLBACK'); return res.status(500).json({ message: 'db error' }); }
    const responseId = this.lastID;
    const stmt = db.prepare('INSERT INTO response_items (responseId, questionId, value) VALUES (?, ?, ?)');
    for (const [qid, value] of Object.entries(map)) stmt.run(responseId, Number(qid), String(value));
    stmt.finalize(err2 => {
      if (err2) { db.run('ROLLBACK'); return res.status(500).json({ message: 'db error' }); }
      db.run('COMMIT');
      res.status(201).json({ id: responseId });
    });
  });
});

responsesRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  db.get('SELECT id, createdAt FROM responses WHERE id = ?', [id], (err, responseRow) => {
    if (err) return res.status(500).json({ message: 'db error' });
    if (!responseRow) return res.status(404).json({ message: 'Not found' });
    const sql = `
      SELECT ri.questionId, q.title, ri.value
      FROM response_items ri
      JOIN questions q ON q.id = ri.questionId
      WHERE ri.responseId = ?
      ORDER BY ri.id ASC
    `;
    db.all(sql, [id], (err2, items) => {
      if (err2) return res.status(500).json({ message: 'db error' });
      res.json({ id: responseRow.id, createdAt: responseRow.createdAt, items });
    });
  });
});

module.exports = { responsesRouter };  
