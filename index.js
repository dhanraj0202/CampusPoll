const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let polls = [
    {
        title: " Are you satisfied with the teaching staff and their teaching methods?",
        options: [
            "Extremely satisfied",
            "Very satisfied",
            "Satisfied",
            "Neutral",
            "Dissatisfied",
            "Very dissatisfied",
            "Extremely dissatisfied",
        ]
    },
    {
        title: " How satisfied are you with the facilities provided by the college?",
        options: [
            "Extremely satisfied",
            "Very satisfied",
            "Satisfied",
            "Neutral",
            "Dissatisfied",
            "Very dissatisfied",
            "Extremely dissatisfied",
        ]
    },
    {
        title: " Do you feel it is easier to register for different courses within the college?",
        options: [
            "Extremely satisfied",
            "Very satisfied",
            "Satisfied",
            "Neutral",
            "Dissatisfied",
            "Very dissatisfied",
            "Extremely dissatisfied",
        ]
    },
    {
        title: " How satisfied are you with the cleanliness and variety of food items available in the cafeteria?",
        options: [
            "Extremely satisfied",
            "Very satisfied",
            "Satisfied",
            "Neutral",
            "Dissatisfied",
            "Very dissatisfied",
            "Extremely dissatisfied",
        ]
    }
]

app.get('/', (req, res) => {
    res.render('home.ejs', { polls });
})

app.get('/posts/login', (req, res) => {
    res.render("login.ejs")
})

app.get('/posts/new', (req, res) => {
    res.render("new.ejs")
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
