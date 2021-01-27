import Joi from 'joi';
import Boom from 'boom';
import { uuidv4 } from 'uuid';
import multer from 'multer';
import multerS3 from 'multer-s3';
import AWS from 'aws-sdk';

function POST(req, res) {
  const s3 = new AWS.S3({
    accessKeyId: '72LO5EVS2OGBMVAHQEZT',
    secretAccessKey: 'uG5OiVypq7tWjeWltxT4fhGRJAW5w8XqEEJtmzT2dZ8',
    endpoint: 'https://durf2030.ams3.digitaloceanspaces.com/',
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  });

  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'durf2030',
      acl: 'public-read',
      metadata: (req, file, cb) => {
        cb(null, {
          originalname: file.originalname,
        });
      },
      contentType: function (req, file, cb) {
        cb(null, file.mimetype);
      },
      key: function (req, file, cb) {
        //generate unique file names for the server
        console.log(file);
        const uuid = uuidv4();
        const key = `${req.s3_key_prefix}${uuid}`;
        console.log(key);
        req.saved_files.push({
          originalname: file.originalname,
          mimetype: file.mimetype,
          encoding: file.encoding,
          key,
        });
        cb(null, key);
      },
    }),
  });

  function upload_auth(req, res) {
    //path to where the file will be uploaded
    try {
      req.s3_key_prefix = req.headers['x-path'].replace('/^//+g, ');
    } catch (e) {
      return next(Boom.badImplementation('x-path header incorrect'));
    }
    //all uploaded filesget pushed into this array
    //array is returned back to client once all uploads are completed
    req.saved_files = [];
    console.log('you are verified');
  }

  upload_auth(req, res);
  const savedFiles = upload.array('files', 50);
  res.json(savedFiles);
}

export default function handler(req, res) {
  if (req.method == 'POST') POST(req, res);
  else res.status(404).end;
}
