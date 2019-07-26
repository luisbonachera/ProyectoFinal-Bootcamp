const authModel = require('../models/authModel');
const authController = {};

authController.find = (req, res) => {
    const user = req.body;
    authModel.find(req.body)
    .then(result =>{
        res.send({
            type:"success",
            data:result
        });
    })
    .catch(err=>{
        res.send({
            type:"error",
            data:err
        });
    });
}

module.exports = authController;