//routers/users.js

const express = require('express');
const router = express.Router();
const models = require('./../models');
const User = models.User;
const sequelize = models.sequelize;

// ----------------------------------------
// Index
// ----------------------------------------
const onIndex = (req, res) => {
	User.findAll()
		.then(users => {
			res.render('users/index', { users });
		})
		.catch(e => {
			res.status(500).send(e.stack);
		});
};
router.get('/', onIndex);
router.get('/users', onIndex);

// ----------------------------------------
// New
// ----------------------------------------
router.get('/users/new', (req, res) => {
	res.render('users/new');
});

// ----------------------------------------
// Edit
// ----------------------------------------
router.get('/users/:id/edit', (req, res) => {
	User.findById(req.params.id)
		.then(user => {
			if(user)
				res.render('users/edit', { user });
			else
				res.send(404);
		})
		.catch(e => {
			res.status(500).send(e.stack);
		});
});

// ----------------------------------------
// Show
// ----------------------------------------
router.get('/users/:id', (req, res) => {
	User.findById(req.params.id)
		.then(user => {
			if(user)
				res.render('users/show', { user });
			else
				res.send(404);
		})
		.catch(e => {
			res.status(500).send(e.stack);
		});
});

// ----------------------------------------
// Create
// ----------------------------------------
router.post('/users', (req, res) => {
	const body = req.body;

	const userParams = {
		fname: body.user.fname,
		lname: body.user.lname,
		username: body.user.username,
		email: body.user.email
	};

	User.create(userParams)
		.then(user => {
			res.redirect(`/users/${ user.id }`)
		})
		.catch(e => {
			res.status(500).send(e.stack);
		})
});

// ----------------------------------------
// Update
// ----------------------------------------
router.post('/users/:id', (req, res) => {
	const userParams = req.body.user;

	User.update({
		fname: userParams.fname,
		lname: userParams.lname,
		username: userParams.username,
		email: userParams.email
	}, {
		where: { id: req.params.id },
		limit: 1
	})
		.then(() => {
			req.method = 'GET';
			res.redirect(`/users/${ req.params.id }`)
		})
		.catch(e => {
			res.status(500).send(e.stack);		
		})
});

// ----------------------------------------
// Delete
// ----------------------------------------
router.get('/users/:id/delete', (req, res) => {
	console.log('DELETE RAN');
	User.destroy({
		where: { id: req.params.id },
		limit: 1
	})
		.then(() => {
			req.method = 'GET';
			res.redirect('/users');
		})
		.catch(e => {
			res.status(500).send(e.stack);		
		})
})

module.exports = router;

























