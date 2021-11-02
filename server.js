const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const user = require('./routes/auth')
const blog = require('./routes/blog')
const comment=require('./routes/comment')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 7000;



app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB connected");
})


app.use('/api/user', user)
app.use('/api/blog', blog)
app.use('/api/comment',comment)

app.listen(port, () => {
    console.log(`Server is running on: ${port}`);
})