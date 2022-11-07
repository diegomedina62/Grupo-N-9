const multer = require('multer')

const filesUpload =[
    { name: 'avatar', maxCount: 1 }
]

const upload = multer({ dest: 'uploads/' })

const cpUpload = upload.fields(filesUpload)

module.exports = cpUpload