const express = require('express');
const cors = require('cors');
const { questionsRouter } = require('./routes/questions');   // <-- destructure
const { responsesRouter } = require('./routes/responses');   // <-- destructure

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, _res, next) => { console.log('[REQ]', req.method, req.url); next(); });
app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.use('/api/questions', questionsRouter);   // <-- now a real Router
app.use('/api/responses', responsesRouter);   // <-- now a real Router

app.use((req, res) => res.status(404).json({ message: 'Not found', path: req.url }));

const PORT = 5050;
app.listen(PORT, () => console.log(`API running on ${PORT}`));

