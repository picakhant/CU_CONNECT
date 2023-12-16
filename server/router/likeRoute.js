const router = require('express').Router();
const { verifyJWT } = require('../middleware/verifyJWT');
const { likePost, likedUsers } = require('../controllers/likeController');

router.route('/:id').post(verifyJWT, likePost);
router.route('/:id').get(verifyJWT, likedUsers);

module.exports = router;
