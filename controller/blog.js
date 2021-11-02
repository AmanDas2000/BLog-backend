const Blog = require('../models/blog');


//READ
const getBlogs = (req, res) => {
    const userid = req.params.user;
    Blog.find({ user: userid }).populate("user","firstName lastName").then((blogs => res.json({ blogs })))
        .catch(err => res.status(500).json(err));
}

const getAllBlogs = (req, res) => {
    
    Blog.find().populate("user","firstName lastName").then((blogs => res.json({ blogs })))
        .catch(err => res.status(500).json(err));
}


//CREATE
const addBlog = (req, res) => {
    const user = req.user._id;
    const title = req.body.title;
    const content = req.body.content;

    const newBlog = new Blog({ title, content, user });

    newBlog.save((err, blog) => {
        if (err) {
            return res.status(500).json({
                message: "Something went wrong ✘"
            })
        }
        if (blog) {

            return res.status(201).json({
                title,
                content,
                user,
                message: "Blog added ✔",

            })
        }
    })
}


//DELETE
const removeBlog = (req, res) => {
    const blogId = req.params.id;


    Blog.findByIdAndDelete(blogId)
        .then(() => { res.json('blog deleted') })
        .catch(err => res.status(500).json('error' + err));
}

//UPDATE
const updateBlog = (req, res) => {
    const blogId = req.params.id;
    const title = req.body.title;
    const content = req.body.content;

    Blog.findById(blogId)
        .then((blog) => {
            blog.title = title;
            blog.content = content;

            blog.save().then(() => { res.json('Updated') })
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json('error' + err));
}

const like = (req, res) => {
    const { userId, blogId } = req.body;
    let flag;

    Blog.findOne({ _id: blogId })
        .then((blog) => {
            //console.log("array: ",blog.likes)
            const found=blog.likes.find(e => e.toString() === userId)
                if (found) {
                    blog.likes = blog.likes.filter((element) => element.toString() !== userId);
                    //console.log("removed", blog.likes);
                    flag = false;
                } else {
                    blog.likes.push(userId);
                    //console.log("Added", blog.likes);
                    flag = true;
                }
        
            blog.save().then((blog) => {
                //console.log(blog.likes)
                res.status(201).json({ flag });
            })
                .catch(err => res.status(500).json(err));
        })
        .catch(err => res.status(500).json(err));


}

const ifliked = (req, res) => {
    const { userId, blogId } = req.body;
    let flag;

    Blog.findOne({ _id: blogId })
        .then((blog) => {
            //console.log("array: ", blog.likes)
            const found = blog.likes.find(e => e.toString() === userId)
            if (found) {
                flag = true;
                
            } else {
                    
                flag = false;
            }
            res.status(201).json({ flag });
        
        })
        .catch(err => res.status(500).json(err));


}


module.exports = {
    addBlog,
    getBlogs,
    removeBlog,
    updateBlog,
    like,
    getAllBlogs,
    ifliked
};