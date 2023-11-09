import mongoose, {Document} from "mongoose";

interface Pets {
    name: string;
    species: string;
    carry: string;
    weight: number;
    date_of_birth: string;
}

interface Tutors extends Document {
    name: string;
    phone: string;
    email: string;
    date_of_birth: string;
    zipCode: string;
    pets: Pets[];
}

const PetSchema = new mongoose.Schema<Pets>({
    name: {type: String, required: true},
    species: {type: String, required: true},
    carry: {type: String, required: true},
    weight: {type: Number, required: true},
    date_of_birth: {type: String, required: true},
})

const Pet = mongoose.model('Pet', PetSchema)

const TutorSchema = new mongoose.Schema<Tutors>({
    name: {type: String, required: true},
    phone: {type: String, required: true, minlength: 11, maxlength: 11},
    email: {type: String, required: true},
    date_of_birth: {type: String, required: true},
    zipCode: {type: String, required: true, minlength: 8, maxlength: 8},
    pets: {type: [PetSchema], default: []}
})

const Tutor = mongoose.model('Tutor', TutorSchema)

export {
    Pet,
    Tutor,
}
