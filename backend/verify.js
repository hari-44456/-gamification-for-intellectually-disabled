const jwt = require('jsonwebtoken');
const Teacher = require('./models/Teacher');

const verifyToken = (req, res, next) => {
	if (!req.headers['auth-token'])
		return res.status(401).send('You are not logged in');
	try {
		const verified = jwt.verify(
			req.headers['auth-token'],
			process.env.TOKEN_SECRET,
		);
		req.user = verified;
		next();
	} catch (err) {
		res.status(400).send('Invalid Token');
	}
};

const verifyAdmin = (req, res, next) => {
	Teacher.findById(req.user._id, (err, doc) => {
		if (err) return res.status(400).send('Error occured');
		if (!doc || !doc.isAdmin)
			return res
				.status(403)
				.send(
					'You can not access this route because you are not admin',
				);
		next();
	});
};

module.exports.verifyAdmin = verifyAdmin;
module.exports.verifyToken = verifyToken;
