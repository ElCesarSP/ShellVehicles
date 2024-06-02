const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post('/CreatDataUser', usersController.createUser);
router.get('/PushUsersData', usersController.getAllUsers);
router.get('/PushUsersData/:cpf', usersController.getUserByCpf);
router.put('/UpDataUser/:cpf', usersController.updateUser);
router.delete('/DeleteUserData/:cpf', usersController.deleteUser);

module.exports = router;