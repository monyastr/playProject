'use strict';
var express = require('express');
var router = express.Router();
var entityController = require('../controllers/entityController')

router.get('/', entityController.getEntities);
router.get('/create', entityController.getAddEntityForm);
router.post('/create', entityController.createEntity);
router.post('/(:id)/delete', entityController.deleteEntity);
router.get('/(:entityId)/edit', entityController.showEntity);
router.post('/(:entityId)/edit', entityController.editEntity);
router.param('entityId', entityController.getEntity);

module.exports = router;