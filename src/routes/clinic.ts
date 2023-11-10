import express from 'express';
import {
    getAllTutors,
    createTutor,
    updateTutor,
    deleteTutor,
    createPet,
    updatePet,
    deletePet,
} from '../controllers/clinic'

const router = express.Router()

router.route('/').get(getAllTutors)
router.route('/').post(createTutor)
router.route('/:id').put(updateTutor).delete(deleteTutor)
router.route('/:tutorId').post(createPet)
router.route('/:petId/tutor/:tutorId').put(updatePet).delete(deletePet)

export = router
