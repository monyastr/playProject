
var express = require('express');
var router = express.Router();
var fs = require("fs");




router.get('/', (req, res) => {
    let fileData = "";
    fs.readFile('database.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        let dataArray = [];
        console.log("Asynchronous read: " + data.toString());
        fileData = data.toString().split(';');
        for (let i = 0; i < fileData.length - 1; i++) {
            let parsedData = JSON.parse(fileData[i]);
            console.log(parsedData);
            dataArray[i] = parsedData;
        }

        res.render('grid.ejs', { myData: dataArray });
    });


});

router.get('/create', (req, res) => {
    res.render('addEntity.ejs');
});

router.post('/create', (req, res) => {
    res.render('addEntity.ejs');

    fs.readFile('database.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        let fileData = data.toString().split(';');
        let lastItemIndex = fileData.length - 1;
        let idNumber = 0;
        if (lastItemIndex > 0) {
            let parsedData = JSON.parse(fileData[lastItemIndex - 1]);
            idNumber = +parsedData.id + 1;
        }
        let id = { "id": idNumber.toString() };
        let dataToWrite = JSON.stringify(Object.assign({}, id, req.body), null, 2);
        dataToWrite += ';';
        console.log(dataToWrite);
        fs.appendFile('database.json', dataToWrite, function (err) {
            if (err) {
                return console.error(err);
            }
        });

    });


});

router.post('/(:id)/delete', (req, res) => {
    console.log(req.params.id);
    fs.readFile('database.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("Asynchronous read in delete: ");
        let fileData = data.toString().split(';');
        let dataToWrite = '';
        for (let i = 0; i < fileData.length - 1; i++) {
            let parsedData = JSON.parse(fileData[i]);
            console.log('File data:' + fileData[i]);
            if (parsedData.id === req.params.id) {
                console.log('deleted');
                continue;
            }
            dataToWrite += fileData[i] + ';';
        }

        fs.writeFile('database.json', dataToWrite, function (err) {
            if (err) {
                return console.error(err);
            }
        });
    });
    res.redirect('/entities');
});

router.get('/(:id)/edit', (req, res) => {
    console.log(req.params.id);
    fs.readFile('database.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("Asynchronous read in edit: ");
        let fileData = data.toString().split(';');
        let sendData = '';
        for (let i = 0; i < fileData.length - 1; i++) {
            let parsedData = JSON.parse(fileData[i]);
            if (parsedData.id === req.params.id) {
                console.log('deleted');
                sendData = parsedData
            }
        }

        res.render('editEntity.ejs', { myData: sendData });
    });

});

router.post('/(:id)/edit', (req, res) => {
    console.log(req.params.id);
    fs.readFile('database.json', function (err, data) {
        if (err) {
            return console.error(err);
        }
        console.log("Asynchronous read in delete: ");
        let fileData = data.toString().split(';');
        let dataToWrite = '';
        for (let i = 0; i < fileData.length - 1; i++) {
            let parsedData = JSON.parse(fileData[i]);
            console.log('File data:' + fileData[i]);
            if (parsedData.id === req.params.id) {
                console.log('edit');
                let id = { "id": parsedData.id.toString() };
                fileData[i] = JSON.stringify(Object.assign({}, id, req.body), null, 2);

            }
            dataToWrite += fileData[i] + ';';
        }

        fs.writeFile('database.json', dataToWrite, function (err) {
            if (err) {
                return console.error(err);
            }
        });
    });
    res.redirect('/entities');
});
module.exports = router;