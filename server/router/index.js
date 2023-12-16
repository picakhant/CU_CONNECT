const router = require('express').Router();

const authRoute = require('./authRoute');
const userRoute = require('./userRoute');
const postRoute = require('./postRoute');
const likeRoute = require('./likeRoute');

router.use('/auth', authRoute);
router.use('/user', userRoute);
router.use('/post', postRoute);
router.use('/like', likeRoute);

module.exports = router;
