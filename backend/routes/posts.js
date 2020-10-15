const router = require('express').Router();
const { verifyToken } = require('../verify');

router.get('/', verifyToken, (req, res) => {
	res.json({ posts: { title: 'TITLE1', description: 'TERSAT' } });
});

module.exports = router;
