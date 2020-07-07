const express = require('express')

const { getExam, getExams, deleteExam, updateExam, addExam } = require('./exam.controller')
const router = express.Router()

router.get('/', getExams)
router.get('/:id', getExam)
router.post('/', addExam)
router.put('/:id', updateExam)
router.delete('/:id', deleteExam)

module.exports = router