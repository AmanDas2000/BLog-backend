const express = require('express');
const { addBlog, getBlogs, removeBlog, updateBlog, like, getAllBlogs, ifliked }=require('../controller/blog');
const requireSignin = require('../middleware');
const router = express.Router();


router.get('/get/:user', getBlogs);
router.get('/get', getAllBlogs);
router.post('/add', requireSignin, addBlog);
router.delete('/delete/:id', requireSignin, removeBlog);
router.post('/update/:id', requireSignin, updateBlog);
router.post('/like', requireSignin, like);
router.post('/ifliked',requireSignin,ifliked)

module.exports = router;