//Mongoose es un modelador para MongoDB
//Nos ayuda a diseñar el esquema que usaremos (podemos tener más de un modelo)

const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title: String,
        author: String,
        genre: String,
        publication_date: String,
        original_language: String
    }
);

module.exports = mongoose.model('Book', bookSchema);