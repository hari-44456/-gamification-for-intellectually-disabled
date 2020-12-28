const router = require('express').Router();
const Teacher = require('../models/Teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { verifyToken, verifyAdmin } = require('../verify');

const validateEmail = (email) => {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

router.post('/register', verifyToken, verifyAdmin, (req, res) => {
	if (
		!req.body.name ||
		!req.body.email ||
		!validateEmail(req.body.email) ||
		!req.body.password
	)
		return res.status(400).send('Data Incomplete!!!');

	const user = new Teacher({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		isAdmin: true,
	});

	Teacher.findOne({ email: user.email }, async (err, doc) => {
		if (err) return res.status(400).send(err);
		if (doc) return res.status(400).send('Teacher Already Exists!!!');

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		user.password = hashPassword;

		user.save()
			.then((response) => res.send({ user: user._id }))
			.catch((err) => res.send(err));
	});
});

router.post('/login', (req, res) => {
	console.log(req.body);
	if (!req.body.username || !req.body.password)
		return res.status(400).send('Data Incomplete!!!');

	Teacher.findOne(
		{ email: req.body.username, isAdmin: true },
		async (err, user) => {
			if (err) return res.send('Error occured while login route');
			if (!user) return res.status(400).send('You are not admin');

			const validPassword = await bcrypt.compare(
				req.body.password,
				user.password,
			);
			if (!validPassword)
				return res.status(400).send('Password is incorrect!!!');

			const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

			res.header('auth-token', token).send(token);
		},
	);
});

router.get('/logout', verifyToken, (req, res) => {
	if (!req.user) return res.status(400).send('You are not logged in');
	req.user = null;
	return res.status(200).send('logout successful');
});

module.exports = router;
