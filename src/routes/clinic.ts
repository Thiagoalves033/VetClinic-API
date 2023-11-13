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

router.route('/tutors').get(getAllTutors)
router.route('/tutor').post(createTutor)
router.route('/tutor/:id').put(updateTutor).delete(deleteTutor)
router.route('/pet/:tutorId').post(createPet)
router.route('/pet/:petId/tutor/:tutorId').put(updatePet).delete(deletePet)

export = router
