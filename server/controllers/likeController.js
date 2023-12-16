// like to posts and comments
const Post = require('../models/postModel');
const Like = require('../models/LikeModel');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/CustomError');
const Profile = require('../models/profileModel');

exports.likePost = asyncErrorHandler(async (req, res, next) => {
  const likedPost = await Post.findById(req.params.id);
  if (!likedPost) {
    return next(new CustomError('Post not found', 404));
  }
  const profile = await Profile.findOne({ account_id: req.account_id });
  if (!profile) {
    return next(new CustomError('Profile not found', 404));
  }
  const like = await Like.findOne({
    account_id: req.account_id,
    post: req.params.id,
  });
  // if alreadr liked and automatically unlike
  if (like) {
    await Like.deleteOne({
      _id: like._id,
    });
    likedPost.likes.pull(like._id);
    await likedPost.save();
    return res.status(200).json({
      success: true,
      message: 'Post unliked',
    });
  }
  // const user = await User.findById(req.account_id);
  // if (!user) {
  //     return next(new CustomError('User not found', 404));
  // }
  // if (likedPost.user.toString() !== req.account_id.toString()) {
  //     return next(new CustomError('You cannot like this post', 400));
  // }
  const newLike = await Like.create({
    account_id: req.account_id,
    post: req.params.id,
  });
  likedPost.likes.push(newLike._id);
  await likedPost.save();
  res.status(200).json({
    success: true,
    message: 'Post liked',
    newLike,
  });
});

// i need the specific data of the user who liked the post
exports.likedUsers = asyncErrorHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return next(new CustomError('Post not found', 404));
    }

    const likes = await Like.find({ post: req.params.id });

    if (likes.length === 0) {
      // Handle case where no likes are found
      return next(new CustomError('No likes found for this post', 404));
    }

    const accountIds = likes.map((like) => like.account_id);

    // Find all liked users based on accountIds
    const likedUsers = await Profile.find({ account_id: { $in: accountIds } });

    if (likedUsers.length === 0) {
      // Handle case where no liked users are found
      return next(new CustomError('No liked users found for this post', 404));
    }

    // Do something with the likedUsers, such as sending them in the response
    res.status(200).json({ likedUsers });
  } catch (error) {
    // Handle any other errors that might occur during the process
    next(error);
  }
});
