require('dotenv').config();
const stripe = require("stripe")(process.env.stripe_key);

module.exports.paymentController = async (req, res, nex) => {
    try{
        const {items, total, address} = req.body;
        const amount = total*100;
        const paymentIntent = await stripe.paymentIntents.create({
            amount : amount,
            currency: "usd",
            payment_method_types: ["card"]
        })
        console.log(paymentIntent)
        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    }catch(error){
        res.send({
            clientSecret : "not found"
        })
    }
}