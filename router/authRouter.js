const express = require('express')
const router = express.Router()
const { authControler } =require('./../controler')


router.post('/register' ,authControler.register )

module.exports = router