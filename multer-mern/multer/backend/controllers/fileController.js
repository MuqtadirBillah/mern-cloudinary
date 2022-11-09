const moment = require("moment");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.cloud_api_key, 
  api_secret: process.env.cloud_api_secret
});

const fileUpload = async (req, res)=>{
    // console.log(working);
    // console.log(req.file);
    try{
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            console.log(result)
            res.send({ status: "success", message: `${req.file.originalname} uploaded!` })
        }
        else{
            res.send({ status: "error", message: `File not found!` })
        }
    } catch(err){
        console.log(err)
        res.send({ status: "err", error: err })
    }
}

module.exports = {
    fileUpload
}