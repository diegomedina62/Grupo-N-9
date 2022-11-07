const multer = require('multer');
const { ErrorObject } = require('../helpers/error');

const filesUpload =[
    { name: 'avatar', maxCount: 1 }
]
const MIMETYPES = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];

const upload = multer({ 
    dest: 'uploads/',
    fileFilter: (req, file, cb) => {
        (MIMETYPES.includes(file.mimetype)) ? 
            cb(null, true) :
            cb(new ErrorObject(`Only extensions are allowed: [${MIMETYPES.join(' - ')}]`, 400))
    }
})

const cpUpload = upload.fields(filesUpload)

module.exports = cpUpload