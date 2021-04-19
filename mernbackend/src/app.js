const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");

const Resgister = require("./models/registers.js");
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates//views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index")
});
app.get("/register", (req, res) => {
    res.render("index")
});
app.get("/login", (req, res) => {
    res.render("index")
});
app.post("/register", async (req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {

            const registerUser = new Resgister({
                userid: req.body.userid,
                email: req.body.email,
                phone: req.body.phone,
                password: password,
                confirmpassword: cpassword
            })



            const registered = await registerUser.save();
            res.status(201).render("index");

        } else {
            res.send("password are not matching")
        }

    } catch (error) {
        res.status(400).send(error);
    }

})
//login check
app.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const useremail = await Resgister.findOne({ email: email });

        if (useremail.password === password) {
            res.status(201).render("home");
        } else {
            res.render("login");
            alert("incorrect password");
        }


    } catch (error) {
        res.status(400).send("invalid email")
    }


})
//const bcrypt = require("bcryptjs");
//const securePassword = async (password) =>{
//   const passwordHash = await bcrypt.hash(password, 10);
//    console.log(passwordHash);

//   const passwordmatch = await bcrypt.compare("devr@123", passwordHash);
//   console.log(passwordmatch);


//}
//securePassword("devr@123");







app.listen(port, () => {
    console.log(`server runing at port no ${port}`);
})