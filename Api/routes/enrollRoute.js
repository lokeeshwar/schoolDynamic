const express = require("express");
const router = express.Router()
const {verifyToken} = require('../utils/verifyUser')
const {enrollup} = require('../controllers/enrollController')
const {deleteEnrolle,getEnrolles} = require('../controllers/enrollCrudController')

router.post('/enrollup',enrollup)
router.delete('/deleteEnroll/:userId',verifyToken,deleteEnrolle)
router.get('/getEnrolls', verifyToken, getEnrolles);

module.exports = router