const {
  createOrderService,
  getOrderService,
  getOrderbyIdService,
  updateOrderService,
  deleteOrderService,
} = require("../services/order.services");

exports.getOrderController = async (req, res) => {
  try {
    const filters = { ...req.query };
    const execudeFields = ["sort", "page", "limit"];
    execudeFields.forEach((field) => delete filters[field]);
    const result = await getOrderService(filters);
    if (result.length === 0) {
      res.status(404).json({
        statuscode: 404,
        message: "Order Not Found",
      });
    } else {
      res.status(200).send({
        statuscode: 200,
        message: "Order Found",
        data: result,
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
      message:
        "please check you network collection or please send a email for support",
    });
  }
};

exports.createOrderController = async (req, res) => {
  try {
    const result = await createOrderService(req.body);
    if (result.email) {
      res.status(200).json({
        statuscode: 200,
        message: "successfully created Order",
        data: result,
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        message:
          "The cetagory has not been added. please Check the cetagory data again",
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
      message:
        "please check you network collection or please send a email for support",
    });
  }
};

exports.getOrderByIdController = async (req, res) => {
  try {
    const result = await getOrderbyIdService(req.params.id);
    if (result === null) {
      res.status(404).json({
        statuscode: 404,
        message: "Order Not Found",
      });
    } else {
      res.status(200).send({
        statuscode: 200,
        message: "Order Found",
        data: result,
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
      message:
        "please check you network collection or please send a email for support",
    });
  }
};

exports.updateOrderController = async (req, res) => {
  try {
    const result = await updateOrderService(req.body);
    if (result.modifiedCount > 0) {
      res.status(200).send({
        statuscode: 200,
        message: "Order successfuly update",
        data: req.body,
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        message: "make sure you are given right Order id or data",
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
      message:
        "please check you network collection or please send a email for support",
    });
  }
};

exports.deleteOrderController = async (req, res) => {
  try {
    const result = await deleteOrderService(req.params.id);
    if (result.deletedCount > 0) {
      res.status(200).json({
        statuscode: 200,
        message: "Order successfuly deleted",
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        message: "Order not found",
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
      message:
        "please check you network collection or please send a email for support",
    });
  }
};
