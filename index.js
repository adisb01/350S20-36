
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

var lost_item = require('./lost_item.js');
var found_item = require('./found_item.js');
var user = require('./user.js');

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

// GET to create a new user, ex: 'http://localhost:3000/create-user' and get request
// query with body being user object json attributes
app.use('/create-user', (req, res) => {
    var newUser = new user ({
    	id: parseInt(req.query.id),
    	username: req.query.username,
    	password: req.query.password,
    	last_login: Date.parse(req.query.last_login),
    	lost_items: req.query.lost_items,
    	found_items: req.query.found_items,
    	status: parseInt(req.query.status)
    });

    newUser.save( (err) => {
    	if (err) {
    		res.json({'status' : err})
    		console.log(err)
    	}
    	else {
    		res.json({'status': 'success'});
    		console.log('successfully created new user')
    	}
    })

});

// GET all users, ex: 'http://localhost:3000/all-users'
app.use('/all-users', (req, res) => {
    user.find ( (err, allItems) => {
        if (err) {
            res.json({'status' : err});
        }
        else if (allItems.length == 0) {
            res.json({'status' : 'no users'});
        }
        else {
            res.json({'status' : 'success', 'items' : allItems});
            console.log('successfully gotten all users');
        }
    });
});

// GET specific user, ex: 'http://localhost:3000/get-user?id=1'
app.use('/get-user', (req, res) => {
    var searchId = parseInt(req.query.id);
    user.findOne({id: searchId}, (err, item) => {
        if (err) {
            res.json({'status': err});
        }
        else if (!item) {
            res.json({'status': 'no item'});
        }
        else {
            res.json({'status': 'success', 'user': item});
            console.log('successfully gotten user');
        }
    })
});

// GET to update to db, ex: address is 'http://localhost:3000/update-user' and 
// req params contains new object's json attributes
app.use('/update-user', (req, res) => {
    var updateId = parseInt(req.query.id);
    user.findOne({id: updateId}, (err, item) => {
        if (err) {
            res.json({'status': err});
        }
        else if (!item) {
            res.json({'status': 'no item'});
        }
        else {
    		item.username = req.query.username,
    		item.password = req.query.password,
    		item.last_login = Date.parse(req.query.last_login),
    		item.lost_items = req.query.lost_items,
    		item.found_items = req.query.found_items,
    		item.status = parseInt(req.query.status)
            item.save((err) => {
                if (err) {
                    res.json({'status': err});
                }
                else {
                    res.json({'status': 'success'});
                    console.log('successfully updated user');
                }
            })
        }
    })
});

// GET to create a lost item, ex: 'http://localhost:3000/create-lost-item' and get request
// with body being lost-item object json attributes
app.use('/create-lost-item', (req, res) => {
    var newLostItem = new lost_item ({
        id: parseInt(req.query.id),
        posterId: parseInt(req.query.posterId),
        category: req.query.category,
        date: Date.parse(req.query.date),
        latitude: parseFloat(req.query.latitude),
        longitude: parseFloat(req.query.longitude),
        around: req.query.around,
        description: req.query.description,
        attachmentLoc: req.query.attachmentLoc,
        additionalInfo: req.query.additionalInfo
    });

    newLostItem.save( (err) => {
        if (err) {
            res.json({'status' : err});
            console.log(err)
        } 
        else {
            res.json({'status' : 'success'});
            console.log('successfully posted lost item');
        }
    })

});

// GET all lost items, ex: 'http://localhost:3000/all-lost-items'
app.use('/all-lost-items', (req, res) => {
    lost_item.find ( (err, allItems) => {
        if (err) {
            res.json({'status' : err});
        }
        else if (allItems.length == 0) {
            res.json({'status' : 'no items'});
        }
        else {
            res.json({'status' : 'success', 'items' : allItems});
            console.log('successfully gotten all lost items');
        }
    });
});

// GET specific lost item, ex: 'http://localhost:3000/get-lost-item?id=1'
app.use('/get-lost-item', (req, res) => {
    var searchId = parseInt(req.query.id);
    lost_item.findOne({id: searchId}, (err, item) => {
        if (err) {
            res.json({'status': err});
        }
        else if (!item) {
            res.json({'status': 'no item'});
        }
        else {
            res.json({'status': 'success', 'lost-item': item});
            console.log('successfully gotten lost item');
        }
    })
});

// GET to update to db, ex: address is 'http://localhost:3000/update-lost-item' and 
// req body contains new object's json attributes
app.use('/update-lost-item', (req, res) => {
    var updateId = parseInt(req.query.id);
    lost_item.findOne({id: updateId}, (err, item) => {
        if (err) {
            res.json({'status': err});
        }
        else if (!item) {
            res.json({'status': 'no item'});
        }
        else {
            item.posterId = parseInt(req.query.posterId);
            item.category = req.query.category;
            item.date = Date.parse(req.query.date);
            item.latitude = parseFloat(req.query.latitude);
            item.longitude = parseFloat(req.query.longitude);
            item.around = req.query.around;
            item.description = req.query.description;
            item.attachmentLoc = req.query.attachmentLoc;
            item.additionalInfo = req.query.additionalInfo;
            item.save((err) => {
                if (err) {
                    res.json({'status': err});
                }
                else {
                    res.json({'status': 'success'});
                    console.log('successfully updated lost item');
                }
            })
        }
    })
});



// GET to create a found item, ex: 'http://localhost:3000/create-found-item' and get request
// with query params being found-item object json attributes
app.use('/create-found-item', (req, res) => {
    var newFoundItem = new found_item ({
        id: parseInt(req.query.id),
        posterId: parseInt(req.query.posterId),
        category: req.query.category,
        date: Date.parse(req.query.date),
        latitude: parseFloat(req.query.latitude),
        longitude: parseFloat(req.query.longitude),
        around: req.query.around,
    });

    newFoundItem.save( (err) => {
        if (err) {
            res.json({'status' : err});
            console.log(err)
        } 
        else {
            res.json({'status' : 'success'});
            console.log('successfully posted found item');
        }
    })

});

// GET all found items, ex: 'http://localhost:3000/all-found-items'
app.use('/all-found-items', (req, res) => {
    found_item.find ( (err, allItems) => {
        if (err) {
            res.json({'status' : err});
        }
        else if (allItems.length == 0) {
            res.json({'status' : 'no items'});
        }
        else {
            res.json({'status' : 'success', 'items' : allItems});
            console.log('successfully gotten all found items');
        }
    });
});

// GET specific found item, ex: 'http://localhost:3000/get-found-item?id=1'
app.use('/get-found-item', (req, res) => {
    var searchId = parseInt(req.query.id);
    found_item.findOne({id: searchId}, (err, item) => {
        if (err) {
            res.json({'status': err});
        }
        else if (!item) {
            res.json({'status': 'no item'});
        }
        else {
            res.json({'status': 'success', 'found-item': item});
            console.log('successfully gotten found item');
        }
    })
});

// GET to update to db, ex: address is 'http://localhost:3000/update-lost-item' and 
// req params contains new object's json attributes
app.use('/update-found-item', (req, res) => {
    var updateId = parseInt(req.query.id);
    found_item.findOne({id: updateId}, (err, item) => {
        if (err) {
            res.json({'status': err});
        }
        else if (!item) {
            res.json({'status': 'no item'});
        }
        else {
            item.posterId = parseInt(req.query.posterId);
            item.category = req.query.category;
            item.date = Date.parse(req.query.date);
            item.latitude = parseFloat(req.query.latitude);
            item.longitude = parseFloat(req.query.longitude);
            item.around = req.query.around;
            item.save((err) => {
                if (err) {
                    res.json({'status': err});
                }
                else {
                    res.json({'status': 'success'});
                    console.log('successfully updated found item');
                }
            })
        }
    })
});

