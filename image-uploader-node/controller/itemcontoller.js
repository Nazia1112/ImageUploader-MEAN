var Item = require('../model/item');
var formidable = require('formidable');
var path = require('path');
const async = require('async');
const sharp = require('sharp');



module.exports.savefiles = function (req, res) {
    var src = './public/images';
    var pathSeparator = path.sep;
    const media_file = [];
    var vaidImage = false;
    var form = new formidable.IncomingForm();
    form.keepExtensions = true; //keep file extension
    form.uploadDir = src;

    form.onPart = function (part) {
        if (!part.filename || part.filename.match(/\.(jpg|jpeg|png)$/i)) {
            vaidImage = true;
            this.handlePart(part);
        }
        else {
            vaidImage = false;
            // return res.json({ status: 500, msg: 'Invaid File' });
        }
    }

    form.parse(req, function (err, fields, files) {
        if (form.bytesReceived > 1000000) {
            return res.json({ status: "Failure", code: 500, msg: constObj.message[defaultLang].ImageSizeExceeds });
        }
        else {
            if (vaidImage) {
                // console.log(files);
                var fileName = files.file.path.split(pathSeparator)[2];
                var fullpathFileName = files.file.path;
                async.forEachOf(req.files, (file) => {
                    var path_original = 'public/images/original/' + file.originalname;
                    var path_thumb = 'public/images/thumbnails/';
                    sharp(path_original)
                        .resize({ width: 100, height: 100 })
                        .toFile.push(path_thumb + '100/' + file.originalname, (err) => console.log(err));

                    sharp(path_original)
                        .resize({ width: 75, height: 75 })
                        .toFile.push(path_thumb + '75/' + file.originalname, (err) => console.log(err));

                    sharp(path_original)
                        .resize({ width: 125, height: 125 })
                        .toFile.push(path_thumb + '125/' + file.originalname, (err) => console.log(err));
                });
               // media_file.push(fullpathFileName.split(pathSeparator)[2]);
                console.log(fileName, files.file.path, '/images');
                let imagePAth = `/images/${fileName}`;
                console.log(imagePAth);

                var newItem = new Item({
                    filename: imagePAth,

                });

                newItem.save(function (err) {
                    console.log(err);
                    if (err) {
                        return res.json({ success: false, msg: 'Upload Failure' });
                    }
                    else {
                        res.json({
                            success: true,
                            msg: 'Image Successfully uploaded ',
                            code: 200
                        });
                    }
                });
            }

        }
    });
}