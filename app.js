const express = require('express')
const app = express()
const port = 3000;
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

app.use(fileUpload({
    createParentPath: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.post('/upload', function (req, res) {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let movie = req.files.file;

            //Use the mv() method to place the file in the upload directory (i.e. "uploads")
            movie.mv('./uploads/' + movie.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: movie.name,
                    mimetype: movie.mimetype,
                    size: movie.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
})

app.listen(port)
console.log('Server started at http://localhost:' + port);