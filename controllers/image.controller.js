const {
  createImageService,
  getImageService,
} = require("../services/image.services");

exports.createImageController = async (data, res) => {
  try {
    const result = await createImageService(data);
    if (result.name) {
      res.status(200).json({
        statuscode: 200,
        message: "successfully created Image",
        data: result,
      });
    } else {
      res.status(401).json({
        errorcode: 401,
        errormessage: "The Image has not been added",
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
    });
  }
};

exports.getImageController = async (req, res) => {
  try {
    const result = await getImageService();
    if (result.length === 0) {
      res.status(404).json({
        statuscode: 200,
        message: "Image not found",
        data: result,
      });
    } else {
      res.status(200).send({
        statuscode: 200,
        message: "Image Found",
        data: result,
      });
    }
  } catch (error) {
    res.status(401).json({
      errorcode: 401,
      errormessage: error.message,
    });
  }
};
