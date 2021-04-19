const mongoose = require("mongoose");
const brypt = require("bcryptjs");
const regSchema = new mongoose.Schema({
    userid : {
        type:String,
        require:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        require:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword: {
        type:String,
        required:true
    }
})

regSchema.pre("save", async function(next) {
    if(this.isModified("password")){
        //const passwordHash = await bcrypt.hash(password, 10);
        this.password = await brypt.hash(this.password, 10);
        console.log(this.password);

        this.confirmpassword = undefined;

    }
    next();


} )

// collection
 const Register = new mongoose.model("Register",regSchema)

 module.exports = Register;