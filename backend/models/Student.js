const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: Date,
		required: true,
	},
	username: {
		type: String,
		required: true,
		max: 255,
	},
	password: {
		type: String,
		required: true,
		max: 1024,
		min: 6,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Student', StudentSchema);
