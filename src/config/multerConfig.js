import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3 } from './awsConfig';
import { AWS_BUCKET_NAME } from '../serverConfig';


export const s3uploader = multer({   // uploader is a middleware
    storage: multerS3({
        s3: s3,
        bucket: AWS_BUCKET_NAME,
           key: function (req,file, cb){
            // we are validating file over here manually and not by zod
            if(!file){
                return cb(new Error("File not Found"));
            }
            // check mimetype for jpeg and png file only
            if(file.mimetype !== "image/jpeg" && file.mimetype !== "image/png"){
                return cb(new Error("File type not supported"));
            }

            console.log(file);
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 109 ); // to make sure the key is unique

            cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]);
        }

    })
})