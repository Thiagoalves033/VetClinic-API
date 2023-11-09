import {Request, Response} from 'express'
import Clinic from '../models/clinic'

const getAllTutors = async (req: Request, res: Response) => {
    const tutors = await Clinic.find({})
    return res.status(200).json({tutors})
}

const createTutor = async (req: Request, res: Response) => {
    const tutors = await Clinic.create(req.body)
    return res.status(200).json({tutors})
}

const updateTutor = async (req: Request, res: Response) => {
    const tutors = await console.log('Update tutor')
}

const deleteTutor = async (req: Request, res: Response) => {
    const tutors = await console.log('Delete tutor')
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
