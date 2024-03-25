const express = require('express');
const router = express.Router();
const Book = require('../models/books.model');

//MIDDLEWARE
const getBook = async (req, res, next) => {
    let book;
    const { id } = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({
            message: 'El ID del libro no es válido'
        })
    }

    try{
        book = await Book.findById(id);
        if(!book){
            return res.status(404).json({
                message: 'El libro no fue encontrado'
            })
        }

    }catch(error){
        return res.status(500).json({
            message: error.message
        })
    }

    res.book = book;
    next();
}

//Obtener todos los libros [GET ALL]
router.get('/', async (req, res) => {
    try{
        const books = await Book.find();
        console.log('Get all: ', books);
        if(books.length === 0){
            return res.status(204).json([]);
        }
        res.json(books);
    }catch(error){
        res.status(500).json({ message: error.message })
    }
});

//Crear nuevo libro (reurso) [POST]

router.post('/', async (req, res) => {
    const { title, author, genre, publication_date, original_language } = req?.body;
    if(!title || !author || !genre || !publication_date || !original_language){
        return res.status(400).json({
            message: 'Los campos \'title\', \'author\', \'genre\', \'publication_date\' y \'original_language\' son obligatorios.'
        });
    }

    const book = new Book({
        title,
        author,
        genre,
        publication_date,
        original_language
    })

    try{
        const newBook = await book.save();
        console.log(newBook);
        res.status(201).json(newBook);
    }catch(error){
        res.status(400).json({
            message: error.message
        })
    }
});

//Obtener un libro individual
router.get('/:id', getBook, async (req, res) => {
    res.json(res.book);
});

//Método PUT
router.put('/:id', getBook, async (req, res) => {
    try{
        const book = res.book;
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.genre = req.body.genre || book.genre;
        book.publication_date = req.body.publication_date || book.publication_date;
        book.original_language = req.body.original_language || book.original_language;

        const updatedBook = await book.save();
        res.json(updatedBook);

    }catch(error){
        res.status(400).json({
            message: error.message
        })
    }
});

//Método PATCH
router.patch('/:id', getBook, async (req, res) => {

    if(!title || !author || !genre || !publication_date || !original_language){
        return res.status(400).json({
            message: 'Al menos uno de los campos (\'title\', \'author\', \'genre\', \'publication_date\' y \'original_language\') es obligatorio.'
        });
    }

    try{
        const book = res.book;
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.genre = req.body.genre || book.genre;
        book.publication_date = req.body.publication_date || book.publication_date;
        book.original_language = req.body.original_language || book.original_language;

        const updatedBook = await book.save();
        res.json(updatedBook);

    }catch(error){
        res.status(400).json({
            message: error.message
        })
    }
});

//Método DELETE
router.delete('/:id', getBook, async (req, res) => {
    try{
        const book = res.book;
        await book.deleteOne({
            _id: book._id
        });
        res.json({
            message: `El libro ${book.title} ha sido eliminado`
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
});

module.exports = router;