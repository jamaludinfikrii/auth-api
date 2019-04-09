const express = require('express')
const router = express.Router()
const { authControler } =require('./../controler')


router.post('/register' ,authControler.register )
router.post('/login' ,authControler.login )
router.put('/verify' ,authControler.verification )

module.exports = router