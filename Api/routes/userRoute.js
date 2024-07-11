const express = require("express");
const router = express.Router()
const {updateUser,deleteUser,signout,getUsers} = require('../controllers/userCrudController')
const {verifyToken} = require('../utils/verifyUser')


router.put('/update/:userId',verifyToken,updateUser)
router.delete('/delete/:userId',verifyToken,deleteUser)
router.post('/signout',signout)
router.get('/getusers', verifyToken, getUsers);

module.exports = router

