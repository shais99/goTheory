
const dbService = require('../../services/db.service')
const COLLECTION_NAME = 'msg'

module.exports = {
    query,
    add
}

async function query() {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        const msgs = await collection.find().toArray();
        return msgs
    } catch (err) {
        console.log('ERROR: cannot find msgs')
        throw err;
    }
}

async function add(msg) {
    const collection = await dbService.getCollection(COLLECTION_NAME)
    try {
        await collection.insertOne(msg);
        return msg;
    } catch (err) {
        console.log(`ERROR: cannot insert msg`)
        throw err;
    }
}