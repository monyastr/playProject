'use strict'
var mysql = require('mysql2');
var Sequelize = require('sequelize');
var sequelize = require('../Sequelize')

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "quest1!",
    database: "entitiesdb2"
});

var getEntities = async (req, res) => {
    var entities = await sequelize.findAll();   
    res.render('grid.ejs', { myData: entities });
   
    
};

var showEntity = (req, res) => {
    res.render('editEntity.ejs', { myData: req.entity });

};

var deleteEntity = (req, res) => {
    sequelize.destroy({
        where: { id: req.params.id }
    });
    res.redirect('/entities');
};

var createEntity = (req, res) => {
    sequelize.create({
        name: req.body.name,
        list: req.body.list,
        date: req.body.date
    })
    res.render('addEntity.ejs');

};

var editEntity = (req, res) => {
    sequelize.update({
        name: req.body.name,
        list: req.body.list,
        date: req.body.date,
    }, {
            where: { id: req.entity.id }
        });    
    res.redirect('/entities');
};

var getAddEntityForm = (req, res) => {
    res.render('addEntity.ejs');
};

var getEntity = (req, res, next) => {
    var id = [req.params.entityId];    
    sequelize.findById(+id) 
        .then(result => {
            console.log(result.dataValues);
            req.entity = result.dataValues;
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
