const express = require('express');
const connectDB = require('./config/db');
const books = require('./routes/api/book')

const app = express();

connectDB();

app.get('/', (req, res) => {
    res.send('<h1>Starter Code</h1>')
});

app.use('/api/books', books);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})