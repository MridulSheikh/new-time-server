const express = require("express");
const app = express();
const cors = require("cors");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const categoryRoute = require("./routes/cetagory.route");
const brandRoute = require("./routes/brand.route");
const order = require("./routes/order.route");
const blog = require("./routes/blog.route");
const payment = require("./routes/payment.route");
const feedback = require("./routes/feedback.route");
const folder = require("./routes/folder.route");
const image = require("./routes/image.route");

// middleware
app.use(express.json());
app.use(cors());

//routes
// user route
app.use("/api/v1/user", userRoute);

// product route
app.use("/api/v1/product", productRoute);

// category route
app.use("/api/v1/category", categoryRoute);

// brand route
app.use("/api/v1/brand", brandRoute);

// order route
app.use("/api/v1/order", order);

// blog router
app.use("/api/v1/blog", blog);

// payment intent route
app.use("/api/v1/create-payment-intent", payment);

// feedback route
app.use("/api/v1/feedback", feedback);

// folder router
app.use("/api/v1/folder", folder);

// upload image route
app.use("/api/v1/image", image);

module.exports = app;
