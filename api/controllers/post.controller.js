
import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) =>{
    try {
        const postPayload = { ...req.body, approved: false };
        const post = await Post.create(postPayload);
        return res.status(201).json(post);

    } catch (error) {
        next(error);
        
    }
}

export const deletePost = async (req, res, next) =>{
    const post = await Post.findById(req.params.id);

    if (!post) {
        return next (errorHandler(404, 'Post not found'));
    }
    if ( !req.user.isAdmin && req.user.id !== post.userRef.toString()) {
        return next(errorHandler(401, 'You can only delete your own posts!'));
    }
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json('Post has been deleted! ')
    } catch (error) {
        next(error);
    }
}

export const updatePost = async (req, res, next) =>{
    const post = await Post.findById(req.params.id);
    if (!post) {
        return next (errorHandler(404, 'Post not found'));
    }
    if (!req.user.isAdmin && req.user.id !== post.userRef) {
        return next(errorHandler(401, 'You can only update your own post!'));
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).json(updatedPost);
    } catch (error) {
        next(error)
    }
}

export const getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return next(errorHandler(404, 'Post not found'))
        }
        if (!post.approved) {
            return next(errorHandler(404, 'Post not found'));
        }
        res.status(200).json(post);
    } catch (error) {
        next(error)
    } 
    }

export const getAllPosts = async (req, res, next) => {
  try {
    // Extract search params from query string
    const { departmentName, address, category, includeUnapproved } = req.query;

    // Build a dynamic filter object
    const filter = {};

    if (departmentName) {
      filter.departmentName = { $regex: departmentName, $options: "i" }; // i = case-insensitive
    }
    if (address) {
      filter.address = { $regex: address, $options: "i" };
    }
    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    // Default: only approved posts
    filter.approved = true;

    // Allow including unapproved only if the requester is an admin (requires auth middleware on route)
    if (includeUnapproved === 'true' && req.user?.isAdmin) {
      delete filter.approved;
    }

    const posts = await Post.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

export const approvePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return next(errorHandler(404, 'Post not found'));

    if (!req.user?.isAdmin) {
      return next(errorHandler(403, 'Forbidden'));
    }

    post.approved = true;
    await post.save();

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
}