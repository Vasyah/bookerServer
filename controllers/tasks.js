const shortid = require('shortid');
const { validate } = require('jsonschema');
const db = require('../db/db');

const getInfo = (req, res, next) => {
  let tasks = [];
  try {
    tasks = db.get('info');
  } catch (error) {
    throw new Error(error);
  }
  res.json({ status: 'OK', data: tasks });
};

const getTasks = (req, res, next) => {
  let tasks = [];
  try {
    tasks = db.get('tasks');
  } catch (error) {
    throw new Error(error);
  }
  res.json({ status: 'OK', data: tasks });
};

const getOrders = (req, res, next) => {
  let orders = [];
  try {
    orders = db.get('orders');
  } catch (error) {
    throw new Error(error);
  }
  res.json({ status: 'OK', data: orders });
};

const getOrder = (req, res, next) => {
  const { id } = req.params;

  const order = db
    .get('orders')
    .find({ id })
    .value();

  if (!task) {
    throw new Error('ORDER_NOT_FOUND');
  }

  res.json({ status: 'OK', data: order });
};

const getServices = (req, res, next) => {

  const services = db.get('services')

  if (!services) {
    throw new Error('SERVICES_NOT_FOUND');
  }

  res.json({ status: 'OK', data: services });
};


const createInfo = (req, res, next) => {
  const taskSchema = {
    type: 'object',
    properties: {
      logo: { type: 'string' },
      title: { type: 'string' },
      description: { type: 'string' },
      services: { type: 'array' },
      workdays: { type: 'array' },
      paymentWays: { type: 'array' },

    },
    required: ['title', 'description'],
    additionalProperties: false
  };

  const validationResult = validate(req.body, taskSchema);
  if (!validationResult.valid) {
    throw new Error('INVALID_JSON_OR_API_FORMAT');
  }

  const { logo, title, description, services, workdays, paymentWays } = req.body;
  const info = {
    logo,
    title,
    description,
    services,
    workdays,
    paymentWays,
  };

  try {
    db.get('info')
      .push(info)
      .write();
  } catch (error) {
    throw new Error(error);
  }

  res.json({
    status: 'OK',
    data: info
  });
};


const createOrder = (req, res, next) => {
  const taskSchema = {
    type: 'object',
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      phone: { type: 'string' },
      services: { type: 'array' },
      orderDate: { type: 'string' },
      orderTimeStart: { type: 'string' },
      orderTimeEnd: { type: 'string' },
      paymentWay: { type: 'string' },
      totalPrice: { type: 'string' }

    },
    // required: [
    //   'firstName',
    //   'lastName',
    //   'phone',
    //   'services',
    //   'orderDate',
    //   'orderTimeStart',
    //   'orderTimeEnd',
    //   'paymentWay',
    //   'totalPrice'
    // ],
    additionalProperties: false
  };

  const validationResult = validate(req.body, taskSchema);
  if (!validationResult.valid) {
    throw new Error('INVALID_JSON_OR_API_FORMAT');
  }

  const { firstName, lastName, phone, services, orderDate, orderTimeStart, orderTimeEnd, paymentWay, totalPrice } = req.body;
  const info = {
    id: shortid.generate(),
    firstName,
    lastName,
    phone,
    services,
    orderDate,
    orderTimeStart,
    orderTimeEnd,
    paymentWay,
    totalPrice
  };

  try {
    db.get('orders')
      .push(info)
      .write();
  } catch (error) {
    throw new Error(error);
  }

  res.json({
    status: 'OK',
    data: info
  });
};

const createService = (req, res, next) => {
  const taskSchema = {
    type: 'object',
    properties: {
      title: { type: 'string' },
      time: { type: 'string' },
      price: { type: 'string' },
    },
    required: [
      'title',
      'time',
      'price'
    ],
    additionalProperties: false
  };
  console.log(typeof (req.body.time));
  const validationResult = validate(req.body, taskSchema);
  if (!validationResult.valid) {
    throw new Error('INVALID_JSON_OR_API_FORMAT');
  }

  const { title, time, price } = req.body;
  const service = {
    id: shortid.generate(),
    title,
    time,
    price,
  };

  try {
    db.get('services')
      .push(service)
      .write();
  } catch (error) {
    throw new Error(error);
  }

  res.json({
    status: 'OK',
    data: service
  });
};

const editService = (req, res, next) => {
  const { id } = req.params;
  const editedTask = db
    .get('services')
    .find({ id })
    .assign(req.body)
    .value();
  db.write();

  res.json({ status: 'OK', data: editedTask });
};

const deleteService = (req, res, next) => {
  const { id } = req.params;
  db.get('services')
    .remove({ id })
    .write();
  res.json({ status: 'OK' });
};

module.exports = {
  getTasks,
  getInfo,
  getOrders,
  getOrder,
  createOrder,
  createService,
  getServices,
  createInfo,
  editService,
  deleteService
};
