//routers/calendars.js

const express = require('express');
const router = express.Router();
const models = require('./../models');
const Calendar = models.Calendar;
const sequelize = models.sequelize;

// ----------------------------------------
// Index
// ----------------------------------------
const onIndex() {
	Calendar.findAll()
			.then(calendars => {
					res.render('calendars/index', { calendars });
			})
			.catch(e => {
				res.status(500).send(e.stack);
			});
};

router.get('/', onIndex);

// ----------------------------------------
// New
// ----------------------------------------
router.get('/calendars/new', (req, res) => {
	res.render('calendars/new');
});

// ----------------------------------------
// Show
// ----------------------------------------
router.get('/calendars/:id', (req, res) => {
	Calendar.findById(req.params.id)
			.then(calendar => {
				if(calendar)
					res.render('/calendar/show', { calendar ]});
				else 
					res.send(404);
			})
			.catch(e => {
				res.status(500).send(e.stack);
			});
});

// ----------------------------------------
// Edit
// ----------------------------------------
router.get('/calendars/:id/edit', (req, res) => {
	Calendar.findById(req.params.id)
			.then(calendar => {
				if(calendar)
					res.render('/calendars/edit', { calendar });
				else 
					res.send(404);
			})
			.catch(e => {
				res.status(500).send(e.stack);
			})
})

// ----------------------------------------
// Update
// ----------------------------------------
router.post('/calendars/:id', (req,res) => {
	Calendar.update({
		name: req.body.calendar.name,
		userId: req.body.calendar.userId
	}, {
		where: { id: req.params.id },
		limit: 1
	})
			.then(() => {
				req.method = 'GET';
				res.redirect(`/calendars/${ req.params.id }`);
			})
			.catch(e => {
				res.status(500).send(e.stack);
			});
});

// ----------------------------------------
// Create
// ----------------------------------------
router.post('/calendars', (req, res) => {
	Calendar.create({
		name: req.body.calendar.name,
		userId: req.body.calendar.userId
	})
			.then(calendar => {
				req.method = 'GET';
				res.redirect(`/calendars/${ calendar.id }`);
			})
			.catch(e => {
				res.status(500).send(e.stack);
			});
});

// ----------------------------------------
// Delete
// ----------------------------------------
router.get('/calendars/:id/delete', (req, res) => {
	Calendar.destroy({
		where : { id: req.params.id },
		limit: 1
	})
			.then(() => {
				req.method = 'GET';
				res.redirect('/calendars');
			})
			.catch(e => {
				res.status(500).send(e.stack);
			});
});




















































