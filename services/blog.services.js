const Blog = require("../models/blog.models");

exports.createBlogService = async (data) => {
  return Blog.create(data);
};

exports.getBlogService = async () => {
  return Blog.find({}).sort({ createdAt: -1 });
};

exports.getBlogbyTitleService = async (title) => {
  return Blog.findOne({ title: title });
};

exports.updateBlogService = async (data, id) => {
  return Blog.updateOne({ _id: id }, data, {
    runValidators: true,
  });
};

exports.deleteBlogService = async (id) => {
  return Blog.deleteOne({ _id: id });
};
