
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());

var lost_item = require('./Schemas/lost_item');
var found_item = require('./Schemas/found_item');
var user = require('./Schemas/user');
var admin = require('./Schemas/admin');
var ban = require('./Schemas/ban');
var warning = require('./Schemas/warning');
const Chat = require('./Schemas/chat'); 
const Message = require('./Schemas/message'); 

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

//Import Routes

const chatRoute = require('./routes/chatRoute')
const messageRoute = require('./routes/messageRoute')

//Use middleware chat and messaging routes

app.use('/chat', chatRoute); 
app.use('/message', messageRoute); 

// GET route to create a new user, ex: 'http://localhost:3000/create-user...' and get request
// query has parameters that are the user object json attributes
app.use('/create-user', (req, res) => {
	var lost_items_array= JSON.parse(req.query.lost_items)
	var found_items_array= JSON.parse(req.query.found_items)
	console.log(lost_items_array)
    var newUser = new user ({
    	id: parseInt(req.query.id),
    	username: req.query.username,
    	password: req.query.password,
    	last_login: Date.parse(req.query.last_login),
    	lost_items: lost_items_array,
    	found_items: found_items_array,
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

// GET route to update the db, ex: address is 'http://localhost:3000/update-user' and 
// query params contains new object's json attributes
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
        	if (req.query.username) {
        		item.username = req.query.username;
        	}
        	if (req.query.password) {
        		item.password = req.query.password;
        	}
        	if (req.query.last_login) {
        		item.last_login = Date.parse(req.query.last_login);
        	}
        	if (req.query.lost_items) {
        		var lost_items_array= JSON.parse(req.query.lost_items);
        		item.lost_items = lost_items_array;
        	}
        	if (req.query.found_items) {
        		var found_items_array= JSON.parse(req.query.found_items);
        		item.found_items = found_items_array;
        	}
        	if (req.query.status) {
        		item.status = parseInt(req.query.status)
        	}
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
// has query params being lost-item object json attributes
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

// GET route to update the db, ex: address is 'http://localhost:3000/update-lost-item' and 
// query params contains new object's json attributes
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
        	if (req.query.posterId) {
        		item.posterId = parseInt(req.query.posterId);
        	}
        	if (req.query.category) {
        		item.category = req.query.category;
        	}
        	if (req.query.date) {
        		item.date = Date.parse(req.query.date);
        	}
            if (req.query.latitude) {
            	item.latitude = parseFloat(req.query.latitude);
            }
            if (req.query.longitude) {
            	item.longitude = parseFloat(req.query.longitude);
            }
            if (req.query.around) {
            	item.around = req.query.around;
            }
            if (req.query.description) {
            	item.description = req.query.description;
            }
            if (req.query.attachmentLoc) {
            	item.attachmentLoc = req.query.attachmentLoc;
            }
            if (req.query.additionalInfo) {
            	item.additionalInfo = req.query.additionalInfo;
            }
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
// query params contains new object's json attributes
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
        	if (req.query.posterId) {
        		item.posterId = parseInt(req.query.posterId);
        	}
        	if (req.query.category) {
        		item.category = req.query.category;
        	}
        	if (req.query.date) {
        		item.date = Date.parse(req.query.date);
        	}
            if (req.query.latitude) {
            	item.latitude = parseFloat(req.query.latitude);
            }
            if (req.query.longitude) {
            	item.longitude = parseFloat(req.query.longitude);
            }
            if (req.query.around) {
            	item.around = req.query.around;
            }
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

// GET specific admin user
app.use('/get-admin', (req, res) => {
    var searchUsername = req.query.username;
    var reqPassword = req.query.password;
    console.log(searchUsername);
    admin.findOne({username: searchUsername}, (err, item) => {
        if (err) {
            res.json({'status': err});
        }
        else if (!item) {
            res.json({'status': 'no admin'});
        }
        else {
        	console.log('successfully gotten admin');
        	if (reqPassword.localeCompare(item.password) == 0) {
        		console.log('admin pass correct');
        		res.json({'status': 'success'});
        	} else {
        		console.log('admin pass incorrect');
        		res.json({'status': 'incorrect password'})
        	}
        }
    })
});



// GET to create a warning 
// ex: 'http://localhost:3000/warn?userId=2&message=hey' 
app.use('/warn', (req, res) => {
    var newWarning = new warning ({
        userId: parseInt(req.query.userId),
        seen: false,
        message: req.query.message,
    });

    newWarning.save( (err) => {
        if (err) {
            res.json({'status' : err});
            console.log(err)
        } 
        else {
            res.json({'status' : 'success'});
            console.log('successfully created warning');
        }
    })
});

// GET specific warnings for the user
app.use('/get-warnings', (req, res) => {
    var id = parseInt(req.query.userId);
    warning.find({userId: id}, (err, item) => {
        if (err) {
            res.json({'status': err});
            console.log(err);
        }
        else if (item.length == 0) {
            res.json({'status': 'no warnings'});
            console.log('no warnings found');
        }
        else {
            res.json({'status': 'success', 'warnings': item});
            console.log('successfully gotten warnings');
        }
    })
});

// GET to update warnings for a user to be seen
app.use('/see-warnings', (req, res) => {
    var id = parseInt(req.query.userId);
    warning.find({userId : id}, (err, allItems) => {
        if (err) {
            res.json({'status' : err});
        }
        else if (allItems.length == 0) {
            res.json({'status' : 'no warnings'});
        }
        else {
        	allItems.forEach(function (w) {
        		w.seen = true;
        		w.save((err) => {
	                if (err) {
	                    console.log(err);
	                } else {
	                    console.log('successfully updated warning');
	                }
	            });
        	});
            res.json({'status' : 'success', 'warnings' : allItems});
            console.log('successfully seen warnings');
        }
    });
});

// GET to create a ban
// ex: 'http://localhost:3000/ban' 
app.use('/ban', (req, res) => {
    var newBan = new ban ({
        userId: parseInt(req.query.userId),
        until: Date.parse(req.query.until),
        message: req.query.message,
    });

    newBan.save( (err) => {
        if (err) {
            res.json({'status' : err});
            console.log(err)
        } 
        else {
            res.json({'status' : 'success'});
            console.log('successfully created ban');
        }
    })
});

// GET to unban a user
app.use('/unban', async (req, res) => {
	id = parseInt(req.query.userId);
	const result = await ban.deleteOne({"userId" : id}).exec()
	if (result.deletedCount == 0) {
		console.log('user is not currently banned');
	} else {
		console.log('successfully unbanned user with id ' + id);
	}
	res.json({'status' : 'success'});
});

// GET a specific ban
app.use('/get-ban', (req, res) => {
    var id = parseInt(req.query.userId);
    ban.findOne({userId: id}, (err, item) => {
        if (err) {
            res.json({'status': err});
        }
        else if (!item) {
            res.json({'status': 'no ban'});
        }
        else {
            res.json({'status': 'success', 'ban': item});
            console.log('successfully gotten ban');
        }
    })
});
