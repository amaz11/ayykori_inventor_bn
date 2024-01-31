const { Router } = require('express')
const { signin, signup, signout } = require('../controller/authController')

const route = Router()

route.post('/auth/signin', signin).post('/auth/signup', signup).get('/auth/signout', signout)
module.exports = route