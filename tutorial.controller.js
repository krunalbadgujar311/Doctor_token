const { title } = require("process");
const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Patient
exports.create = (req, res) => {
    //Validate request
    if(!req.patient.name){
        res.status(400).send({
            message:"Patient List Cannot Be Empty!"
        });
        return;
    }

    //Create a new Patient
    const tutorial={
        name:req.patient.name,
        phone:req.body.phone,
        token:req.body.token
    };

    //Save patients in database
    Tutorial.create(tutorial).then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:
                err.message ||"Some error occured while creating patient."
        });
    });
};
    

// Retrieve all patients from the database.
exports.findAll = (req, res) => {
    const name=req.query.name;
    var condition=name?{title:{[Op.like]:'%${name}%'}}:null;

    Tutorial.findAll({where:condition})
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:
            err.message ||"Some error occured while searching for patients."
        });
    });
};

// Find a single patient with an token
exports.findOne = (req, res) => {
    const token=req.params.token;

    Tutorial.findByPk(token)
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:"Some error occured while searching for patient." + token
        });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const token=req.params.token;

    Tutorial.update(req.body,{
        where:{token:token}
    })
    .then(num=>{
        if(num==1){
            res.send({
                message:"Patient was updated successfully"
            });
        }else{
            res.send({
                message:"Cannot update Patient with token=${token}"
            });
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Some error occured while updating patient." + token
        });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const token = req.params.token;

    Tutorial.destroy({
        where:{token:token}
    })
    .then(num=>{
        if(num==1){
            res.send({
                message:"Patient was deleted successfully"
            });
        }else{
            res.send({
                message:"Cannot delete Patient with token=${token}"
            });
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"Some error occured while deleting patient." + token
        });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
        where:{},
        truncate:false
    })
        .then(nums=>{
            res.send({message:"${nums}Patients were deleted successfully!"});
        })
        .catch(err=>{
            res.status(500).send({
                message:
                    err.message ||"Some error occured while deleting patients."
            });
        });
};
