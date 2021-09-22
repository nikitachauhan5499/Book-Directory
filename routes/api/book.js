const express = require('express');
const router = express.Router();

// Load book model
const Book = require('../../models/Book');

// @route GET api/books/test
// @description tests books route
// @access Public
router.get('/test', (req, res) => {
    res.send('Book route testing!');
});

// @route GET api/books
// @description get all books
// @access Public
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        res.status(404);
        res.json({nobooksfound: 'No Books found'});
    }
});

// @route GET api/books/:id
// @description get single book by id
// @access Public
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        res.json(book);
    } catch (error) {
        res.status(404);
        res.json({ nobookfound: 'No Book Found' });
    }
});

// @route POST api/books
// @description add or save book
// @access Public
router.post('/', async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.json({book: book, msg: 'Book added successfully'});
    } catch (error) {
        res.status(400);
        res.json({
            error: 'Unable to add this book'
        })
    }
    
});

// @route PUT api/books/:id
// @description update book
// @access Public
router.put('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            msg: 'Updated Successfully'
        })
    } catch (error) {
        res.status(400);
        res.json({
            error: 'Unable to update the Database'
        })
    }
});

// @route PUT api/books/:id
// @description delete book
// @access Public
router.delete('/:id', async (req, res) => {
    try {
        const book = await Book.findByIdAndRemove(req.params.id, req.body);
        res.json({msg: 'Book entry deleted successfully'});
    } catch (error) {
        res.status(404);
        res.json({error: 'No such book'})
    }
});

module.exports = router;