const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
// declare port

dotenv.config();
const port = process.env.PORT || 3000;
app.use(express.json());

// setup the database
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("coonected to database!");
});



// connect the user router
const userRouter = require("./routes/user");
app.use('/user', userRouter);

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`)
});