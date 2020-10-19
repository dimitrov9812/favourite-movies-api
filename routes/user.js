const express = require("express");
const router = express.Router();
const User = require("../model/userModel");
const { loginValidationSchema, registerValidationSchema } = require('../validation/validaiton');
const bcrypt = require("bcryptjs");

// get a list of all the users
router.get('/users', async (req,res) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (err) {
        res.send.err;
    }
});

// login
router.post("/login", async (req, res) => {
    // validate the user input
    const validatedUser = loginValidationSchema.validate(req.body);
    // check if any errors during validation
    if (validatedUser.error) return res.json(validatedUser.error.details[0].message);

    // check if the email exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (!emailExists) return res.send("Email does not exists!")

    // compare the password to the database hashed one
    const comparePassword = await bcrypt.compare(req.body.password, emailExists.password)
    if (!comparePassword) return res.send("Password is incorrect");

    res.send({message:"Logged in successfully", user: emailExists});
});

// register
router.post("/register", async (req, res) => {
    // validate the user input
    const validatedUser = registerValidationSchema.validate(req.body);
    // check if any errors during validation
    if (validatedUser.error) return res.send(validatedUser.error.details[0].message);

    // check if email exists
    const emailExists = await User.findOne({email: req.body.email});
    if (emailExists) return res.send("Email already exists!")

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    // create new user object
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });

    // save the user to the datababase
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.send({ message: err.message});
    }
});

router.post("/delete/database/delete/deleteDB", async (req, res) => {
    // detele the database
    const deleteDB = await User.deleteMany({});
    if (deleteDB) return res.json({ message: "Deleted database"})
})

module.exports = router;