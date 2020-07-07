
const dbService = require('../../services/db.service')
const bcrypt = require('bcryptjs')
const ObjectId = require('mongodb').ObjectId

const saltRounds = 10

module.exports = {
    query,
    getById,
    getByUsername,
    remove,
    update,
    add
}

async function query() {
    const userCollection = await dbService.getCollection('user')

    try {
        let users;
        users = await userCollection.find().toArray();
        const usersWithoutPassword = users.map(user => {
            delete user.password
            return user
        })
        return usersWithoutPassword
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function getById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ "_id": ObjectId(userId) })

        delete user.password
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}
async function getByUsername(username) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${username}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.deleteOne({ "_id": ObjectId(userId) })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection('user')
    user._id = ObjectId(user._id);

    try {
        user.password = await bcrypt.hash(user.password, saltRounds)
        await collection.replaceOne({ "_id": user._id }, { $set: user })
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function add(user) {
    const collection = await dbService.getCollection('user')
    try {
        const dbUsers = await collection.find().toArray();
        const isTakenUsername = dbUsers.some(dbUser => dbUser.username === user.username)
        if (isTakenUsername) return Promise.reject('The username is already exists')

        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.boardId) {
        criteria.boardId = filterBy.boardId
    }
    if (filterBy.q) {
        criteria.q = { $regex: `.*${filterBy.q}.*`, $options: 'i' }
    }
    return criteria;
}


