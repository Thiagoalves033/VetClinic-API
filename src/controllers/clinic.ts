import {Request, Response} from 'express'
import {Pet, Tutor} from '../models/clinic'

interface Queries {
    name?: {$regex: string, $options: 'i'};
    phone?: {$regex: string};
    email?: {$regex: string, $options: 'i'};
    date_of_birth?: {$regex: string};
    zipCode?: {$regex: string};
}

const getAllTutors = async (req: Request, res: Response) => {
    const {name, phone, email, date_of_birth, zipCode, sort, fields} = req.query

    const queryObject: Queries = {}

    if(name) {
        queryObject.name = {$regex: name as string, $options: 'i'}
    }

    if(phone) {
        queryObject.phone = {$regex: phone as string}
    }

    if(email) {
        queryObject.email = {$regex: email as string, $options: 'i'}
    }

    if(date_of_birth) {
        queryObject.date_of_birth = {$regex: date_of_birth as string}
    }

    if(zipCode) {
        queryObject.zipCode = {$regex: zipCode as string}
    }

    let result = Tutor.find(queryObject)

    if(sort) {
        const sortList = (sort as string).split(',').join(' ')
        result = result.sort(sortList)
    }
    else {
        result = result.sort('name')
    }

    if(fields) {
        const fieldsList = (fields as string).split(',').join(' ')
        result = result.select(fieldsList)
    }

    const page = +(req.query.page!) || 1
    const limit = +(req.query.limit!) || 5
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const tutors = await result

    return res.status(200).json({nbHits: tutors.length, tutors})
}

const createTutor = async (req: Request, res: Response) => {
    const tutor = await Tutor.create(req.body)

    if (tutor.pets.length > 0) {
        for (const pet of tutor.pets) {
            
            const newPet = new Pet({
                _id: pet._id,
                name: pet.name,
                species: pet.species,
                carry: pet.carry,
                weight: pet.weight,
                date_of_birth: pet.date_of_birth
            });

            await newPet.save();
        }
    }

    return res.status(201).json({msg: `Tutor created`, tutor})
}

const updateTutor = async (req: Request, res: Response) => {
    const {id: tutorId} = req.params
    const tutor = await Tutor.findOneAndUpdate({_id: tutorId}, req.body, {
        new: true,
        runValidators: true,
    })

    if (!tutor) {
        return res.status(404).json({msg: `Could not find tutor with id ${tutorId}`})
    }

    return res.status(200).json({msg: `Tutor with id ${tutorId} updated`, tutor})
}

const deleteTutor = async (req: Request, res: Response) => {
    const {id: tutorId} = req.params
    const tutor = await Tutor.findOneAndDelete({_id: tutorId})

    if (!tutor) {
        return res.status(404).json({msg: `Could not find tutor with id ${tutorId}`})
    }

    return res.status(200).json({msg: `Tutor with id ${tutorId} deleted`})
}

const createPet = async (req: Request, res: Response) => {
    const {tutorId} = req.params
    const tutor = await Tutor.findOne({_id: tutorId})

    if(!tutor) {
        return res.status(404).json({msg: `Could not find tutor with id ${tutorId}`})
    }

    const newPet = await Pet.create(req.body)

    tutor.pets.push(newPet)

    await tutor.save()

    return res.status(201).json({msg: `Pet created`, tutor})
}

const updatePet = async (req: Request, res: Response) => {
    const {petId, tutorId} = req.params

    const tutor = await Tutor.findOne({_id: tutorId})

    if(!tutor) {
        return res.status(404).json({msg: `Could not find tutor with id ${tutorId}`})
    }

    const petIndex = tutor.pets.findIndex((pet) => pet._id.toString() === petId)

    if(petIndex === -1) {
        return res.status(404).json({msg: `Pet with id ${petId} does not belong to this tutor`})
    }

    const updatedPet = await Pet.findByIdAndUpdate(petId, req.body, {
        new: true,
        runValidators: true,
    })

    tutor.pets[petIndex] = updatedPet!

    await tutor.save()

    return res.status(200).json({msg: `Pet with id ${petId} updated`, tutor})
}

const deletePet = async (req: Request, res: Response) => {
    const {petId, tutorId} = req.params

    const tutor = await Tutor.findOne({_id: tutorId})

    if(!tutor) {
        return res.status(404).json({msg: `Could not find tutor with id ${tutorId}`})
    }

    const petIndex = tutor.pets.findIndex((pet) => pet._id.toString() === petId)
    
    
    if(petIndex === -1) {
        return res.status(404).json({msg: `Pet with id ${petId} does not belong to this tutor`})
    }

    await Pet.findByIdAndDelete({_id: petId})

    tutor.pets.splice(petIndex, 1)

    await tutor.save()

    return res.status(200).json({msg: `Pet with id ${petId} deleted`, tutor})
}

export {
    getAllTutors,
    createTutor,
    updateTutor,
    deleteTutor,
    createPet,
    updatePet,
    deletePet
} 
