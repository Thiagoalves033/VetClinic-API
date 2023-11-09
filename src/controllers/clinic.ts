import {Request, Response} from 'express'
import Clinic from '../models/clinic'

const getAllTutors = async (req: Request, res: Response) => {
    const tutors = await Clinic.find({})
    return res.status(200).json({nbHits: tutors.length, tutors})
}

const createTutor = async (req: Request, res: Response) => {
    const tutors = await Clinic.create(req.body)
    return res.status(200).json({tutors})
}

const updateTutor = async (req: Request, res: Response) => {
    const {id} = req.params
    const tutors = await Clinic.findOneAndUpdate({_id: id}, req.body, {
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
    const tutors = await Clinic.findOneAndDelete({_id: id})

    if (!tutors) {
        return res.status(400).json({msg: `Could not find tutor with id ${id}`})
    }

    return res.status(200).json({deleted: tutors})
}

const createPet = async (req: Request, res: Response) => {
    const tutors = await console.log('Create Pet')
}

const updatePet = async (req: Request, res: Response) => {
    const tutors = await console.log('Update Pet')
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
