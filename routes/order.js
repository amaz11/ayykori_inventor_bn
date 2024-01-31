const { Router } = require('express')
const { verifyuser, authrizeRoles } = require('../middleware/userVerify')
const { newOrder } = require('../controller/orderController')


const route = Router()

route
    .post('/order', verifyuser, newOrder)
    .get('/order', verifyuser, authrizeRoles('admin'),)
    .get('/order/:id',)

module.exports = route