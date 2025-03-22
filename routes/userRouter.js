const express = require('express');
const router = express.Router();

const { userRegister, userLogin, allUsers, userById } = require("../controllers/userController");

router.post('/register', userRegister);
router.post('/login', userLogin);

router.get('/all-users',allUsers);

router.get('/single-user/:id',userById);
module.exports = router;
