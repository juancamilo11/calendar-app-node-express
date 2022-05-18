const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI
            // , {}   // Database connection props TODO
        );
        console.log("Db connection successful")
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connectToDatabase
}