const express = require('express');
const  formidable = require('formidable');
const fs = require('fs');
const path = require('path');

const app = express();

var folderpath =  path.join(__dirname+'/files', 'upload');

app.use(express.static(__dirname+'/files'));

app.post('/submit', (req, res)=>{
    var form = new formidable.IncomingForm();
    form.parse(req, async function (err, fields, files) {
       var data = {n: fields.name , c: fields.city, d: fields.dob, t: fields.dot};

       fs.copyFile(files.photo.path, path.join(folderpath, files.photo.name),
       (err) => {
           if(err)
            return console.log(err);
            data.p = `/upload/${files.photo.name}`;
            res.json(data);
            res.end();
       });     
    });
});

app.listen(8989);
console.log('Server running at http://localhost:8989');