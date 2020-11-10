const router = require('express').Router();
const StudentScore = require('../models/StudentScore');
const { verifyToken } = require('../verify');

router.put('/', verifyToken, async (req, res) => {
	try {
		const { sid, g1, g2, g3, g4 } = req.body;

		const updatedDoc = await StudentScore.findOneAndUpdate(
			{ sid: sid },
			{
				$push: {
					scores: { g1, g2, g3, g4 },
				},
			},
			{
				new: true,
				upsert: true,
				// rawResult: true,
			},
		);
		res.status(200).send(JSON.stringify(updatedDoc));
	} catch (err) {
		console.log('Data incomplete', err);
		res.status(400).send(err);
	}
});

module.exports = router;
