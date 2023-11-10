import {Request, Response} from 'express'
import {Pet, Tutor} from '../models/clinic'

const getAllTutors = async (req: Request, res: Response) => {
    const tutors = await Tutor.find({})
    return res.status(200).json({nbHits: tutors.length, tutors})
}

const createTutor = async (req: Request, res: Response) => {
    const tutor = await Tutor.create(req.body)
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
