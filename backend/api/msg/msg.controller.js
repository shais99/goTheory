const msgService = require('./msg.service')

async function getMsgs(req, res) {
    const msgs = await msgService.query(req.query)
    res.send(msgs)
}

async function addMsg(req, res) {
    let msg = req.body
    msg = await msgService.add(msg)
    res.send(msg)
}

module.exports = {
    addMsg,
    getMsgs
}