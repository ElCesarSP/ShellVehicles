const Users = require('../models/userModel');
const users = new Users();

const createUser = (req, res) => {
    try {
        const { name, sobrenome, idade, email, cpf, telefone } = req.body;
        const newUser = users.addUsersData(name, sobrenome, idade, email, cpf, telefone);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllUsers = (req, res) => {
    res.json(users.getAllUsers());
};

const getUserByCpf = (req, res) => {
    const { cpf } = req.params;
    try {
        const user = users.getUserByCpf(cpf);
        res.json(user);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const updateUser = (req, res) => {
    try {
        const { cpf } = req.params;
        const { name, sobrenome, idade, email, telefone } = req.body;
        users.updateUserData(cpf, name, sobrenome, idade, email, telefone);
        res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUser = (req, res) => {
    try {
        const { cpf } = req.params;
        users.deleteUserData(cpf);
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByCpf,
    updateUser,
    deleteUser
};
