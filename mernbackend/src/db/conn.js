const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://devansh:devdev30@cluster0.nivlp.mongodb.net/test",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(() => {
    console.log(`connection successful`);
}).catch((e) => {
    console.log(`no connection`);
})
