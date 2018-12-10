const aws = require('aws-sdk');
const multer = require('multer'); // middleware for handling data files - file uploading
const multerS3 = require('multer-s3'); // multer extension for easy uploading to Amazon S3 service

require('dotenv').config();

// configuring our aws
aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: 'us-east-1' // region in URL
});

// create instance of aws
const s3 = new aws.S3();

const upload = multer({ // providing function to multer object
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET,
    acl: 'public-read', //'bucket-owner-full-control', // file access control
    metadata: function(req, file, callback) { // callback function to set metadata of uploaded file - setting additional metadata for a fieldName
      callback(null, {fieldName: file.fieldname});
    },
    key: function(req, file, callback) { // callback function to set key property - here we are using a timestamp
      callback(null, Date.now().toString());
    }
  })
})

module.exports = upload;