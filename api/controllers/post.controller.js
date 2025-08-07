
import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const createPost = async (req, res, next) =>{
    try {
        const post = await Post.create(req.body);
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
        res.status(200).json(post);
    } catch (error) {
        next(error)
    } 
    }

    export const getAllPosts = async (req, res, next) => {
      try {
          

          let category = req.query.category;

          if (category === undefined || category === 'all') {
            category = { $in: ['hospital', 'bloodbank', 'policedep', 'firedep'] };
          }

          const searchTerm = req.query.searchTerm || '';

    const sort = req.query.sort || 'createdAt';

    const order = req.query.order || 'desc';
    const query = {};

          if (searchTerm) {
            query.$or = [
              { departmentName: { $regex: searchTerm, $options: 'i' } },
              { address: { $regex: searchTerm, $options: 'i' } },
            ];
          }

          if (category !== undefined) query.category = category;
      
      const Posts = await Post.find(query)
        .sort({ [sort]: order })
        
        const totalPosts = await Post.countDocuments();
  
      const now = new Date();
  
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
  
      const lastMonthPosts = await Post.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      
  
        return res.status(200).json(Posts, totalPosts,
          lastMonthPosts,);
  
      } catch (error) {
          next(error);
      }
  }