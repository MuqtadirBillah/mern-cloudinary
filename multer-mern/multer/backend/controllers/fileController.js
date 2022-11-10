const moment = require("moment");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.cloud_api_key, 
  api_secret: process.env.cloud_api_secret
});

const fileUpload = async (req, res)=>{
    try{
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            res.status(200).send({ status: "success", message: `${req.file.originalname} uploaded!` })
        }
        else{
            res.status(404).send({ status: "error", message: `File not found!` })
        }
    } catch(err){
        console.log(err)
        res.status(500).send({ status: "err", error: err })
    }
}

module.exports = {
    fileUpload
}