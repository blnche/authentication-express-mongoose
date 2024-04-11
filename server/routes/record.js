const express = require('express');

const recordRoutes = express.Router();

const dbo = require('../db/conn');

const ObjectId = require ('mongodb').ObjectId;

//GET ALL
recordRoutes.route('/record').get( (req, res) => {
    let db_connect = dbo.getDb('test');
console.log(db_connect);
    db_connect
        .collection('records')
        .find({})
        .toArray( (err, result) => {
            if (err) {
                console.log('Error: '+err);
                return;
            }
            res.json(result);
        });
});

// GET ELEMENT BY ID
recordRoutes.route('/record/:id').get( (req, res) => {
    let db_connect = dbo.getDb('test');
    let query = {_id: new ObjectId(req.params.id)};

    db_connect
        .collection('records')
        .findOne(query, (err, result) => {
            if(err) throw err;
            res.json(result);
        });
});

// CREATE ELEMENT
recordRoutes.route('/record/add').post( (req, res) => {
    let db_connect = dbo.getDb('test');
    let obj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level
    };

    db_connect
        .collection('records')
        .insertOne(obj, (err, result) => {
            if (err) throw err;
            res.json(result);
        });
});

// UPDATE ELEMENT
recordRoutes.route('/update/:id').post( (req, res) => {
    let db_connect = dbo.getDb('test');
    let query = {_id: new ObjectId(req.params.id)};
    let newValues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level
        }
    };

    db_connect
        .collection('records')
        .updateOne(query, newValues, (err, result) => {
            if (err) throw err;
            console.log('1 document updated');
            res.json(result);
        });
});


// DELETE ELEMENT
recordRoutes.route('/:id').delete( (req, res) => {
    let db_connect = dbo.getDb('test');
    let query = {_id: ObjectId(req.params.id)};

    db_connect
        .collection('records')
        .deleteOne(query, (err, result) => {
            if (err) throw err;
            console.log('1 document deleted');
            res.json(result);
        });
});

module.exports = recordRoutes;