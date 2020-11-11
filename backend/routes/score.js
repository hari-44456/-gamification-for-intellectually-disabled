const router = require('express').Router();
const StudentScore = require('../models/StudentScore');
const { verifyToken } = require('../verify');

router.put('/g1', async (req, res) => {
	try {
		const { sid = -1, g1 = -1, g2 = -1, g3 = -1, g4 = -1 } = req.body;

		if (sid == -1 || g1 == -1)
			return res
				.status(400)
				.send('Please Provide student id and score of g1 game');

		StudentScore.findOne({ sid }, async (err, doc) => {
			if (err) return res.status(400).send('Error...');

			if (!doc) {
				const newDoc = new StudentScore({
					sid,
					scores: { g1, g2, g3, g4 },
				});

				try {
					const result = await newDoc.save();
					return res
						.status(200)
						.send(`score saved... ${JSON.stringify(result)}`);
				} catch (err) {
					return res
						.status(400)
						.send(
							`error while saving the document ${JSON.stringify(
								err,
							)}`,
						);
				}
			}

			// Update doc
			const getIndex = (scores) => {
				let i = 0;
				scores.forEach((item) => {
					if (
						item.date.search(
							new Date().toISOString().substring(0, 10),
						) != -1
					)
						return i;
					i++;
				});
				return -1;
			};

			const index = getIndex(doc.scores);
			console.log(index);

			if (index == -1) doc.scores.push({ g1, g2, g3, g4 });
			else {
				console.log(doc.scores[index]);
				if (g1 > doc.scores[index].g1) doc.scores[index].g1 = g1;
				if (g2 > doc.scores[index].g2) doc.scores[index].g2 = g2;
				if (g3 > doc.scores[index].g3) doc.scores[index].g3 = g3;
				if (g4 > doc.scores[index].g4) doc.scores[index].g4 = g4;
			}
			try {
				console.log(JSON.stringify(doc.scores));
				const result2 = await doc.updateOne(
					{ sid },
					{
						$set: { scores: doc.scores },
					},
				);
				return res
					.status(200)
					.send(`updated successfully...${JSON.stringify(result2)}`);
			} catch (error) {
				console.log('err');
				return res.status(400).send(error);
			}
		});
	} catch (err) {
		console.log('Data incomplete', err);
		res.status(400).send(err);
	}
});

module.exports = router;
