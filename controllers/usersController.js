const Users = require('../models/users');
const usersInstance = new Users();

const createUser = (req, res) => {
    const { name, sobrenome, idade, email, cpf, telefone } = req.body;

    if (!name || !sobrenome || !idade || !email || !cpf || !telefone) {
        return res.status(400).json({ error: 'Missing required user data' });
    }

    try {
        const userNew = usersInstance.addUsersData(name, sobrenome, idade, email, cpf, telefone);
        res.status(201).json(userNew);
        console.log('Usuário criado com sucesso:', userNew);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const getAllUsers = (req, res) => {
    const allUsers = usersInstance.getAllUsers();
    res.status(200).json(allUsers);
    console.log('Lista de todos os usuários:', allUsers);
};

const getUserByCpf = (req, res) => {
    const userCpf = req.params.cpf;
    const user = usersInstance.getUserByCpf(userCpf);

    if (user) {
        res.status(200).json(user);
        console.log('Usuário encontrado:', user);
    } else {
        res.status(404).send('User not found');
        console.log('Usuário não encontrado');
    }
};

const updateUser = (req, res) => {
    const userCpf = req.params.cpf;
    const { name, sobrenome, idade, email, telefone } = req.body;

    if (!name || !sobrenome || !idade || !email || !telefone) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    try {
        usersInstance.updateUserData(userCpf, name, sobrenome, idade, email, telefone);
        res.status(200).json({ message: 'Usuário atualizado com sucesso' });
        console.log('Usuário atualizado com sucesso');
    } catch (error) {
        console.error('Error updating user:', error.message);
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = (req, res) => {
    const userCpf = req.params.cpf;

    try {
        usersInstance.deleteUserData(userCpf);
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
        console.log('Usuário deletado com sucesso');
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByCpf,
    updateUser,
    deleteUser,
    usersInstance
};