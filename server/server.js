const express= require('express');
const app = express();
const fs = require('fs');
const handler = require('./handler');
const uphandler = require('./handler2');

app.use(express.json());
app.use('/', express.static('public'));

app.get('/api/tasks', (req, res) => {
    uphandler(req, res, 'server/db/tasks.json');
});
app.get('/api/history', (req, res) => {
    uphandler(req, res, 'server/db/history.json');
});
app.post('/api/tasks', (req, res) => {
    handler(req, res, 'add', 'server/db/tasks.json');
});
app.post('/api/history', (req, res) => {
    handler(req, res, 'add', 'server/db/history.json');
});
app.delete('/api/tasks', (req, res) => {
    handler(req, res, 'del', 'server/db/tasks.json');
});
app.delete('/api/history', (req, res) => {
    handler(req, res, 'del', 'server/db/history.json');
});
app.put('/api/tasks/:id', (req, res) => {
    handler(req, res, 'change', 'server/db/tasks.json');
});



const setport = process.env.PORT || 3000;
app.listen(setport, () => console.log(`Listen on port ${setport}...`));