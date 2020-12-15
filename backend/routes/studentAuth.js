const router = require('express').Router();
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyToken, verifyAdmin } = require('../verify');

const validateDate = (date) => {
	if (new Date(date) == 'Invalid Date') return false;
	return true;
};

router.post('/register', verifyToken, verifyAdmin, (req, res) => {
	if (
		!req.body.id ||
		!req.body.name ||
		!req.body.dateOfBirth ||
		!validateDate(req.body.dateOfBirth) ||
		!req.body.username ||
		!req.body.password
	)
		return res.status(400).send('Data Incomplete!!!');

	req.body.dateOfBirth = new Date(req.body.dateOfBirth);

	const user = new Student({
		id: req.body.id,
		name: req.body.name,
		dateOfBirth: req.body.dateOfBirth,
		username: req.body.username,
		password: req.body.password,
	});

	Student.findOne({ id: user._id }, async (err, doc) => {
		if (err) return res.status(400).send(err);
		if (doc) return res.status(400).send('Student Already Exists!!!');

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		user.password = hashPassword;

		user.save()
			.then((response) => res.send({ user: user._id }))
			.catch((err) => res.send(err));
	});
});

router.post('/login', (req, res) => {
	if (!req.body.username || !req.body.password)
		return res.status(400).send('Data Incomplete!!!');

	Student.findOne({ username: req.body.username }, async (err, user) => {
		if (err)
			return res.status(400).send('Error occured while login route');
		
		if (!user) 
			return res.status(400).send('Email does not exists!!!'); 

		const validPassword =  bcrypt.compareSync(req.body.password,
			user.password,
		);
		if (!validPassword)
			return res.status(400).send('Password is incorrect!!!');

		const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);

		res.header('auth-token', token).send(token);
	});
});
 
router.get('/logout', verifyToken, (req, res) => {
	if (!req.user) return res.status(400).send('You are not logged in');
	req.user = null;
	return res.status(200).send('logout successful');
});

module.exports = router;
