import mongoose from "mongoose";
import PostMessage from "../models/postsMessage.js";
export const getPosts = async(req, res) => {

    try {


        const postMessages = await PostMessage.find();


        res.status(200).json(postMessages)
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
}


export const createPosts = async(req, res) => {
    console.log("creade");
    const post = req.body;

    const newPost = new PostMessage({
        ...post,
        creator: req.userId,
        createdAt: new Date().toISOString()
    })
    console.log(newPost);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({
            message: error.message
        })
    }

}

export const updatePost = async(req, res) => {

    const {
        id: _id
    } = req.params;
    const post = req.body

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id")

    const update = await PostMessage.findByIdAndUpdate(_id, post, {
        new: true
    })

    res.json(update)
}

export const deletePost = async(req, res) => {

    const {
        id: _id
    } = req.params;
    console.log(_id);
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("NO post with that id")
    await PostMessage.findByIdAndRemove(_id);

    res.json({
        message: "Post deleted successfully"
    })

}

export const likePost = async(req, res) => {

    const {
        id: _id
    } = req.params;

    if (!req.userId) return res.json({
        message: 'unauthenticated'
    })
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("NO post with that id");
    const post = await PostMessage.findById(_id)
    const index = post.likes.findIndex((id) => id === String(req.userId));
    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
        new: true
    })

    res.json(updatedPost);
}