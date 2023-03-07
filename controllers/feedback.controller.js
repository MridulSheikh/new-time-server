const {
  createFeedbackService,
  getFeedbackService,
  updateFeedbackService,
  deleteFeedbackService,
} = require("../services/feedback.services");

exports.getFeedbackController = async (req, res) => {
  try {
    const filters = { ...req.query };
    const execudeFields = ["sort", "page", "limit"];
    execudeFields.forEach((field) => {
      delete filters[field];
    });
    const result = await getFeedbackService(filters);
    if (result.length === 0) {
      res.status(404).json({
        statuscode: 404,
        message: "Feedback Not Found",
      });
    } else {
      res.status(200).send({
        statuscode: 200,
        message: "Feedback Found",
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

exports.createFeedbackController = async (req, res) => {
  try {
    const result = await createFeedbackService(req.body);
    if (result.email) {
      res.status(200).json({
        statuscode: 200,
        message: "successfully created Feedback",
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

exports.updateFeedbackController = async (req, res) => {
  try {
    const result = await updateFeedbackService(req.body);
    if (result.modifiedCount > 0) {
      res.status(200).send({
        statuscode: 200,
        message: "Feedback successfuly update",
        data: req.body,
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        message: "make sure you are given right Feedback id or data",
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

exports.deleteFeedbackController = async (req, res) => {
  try {
    const result = await deleteFeedbackService(req.params.id);
    if (result.deletedCount > 0) {
      res.status(200).json({
        statuscode: 200,
        message: "Feedback successfuly deleted",
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        message: "Feedback not found",
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
