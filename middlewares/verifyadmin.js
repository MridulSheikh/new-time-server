module.exports = (req, res, next) =>{
        const {user} = req;
        if(user.role === "admin"){
            return next()
        }else{
            res.status(403).json({
                status: "fail",
                message : "Forbidden: you don't have permission to access / on this operation",
                errormessage : "Forbidden: you don't have permission to access / on this operation"
              });
        }
}