import mongoose from "mongoose"

const MySchema = new mongoose.Schema({
    name : {type: String, required: true}, //name is required
    email: {type: String, required: true, unique: true}, //email is required and must be unique
    password: {type: String, required: true}, //password is required
    createdAt: {type: Date, default: Date.now} //default value is current date
})

// Create a model using the schema
const MyModel = mongoose.model("MyModel", MySchema)

//exporting the model
export default MyModel