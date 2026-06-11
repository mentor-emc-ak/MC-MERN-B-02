import express from 'express';
import Post from '../models/Post.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();


router.get('/', protect, async (req, res) => {
  const posts = await Post.find().populate('author', 'name email').sort('-createdAt');
  res.json(posts);
});

router.post('/', protect, async (req, res) => {
  const post = await Post.create({ ...req.body, author: req.user.id });
  res.status(201).json(post);
});

router.put('/:id', protect, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  Object.assign(post, req.body);
  await post.save();
  res.json(post);
});

router.delete('/:id', protect, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  if (post.author.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
  await post.deleteOne();
  res.json({ message: 'Post deleted' });
});

export default router;
