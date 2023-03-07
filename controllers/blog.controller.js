const {createBlogService, getBlogService, updateBlogService, deleteBlogService, getBlogbyTitleService} = require("../services/blog.services")
  
  exports.getBlogController = async (req, res) => {
    try {
      const result = await getBlogService();
      if (result.length === 0) {
        res.status(404).json({
          statuscode: 404,
          message: "Blog Not Found",
        });
      } else {
        res.status(200).send({
          statuscode: 200,
          message: "Blog Found",
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
  
  exports.createBlogController = async (req, res) => {
    try {
      const result = await createBlogService(req.body);
      if (result.title) {
        res.status(200).json({
          statuscode: 200,
          message: "successfully created Blog",
          data: result,
        });
      } else {
        res.status(401).json({
          errorcode: 401,
          message:
            "unsuccessfull",
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
  
  exports.getBlogByTitleController = async (req, res) => {
    try {
      const result = await getBlogbyTitleService(req.params.title);
      if (result === null) {
        res.status(404).json({
          statuscode: 404,
          message: "Blog Not Found",
        });
      } else {
        res.status(200).send({
          statuscode: 200,
          message: "Blog Found",
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
  
  exports.updateBlogController = async (req, res) => {
    try {
      const result = await updateBlogService(req.body, req.params.id)
      if(result.modifiedCount > 0){
        res.status(200).send({
          statuscode: 200,
          message: "Blog successfuly update",
          data : req.body
        });
      }else{
        res.status(401).json({
          errorcode: 401,
          message:
            "make sure you are given right Blog id or data",
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
  
  exports.deleteBlogController = async (req, res) => {
    try{
        const result = await deleteBlogService(req.params.id)
        if(result.deletedCount > 0){
          res.status(200).json({
            statuscode : 200,
            message : "Blog successfuly deleted"
          })
        }else{
          res.status(401).json({
            errorcode: 401,
            message:
              "Blog not found",
          });
        }
    }catch(error){
      res.status(401).json({
        errorcode: 401,
        errormessage: error.message,
        message:
          "please check you network collection or please send a email for support",
      });
    }
  }