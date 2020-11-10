const mongoose = require('mongoose');

const StudentScoreSchema = new mongoose.Schema({
	sid: {
		type: String,
		required: true,
	},
	scores: [
		{
			g1: Number,
			g2: Number,
			g3: Number,
			g4: Number,

			date: {
				type: Number,
				default: Date.now(),
			},
			isImproved: {
				type: Boolean,
				default: false,
			},
			averageScore: {
				type: Number,
				default: 0,
			},
		},
	],
});

module.exports = mongoose.model('StudentScore', StudentScoreSchema);
