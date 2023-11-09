import express from 'express';

const router = express.Router()

// Controller functions go here

router.route('/tutors').get()
router.route('/tutor').post()
router.route('/tutor/:id').put().delete()
router.route('/pet/:tutorId').post()
router.route('/pet/:petId/tutor/:tutorId').put().delete()

export = router