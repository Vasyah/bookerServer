const express = require('express');

const router = express.Router();

const tasksController = require('../controllers/tasks');

// GET /tasks
// router.get('/', tasksController.getTasks);

// GET /tasks/:id
// router.get('/:id', tasksController.getTask);

// POST /tasks
// router.post('/', tasksController.createTask);

// PATCH /tasks/:id
// router.patch('/:id', tasksController.editTask);

// DELETE /tasks/:id
// router.delete('/:id', tasksController.deleteTask);



// post - здесь мы можем и добавить, и удалить
// ADMIN
const root = '/';
const info = '/info';
const orders = '/orders';

// INFO - GET/POST/PATCH
router.get(root, tasksController.getInfo);
router.post(info, tasksController.createInfo);
// router.patch(root, tasksController.editInfo);

// ORDERS - GET/POST/PATCH/DELETE
router.get(orders, tasksController.getOrders);

router.get(`${orders}/:id`, tasksController.getOrder);
// заказ может создавать - админ, пользователь
router.post(orders, tasksController.createOrder);
// редактировать может только админ
// router.patch(orders, tasksController.editOrder);
// удалять заказ может только админ
// router.delete(orders, tasksController.deleteOrder);

module.exports = router;
