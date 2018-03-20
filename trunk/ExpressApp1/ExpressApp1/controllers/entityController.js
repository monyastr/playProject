'use strict'
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "quest1!",
    database: "entitiesDb"
});

var getEntities = (req, res) => {
    var sql = "SELECT * FROM entities;";
    mysqlRequest(sql).then(
        result => { res.render('grid.ejs', { myData: result }) }
    );
};

var showEntity = (req, res) => {
    res.render('editEntity.ejs', { myData: req.entity });

};

var deleteEntity = (req, res) => {
    var inserts = [req.params.id];
    var sql = "DELETE FROM entities WHERE id = ?";
    mysqlRequest(sql, inserts);
    res.redirect('/entities');
};

var createEntity = (req, res) => {
    var name = req.body.name;
    var list = req.body.list;
    var date = req.body.date;
    var inserts = [name, list, date];
    var sql = "INSERT INTO entities (name, list, date) VALUES (?, ?, ?)";
    mysqlRequest(sql, inserts);
    res.render('addEntity.ejs');

};

var editEntity = (req, res) => {
    var name = req.body.name;
    var list = req.body.list;
    var date = req.body.date;
    var id = req.entity[0].id;    
    var inserts = [name, list, date, id];
    var sql = "UPDATE entities SET name = ?, list = ?, date = ? WHERE id = ?";
    mysqlRequest(sql, inserts);
    res.redirect('/entities');
};

var getAddEntityForm = (req, res) => {
    res.render('addEntity.ejs');
};

var mysqlRequest = (sql, inserts) => {
    console.log(mysql.format(sql, inserts));
    return new Promise((resolve, reject) => {
        connection.query(sql, inserts, (err, result) => {
            if (err) throw err;
            resolve(result);
        });
    });
};


var getEntity = (req, res, next) => {
    var inserts = [req.params.entityId];
    var sql = "SELECT * FROM entities WHERE id = ?;";
    mysqlRequest(sql, inserts)
        .then(result => {
            req.entity = result;
            next()
        });
};

module.exports = {
    showEntity,
    getEntities,
    createEntity,
    deleteEntity,
    editEntity,
    getAddEntityForm,
    getEntity
};
