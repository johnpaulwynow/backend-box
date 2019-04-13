const express = require("express");
const multer = require('multer');
const multerconfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/boxcontroller');
const FileController = require("./controllers/FileController")


//get post delete put
routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id",BoxController.show);

routes.post("/boxes/:id/files", multer(multerconfig).single('file'),FileController.store);
routes.get("/inicio",(req,res)=>{
   res.send("API rodando!");
});  
module.exports = routes;