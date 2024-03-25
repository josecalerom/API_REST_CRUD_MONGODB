const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { config } = require('dotenv');
config();

const bookRoutes = require('./routes/books.routes');

//Usamos express para los middlewares
const app = express();

//Parseador de bodys
app.use(bodyParser.json());

//Conectaremos la base de datos de Mongo
mongoose.connect(process.env.MONGO_URL, { dbName: process.env.MONGO_DB_NAME });
const db = mongoose.connection;

app.use('/books', bookRoutes);

const PORT = process.env.PORT || 300;

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}/`);
});