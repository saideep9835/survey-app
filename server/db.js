const sqlite3 = require('sqlite3').verbose()
const path = require('path');
const fs = require('fs');

const DB_PATH = path.join(process.cwd(), 'server', 'db.sqlite');
if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, '');

const db = new sqlite3.Database(DB_PATH);

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        type TEXT NOT NULL)`);

    db.run(`CREATE TABLE IF NOT EXISTS responses (
        id  INTEGER PRIMARY KEY AUTOINCREMENT,
        createdAt TEXT NOT NULL DEFAULT (datetime('now')))`);
    
    db.run(`CREATE TABLE IF NOT EXISTS response_items(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            responseId  INTEGER NOT NULL,
            questionId INTEGER NOT NULL,
            value TEXT NOT NULL,
            FOREIGN KEY(responseId) REFERENCES responses(id),
            FOREIGN KEY(questionId) REFERENCES questions(id))`);
    db.get('SELECT COUNT(*) as c FROM questions', (err, row) => {
        if (err) return;
        if (row && row.c === 0) {
            const stmt = db.prepare('INSERT INTO questions (title, description, type) VALUES (?, ?, ?)');
            stmt.run('Full name', 'Enter your legal name as it appears on the offical document', 'text');
            stmt.run('Age', 'Enter your age in years', 'number');
            stmt.run('Email Address', 'We will use this to send a cofirmation.', 'email');
            stmt.run('Description', 'Tell us anything else you did like us to know', 'textarea');
        }
    })
})

module.exports = { db }