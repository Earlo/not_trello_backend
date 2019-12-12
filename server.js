const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const columnsRouter = require('./routes/columns');
const usersRouter = require('./routes/users');

app.use('/columns', columnsRouter);
app.use('/users', usersRouter);


const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
