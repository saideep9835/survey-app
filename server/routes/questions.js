const { Router } = require('express')
const { db } = require('../db')
const questionsRouter = Router();

questionsRouter.get('/', (_req, res) => {
    db.all('SELECT id, title, description, type FROM questions ORDER BY id ASC', (err, rows) => {
        if (err) return res.status(500).json({message: 'db error'})
        res.json(rows)
    });
});
module.exports = { questionsRouter }
