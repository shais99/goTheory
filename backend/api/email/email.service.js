
const dbService = require('../../services/db.service')
const COLLECTION_NAME = 'email'

module.exports = {
    query,
    add
}

async function query() {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        const emails = await collection.find().toArray();
        return emails
    } catch (err) {
        console.log('ERROR: cannot find emails')
        throw err;
    }
}

async function add(email) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        await collection.insertOne(email);
        return email;
    } catch (err) {
        console.log(`ERROR: cannot insert email`)
        throw err;
    }
}