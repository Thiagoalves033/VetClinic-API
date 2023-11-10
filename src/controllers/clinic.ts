import {Request, Response} from 'express'
import {Pet, Tutor} from '../models/clinic'

const getAllTutors = async (req: Request, res: Response) => {
    const tutors = await Tutor.find({})
    return res.status(200).json({nbHits: tutors.length, tutors})
}

const createTutor = async (req: Request, res: Response) => {
    const tutors = await Tutor.create(req.body)
    return res.status(200).json({tutors})
}

const updateTutor = async (req: Request, res: Response) => {
    const {id} = req.params
    const tutors = await Tutor.findOneAndUpdate({_id: id}, req.body, {
        new: true,
        runValidators: true,
    })

    if (!tutors) {
        return res.status(404).json({msg: `Could not find tutor with id ${id}`})
    }

    return res.status(200).json({updated: tutors})
}

const deleteTutor = async (req: Request, res: Response) => {
    const {id} = req.params
    const tutors = await Tutor.findOneAndDelete({_id: id})

    if (!tutors) {
        return res.status(400).json({msg: `Could not find tutor with id ${id}`})
    }

    return res.status(200).json({deleted: tutors})
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

    return res.status(200).json({tutor})
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

    return res.status(200).json({tutor})
}

const deletePet = async (req: Request, res: Response) => {
    const tutors = await console.log('Delete Pet')
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
