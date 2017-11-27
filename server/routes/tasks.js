var express = require('express');
var router = express.Router();

var pool = require('../modules/pool');


router.get('/', function (req, res) {
    // Attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!!!
            // Now, we're going to GET things from thd DB
            client.query('SELECT * FROM todo ORDER BY status DESC, id;', function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    // Query failed. Did you test it in Postico?
                    // Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.send(result.rows);
                }//end query else
            });//end query
        }//end connect else
    });//end pool connect
});//end router get


router.post('/', function(req, res){
    //attempt to connect to DB
    pool.connect(function(errorConnectingToDatabase, client, done){
        if (errorConnectingToDatabase) {
            //there was an error connecting to DB
            console.log('error connecting to DB', errorConnectingToDatabase);
            res.sendStatus(500);
        }
        else {
            //we connected to DB
            //now, we're going to GET things from DB
            client.query(`INSERT INTO TODO ("task", "status")
            VALUES ($1, $2);`,[req.body.task, req.body.status], function(errorMakingQuery, result){
                done();
                if (errorMakingQuery) {
                    //query failed , did you post in postico?
                    console.log('error making query', errorMakingQuery);
                    res.sendStatus(500);
                }
                else {
                    res.sendStatus(201); 
                }//end  query else
            });//end client query
        }//end connect else
    });//end pool connect
  })//end router post


  router.delete('/:id', function (req, res) {
    var taskIdToRemove = req.params.id;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`DELETE FROM TODO WHERE id=$1;`, [taskIdToRemove], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});

router.put('/:id', function (req, res) {
    var taskIdToTransfer = req.params.id;
    // Attempt to connect to database
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            // There was an error connecting to the database
            console.log('Error connecting to database', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            // We connected to the database!!!
            // Now, we're going to GET things from thd DB
            client.query(`UPDATE TODO
            SET "status" = 'complete'
            WHERE "id"=$1;`, [taskIdToTransfer], function (errorMakingQuery, result) {
                done();
                if (errorMakingQuery) {
                    // Query failed. Did you test it in Postico?
                    // Log the error
                    console.log('Error making query', errorMakingQuery);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
        }
    });
});






module.exports = router;