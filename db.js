const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connectDb = async ()=>{
    try{
        //mongo DB connection to the server 
        const con = await mongoose.connect(process.env.MONGO_URI)
        if (con)
            console.log("mongoDb connected successfully");
        else 
            console.log("mongodb not connected, try again");
    }catch (err) {
        console.log(err);
        process.exit();
    }

}
module.exports = connectDb