const logger = require('../../services/logger.service')
const examService = require('./exam.service')

async function addExam(req, res) {
    let exam = req.body
    exam = await examService.add(exam)
    res.send(exam)
}

async function getExam(req, res) {
    const exam = await examService.getById(req.params.id)
    res.send(exam)
}

async function getExams(req, res) {
    const exams = await examService.query(req.query)
    logger.debug(exams);
    res.send(exams)
}

async function deleteExam(req, res) {
    await examService.remove(req.params.id)
    res.end()
}

async function updateExam(req, res) {
    const exam = req.body;
    await examService.update(exam)
    res.send(exam)
}

module.exports = {
    getExam,
    getExams,
    deleteExam,
    updateExam,
    addExam
}