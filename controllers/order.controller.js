const { sendMail } = require("../lib/email");
const {
  createOrderService,
  getOrderService,
  getOrderbyIdService,
  updateOrderService,
  deleteOrderService,
} = require("../services/order.services");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const queryfilter = require("../lib/queryfilter")

exports.getOrderController = async (req, res) => {
  try {
    const {filters, queries} = queryfilter(req);
    const result = await getOrderService(filters, queries);
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
    const id = result._id.toString();
    const token = jwt.sign({ _id: id }, process.env.JWT_SIGNATURE, {
      expiresIn: "120s",
    });
    const confirm_uri = `${process.env.CLIENT_HOST}order/confirm/${token}`;
    const mailData = {
      from: process.env.SENDER_MAIL,
      to: req.body.address.email,
      subject: "Hey ! confirm your order",
      template: "confirmorder",
      context: {
        total: req.body.total,
        confirm_uri: confirm_uri,
        country: req.body.address.country,
        state: req.body.address.state,
        post: req.body.address.post,
        item_length: req.body.item.length,
        address_1_line: req.body.address.address_1_line,
      },
    };
    const infoMessageId = await sendMail(mailData);
    if (result._id) {
      res.status(200).json({
        statuscode: 200,
        message: "please check your email",
        data: result,
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        message: "order not placed",
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
      message: error.message,
    });
  }
};

exports.getOrderByIdController = async (req, res) => {
  try {
    console.log("hitted");
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
    const result = await updateOrderService(req.params.id, req.body);
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

exports.confirmOrder = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(
      token,
      process.env.JWT_SIGNATURE
    );
    if (decoded?._id) {
      const result = await updateOrderService(decoded._id, { confirm: true });
      if (result.modifiedCount === 0) {
        return res.status(500).json({
          status: "fail",
          message: "your order is not confirmed please try again",
        });
      }
      res.status(200).json({
        status: "success",
        message: "your order has been confirmed",
      });
    } else {
      res.status(500).json({
        status: "fail",
        message: "your order is not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      error,
      message: "something went wrong",
    });
  }
};

exports.verifyOrder = async (req, res) => {
  try {
    const { id, total, item, address } = req.body;
    const token = jwt.sign({ _id: id }, process.env.JWT_SIGNATURE, {
      expiresIn: "120s",
    });
    const confirm_uri = `${process.env.CLIENT_HOST}/order/confirm/${token}`;
    const mailData = {
      from: process.env.SENDER_MAIL,
      to: address.email,
      subject: "Hey ! confirm your order",
      template: "confirmorder",
      context: {
        total: total,
        confirm_uri: confirm_uri,
        country: address.country,
        state: address.state,
        post: address.post,
        item_length: item,
        address_1_line: address.address_1_line,
      },
    };
    await sendMail(mailData);
    res.status(200).json({
      statuscode: 200,
      message: "please check your email",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      error,
      message: "something went wrong",
    });
  }
};
