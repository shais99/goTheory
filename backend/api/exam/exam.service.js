
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const COLLECTION_NAME = 'exam'

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        const exams = await collection.find({ 'user._id': filterBy.userId }).sort({ 'finishedAt': -1 }).toArray();
        return exams
    } catch (err) {
        console.log('ERROR: cannot find exams')
        throw err;
    }
}

async function getById(examId) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        const exam = await collection.findOne({ '_id': ObjectId(examId) })
        return exam
    } catch (err) {
        console.log(`ERROR: while finding exam ${examId}`)
        throw err;
    }
}

async function remove(examId) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        await collection.deleteOne({ "_id": ObjectId(examId) })
    } catch (err) {
        console.log(`ERROR: cannot remove exam ${examId}`)
        throw err;
    }
}

async function update(exam) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    exam._id = ObjectId(exam._id);

    try {
        await collection.replaceOne({ "_id": exam._id }, { $set: exam })
        return exam
    } catch (err) {
        console.log(`ERROR: cannot update exam ${exam._id}`)
        throw err;
    }
}

async function add(exam) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        await collection.insertOne(exam);
        return exam;
    } catch (err) {
        console.log(`ERROR: cannot insert exam`)
        throw err;
    }
}