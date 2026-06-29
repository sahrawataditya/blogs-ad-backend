import mongoose from "mongoose";

const dbString = process.env.MONGO_DB_URI;
async function connectDB() {
    try {
        mongoose.connect(dbString).then(() => {
            console.log("Db connected success")
        }).catch((err) => {
            console.log(err)
        })

    } catch (error) {
        console.error(error || "Something went wrong !")
    }
};

export default connectDB;