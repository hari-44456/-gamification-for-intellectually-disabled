const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
dotenv.config();

mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	() => console.log('connected to db...'),
);

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

const studentAuthRoute = require('./routes/studentAuth');
const teacherAuthRoute = require('./routes/teacherAuth');
const adminAuthRoute = require('./routes/adminAuth');
const postroute = require('./routes/posts');

// Route middlewares
app.use('/api/auth/student', studentAuthRoute);
app.use('/api/auth/teacher', teacherAuthRoute);
app.use('/api/auth/admin', adminAuthRoute);
app.use('/api/auth/posts', postroute);

app.listen(5000, () => console.log('running on 5000...'));
