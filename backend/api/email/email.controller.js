const emailService = require('./email.service')

async function getEmails(req, res) {
    const emails = await emailService.query(req.query)
    res.send(emails)
}

async function addEmail(req, res) {
    let email = req.body
    email = await emailService.add(email)
    res.send(email)
}

module.exports = {
    addEmail,
    getEmails
}