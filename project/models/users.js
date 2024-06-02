class Users {
    constructor() {
        this.users = [];
    }

    addVeiculos(veiculo) {
        this.users.push(veiculo);
    }

    getVeiculosVendido() {
        return this.users;
    }

    static retornaUser(user) {
        return {
            id: user.id,
            name: user.name,
            sobrenome: user.sobrenome,
            idade: user.idade,
            email: user.email,
            cpf: user.cpf,
            telefone: user.telefone
        };
    }

    validarCpf(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf === '') return false;
        if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) return false;

        let add = 0;
        for (let i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11)
            rev = 0;
        if (rev !== parseInt(cpf.charAt(9)))
            return false;

        add = 0;
        for (let i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11)
            rev = 0;
        if (rev !== parseInt(cpf.charAt(10)))
            return false;

        return true;
    }

    validarEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validarTelefone(telefone) {
        const telefoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        const telefoneString = telefone.toString(); // Converter para string

        return telefoneRegex.test(telefoneString);
    }

    validarNome(nome) {
        return typeof nome === 'string' && nome.trim().length > 0;
    }

    checkCpf(cpf) {
        const cpfExists = this.users.some(user => user.cpf === cpf);
        if (cpfExists) {
            throw new Error('CPF já cadastrado no sistema');
        }
    }

    addUsersData(name, sobrenome, idade, email, cpf, telefone) {
        if (!this.validarNome(name)) {
            throw new Error('Nome inválido');
        }
        if (!this.validarNome(sobrenome)) {
            throw new Error('Sobrenome inválido');
        }
        if (!this.validarCpf(cpf)) {
            throw new Error('CPF inválido');
        }
        if (!this.validarEmail(email)) {
            throw new Error('Email inválido');
        }
        if (!this.validarTelefone(telefone)) {
            throw new Error('Telefone inválido');
        }
        this.checkCpf(cpf);
        const user = {
            id: this.users.length + 1,
            name,
            sobrenome,
            idade,
            email,
            cpf,
            telefone
        };
        this.users.push(user);
        return user;
    }

    getAllUsers() {
        return this.users;
    }

    getUserByCpf(cpf) {
        return this.users.find(user => user.cpf === cpf);
    }

    updateUserData(cpf, name, sobrenome, idade, email, telefone) {
        const user = this.getUserByCpf(cpf);
        if (user) {
            if (!this.validarNome(name)) {
                throw new Error('Nome inválido');
            }
            if (!this.validarNome(sobrenome)) {
                throw new Error('Sobrenome inválido');
            }
            if (!this.validarEmail(email)) {
                throw new Error('Email inválido');
            }
            if (!this.validarTelefone(telefone)) {
                throw new Error('Telefone inválido');
            }
            user.name = name;
            user.sobrenome = sobrenome;
            user.idade = idade;
            user.email = email;
            user.telefone = telefone;
        } else {
            throw new Error('Nenhum usuário cadastrado com esse CPF');
        }
    }

    deleteUserData(cpf) {
        const userIndex = this.users.findIndex(user => user.cpf === cpf);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
        } else {
            throw new Error('Nenhum usuário cadastrado com esse CPF');
        }
    }
}

module.exports = Users;
