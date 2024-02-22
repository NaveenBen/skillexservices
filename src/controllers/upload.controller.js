const httpStatus = require('http-status');
const multer = require('multer');
const{ uploadService }  = require('../services');
const catchAsync = require('../utils/catchAsync');

const upload = multer({
    dest: 'uploads',
});

const singleUpload = upload.single('image');

const uploadImage = catchAsync(async (req, res) => {
    singleUpload(req, res, async (err) => {
        if (err) {
            return res.status(httpStatus.BAD_REQUEST).send(err.message);
        }
        const file = req.file;
        const result = await uploadService.uploadImage(file);
        return res.status(httpStatus.OK).send(result);
})});

module.exports = {
    uploadImage,
}
