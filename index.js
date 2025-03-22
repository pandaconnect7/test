const express = require('express');
// const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose= require('mongoose');
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const userRouter = require('./routes/userRouter');
const renterRouter = require('./routes/renterRoute');

const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB database"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.use('/user', userRouter);
app.use('/renter', renterRouter);

app.use('/',(req,res)=>{

    res.send("test the website")
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
