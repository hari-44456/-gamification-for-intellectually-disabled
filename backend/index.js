const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();

mongoose.connect(
	process.env.DB_CONNECT,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
	},
	() => console.log('connected to db...'),
);
 
app.use(express.json());
app.use(cors({ origin: true }));

app.get('/hari', (req, res) => {
	res.status(200).send('Api is live...');
});

const studentAuthRoute = require('./routes/studentAuth');
const teacherAuthRoute = require('./routes/teacherAuth');
const adminAuthRoute = require('./routes/adminAuth');
const postroute = require('./routes/posts');
const scoreRoute = require('./routes/score');

// Route middlewares
app.use('/api/auth/student', studentAuthRoute);
app.use('/api/auth/teacher', teacherAuthRoute);
app.use('/api/auth/admin', adminAuthRoute);
app.use('/api/auth/posts', postroute);
app.use('/student/score', scoreRoute);

const PORT=process.env.PORT || 5001;
app.listen(PORT, () => console.log(`running on port ${PORT}...`));
