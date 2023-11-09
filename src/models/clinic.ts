import mongoose from "mongoose";

interface Pets {
    name: String,
    species: String,
    carry: String,
    weight: Number,
    date_of_birth: String,
}

const ClinicSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    date_of_birth: {type: String, required: true},
    zipCode: {type: String, required: true},
    pets: {type: Array<Pets>, default: {pets: 'None'}}
})

export = mongoose.model('Clinic', ClinicSchema)
