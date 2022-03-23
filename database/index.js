const mongoose = require("mongoose");

const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        console.log('Conectado a MondoDB');
    }catch (error) {
        console.log("Error de conexión: ", error);
        process.exit(1);
    }
};

module.exports = connectDb;