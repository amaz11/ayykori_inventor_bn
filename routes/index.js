const { Router } = require('express')
const auth = require('./auth')
const product = require('./products')
const order = require('./order')
const routes = Router()

routes.use(auth)
routes.use(product)
routes.use(order)


module.exports = routes