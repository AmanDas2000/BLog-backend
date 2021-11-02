const express = require('express');
const { addComment, getComments, deleteComment } = require('../controller/comment');
const router = express.Router();
const requireSignin = require('../middleware');

router.post('/add', requireSignin, addComment);
router.get('/get/:blogId', getComments);
router.delete('/delete/:commentId',requireSignin, deleteComment);


module.exports = router;