module.exports=app=>{
    const tutorials=require("../controllers/tutorial.controller.js");

    var router=require("express").Router();

    //Create New Patient
    router.post("/",tutorials.create);

    //Retrieve all patients
    router.get("/",tutorials.findAll);

    //Retrieve single Patient with id
    router.get("/:id",tutorials.findOne);

    //Update a Patient with Id
    router.put("/:id",tutorials.update);

    //Delete a Patient with Id
    router.delete("/:id",tutorials.delete);

    //Delete all Patient
    router.get("/",tutorials.deleteAll);

    app.use("./api/tutorials",router);
};