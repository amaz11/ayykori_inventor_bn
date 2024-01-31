const { Router } = require('express')
const { verifyuser, authrizeRoles } = require('../middleware/userVerify')
const { createProduct, getProducts, getProductById, updateProductById, deleteProductById } = require('../controller/productController')


const route = Router()

route
    .post('/products', verifyuser, authrizeRoles('admin'), createProduct)
    .get('/products', getProducts)
    .get('/product/:id', getProductById)
    .put('/product/:id', verifyuser, authrizeRoles('admin'), updateProductById)
    .delete('/product/:id', verifyuser, authrizeRoles('admin'), deleteProductById)
module.exports = route