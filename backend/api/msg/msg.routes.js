const express = require('express')

const { getMsgs, addMsg } = require('./msg.controller')
const router = express.Router()

router.get('/', getMsgs)
router.post('/', addMsg)

module.exports = router