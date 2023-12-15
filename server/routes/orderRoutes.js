import { createOrder, deleteOrder, getAllOrders, getSingleOrder, myOrders, updateOrder } from '../controllers/orderController.js';
import { isAuthenticated,authorizeRoles } from '../middlewares/auth.js';
import express from 'express'



const orderRoute = express.Router();


orderRoute
        .post('/order/new',isAuthenticated,createOrder)
        .get('/order/:id',isAuthenticated,getSingleOrder)
        .get('/orders/me',isAuthenticated,myOrders)
        .get('/admin/orders',isAuthenticated,authorizeRoles("admin"),getAllOrders)
        .put('/admin/update/:id/',isAuthenticated,authorizeRoles("admin"),updateOrder)
        .delete('/admin/delete/:id',isAuthenticated,authorizeRoles("admin"),deleteOrder)




export default orderRoute