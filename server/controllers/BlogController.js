import BlogPost from '../models/BlogPost.js';

export const getBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createBlogPost = async (req, res) => {
  const post = req.body;
  const newPost = new BlogPost(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
