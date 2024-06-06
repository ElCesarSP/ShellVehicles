const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.post('/CreatDataUser', usersController.createUser);
router.get('/PushUsersData', usersController.getAllUsers);
router.get('/PushUsersData/:cpf', usersController.getUserByCpf);
router.put('/UpDataUser/:cpf', usersController.updateUser);
router.delete('/DeleteUserData/:cpf', usersController.deleteUser);

module.exports = router;

