const User = require("../models/user.models")

exports.createUserService = async (data) =>{
    return await User.create(data);
}

exports.getUserService = async () =>{
    return await User.find({})
}

exports.getUserByIdService = async (email) =>{
    return await User.findOne({email})
}

exports.userUpdatebyIdService = async (email, data) =>{
    return await User.updateOne({email : email}, data, {
        runValidators: true
    });
}