const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');
// const methodOverride = require("method-override");
const collection = require("./config");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");


app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let polls = [
    {
        id: uuidv4(),
        title: " Are you satisfied with the teaching staff and their teaching methods?",
        options: [
            "Extremely satisfied",
            "Very satisfied",
            "Satisfied",
            "Neutral",
            "Dissatisfied",
            "Very dissatisfied",
            "Extremely dissatisfied",
        ],
    },
    {
        id: uuidv4(),
        title: " How satisfied are you with the facilities provided by the college?",
        options: [
            "Extremely satisfied",
            "Very satisfied",
            "Satisfied",
            "Neutral",
            "Dissatisfied",
            "Very dissatisfied",
            "Extremely dissatisfied",
        ],
    },
    {
        id: uuidv4(),
        title: " Do you feel it is easier to register for different courses within the college?",
        options: [
            "Extremely satisfied",
            "Very satisfied",
            "Satisfied",
            "Neutral",
            "Dissatisfied",
            "Very dissatisfied",
            "Extremely dissatisfied",
        ],
    },
    {
        id: uuidv4(),
        title: " How satisfied are you with the cleanliness and variety of food items available in the cafeteria?",
        options: [
            "Extremely satisfied",
            "Very satisfied",
            "Satisfied",
            "Neutral",
            "Dissatisfied",
            "Very dissatisfied",
            "forcefully",
        ],
    }
]

app.get('/', (req, res) => {
    res.render('home.ejs', { polls });
})

app.get('/login', (req, res) => {
    res.render("login")
})

app.get('/signup', (req, res) => {
    res.render("signup")
})

app.get('/polls/new', (req, res) => {
    res.render("new")
})

// signup user
app.post('/signup', async (req, res) => {

    const data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    // if user already exists
    const existingUser = await collection.findOne({ username: data.username });
    
    if (existingUser) {
        res.send("User already exists. Please choose a different username");
    }
    else {
        // hashing the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;

        // inserting to database
        const userData = await collection.insertMany(data);
        console.log(userData);
        res.redirect("/");
    }


});

// login user
app.post("/login", async (req,res) => {
    try{
        const check = await collection.findOne({email: req.body.email});
        if (!check) {
            res.send("email cannot found");
        }

        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password)
        if (isPasswordMatch) {
            res.redirect("/");
        }else{
            req.send("wrong password");
        }
    }catch{
        res.send("wrong details");
    }
});

app.post('/', (req, res) => {
    console.log(req.body);
    let { title, options } = req.body;
    let id = uuidv4();
    polls.push({ id, title, options });
    res.redirect("/")
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
