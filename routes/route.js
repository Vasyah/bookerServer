const express = require('express');

const router = express.Router();

const tasksController = require('../controllers/tasks');

// post - здесь мы можем и добавить, и удалить
// ADMIN
const root = '/';
const info = '/info';
const orders = '/orders';
const services = '/services';
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
router.post(services, tasksController.createService);
router.get(services, tasksController.getServices);
router.patch(`${services}/:id`, tasksController.editService);
router.delete(`${services}/:id`, tasksController.deleteService);
module.exports = router;
