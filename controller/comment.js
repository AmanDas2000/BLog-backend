const Comment = require('../models/comment');

const addComment = (req, res) => {
    const { userId, blogId, content } = req.body;

    const newComment = new Comment({
        user: userId,
        blog: blogId,
        content
    });
    newComment.save()
        .then((comment) => {
            res.status(201).json({ comment, message: "comment added" })
        })
        .catch((err) => res.status(500).json({ err, message: "something went wrong!" }));
}

const getComments = (req, res) => {
    const blogId = req.params.blogId;
    Comment.find({ blog: blogId })
        .populate("user", "firstName lastName")
        .then((comments) => {
            res.status(201).json({ comments })
        }).catch((err) => res.status(500).json({ err, message: "something went wrong!" }));
}

const deleteComment = (req, res) => {
    const commentId = req.params.commentId;
    Comment.findOneAndDelete({ _id: commentId })
        .then(() => {
            res.status(201).json({ message:"deleted comment" })
        }).catch((err) => res.status(500).json({ err, message: "something went wrong!" }));
}

module.exports = {
    addComment,
    getComments,
    deleteComment
}