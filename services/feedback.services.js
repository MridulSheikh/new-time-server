const Fedback = require("../models/feedback.models")

exports.createFeedbackService= async (data)=>{
       return Fedback.create(data);
}

exports.getFeedbackService = async (query) => {
        return await Fedback.find(query).sort({createdAt : -1})
}

exports.updateFeedbackService = async (data) => {
        return Fedback.updateOne({_id : data.id}, data,{
            runValidators: true
        })
}

exports.deleteFeedbackService = async (id) => {
       return Fedback.deleteOne({_id : id})
}