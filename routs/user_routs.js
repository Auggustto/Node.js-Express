const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, 'users.json')

// Criando a função para validar se arquivo já foi criado ou não
const getUsers = () => {
    const data = fs.existsSync(filePath)
        ? fs.readFileSync(filePath)
        : []

    try {
        return JSON.parse(data)

    } catch (error) {
        return []
    }
}

//  Metodo para salvar os usuarios
const saveUser = (users) => fs.writeFileSync(filePath, JSON.stringify(users, null, '\t'))


const userRoute = (app) => {
    app.route('/users/:id?')

        //  Lendo os usuários
        .get((req, res) => {
            const readUsers = getUsers()

            res.send({ readUsers })
        })

        // Criação de usuários
        .post((req, res) => {
            const users = getUsers()
            users.push(req.body)
            saveUser(users)

            res.status(201).send('OK')
        })

        // Update de usuários
        .put((req, res) => {
            const users = getUsers()

            saveUser(users.map(user => {
                if (user.id === req.params.id) {
                    return {
                        ...user,
                        ...req.body
                    }
                }
                return user
            }))
            res.status(200).send('Ok')
        })

        // Deletar um usuário 
        .delete((req, res) => {
            const users = getUsers()

            saveUser(users.filter(user => user.id !== req.params.id))

            res.status(200).send('ok')
        })
}

module.exports = { userRoute }