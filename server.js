import express from 'express';
import { blogPosts } from './blogPosts.js';
const app = express();

app.get('/blogs', (req, res) => {
  res.status(200).json({ success: true, blog: blogPosts });
});

app.get('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  const blog = blogPosts.find(blog => blog.id === blogId);

  if (!blog) {
    return res.status(404).json({ success: false, message: 'Blog not found' });
  }

  res.status(200).json({ success: true, blog });
});

app.post('/blogs', (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ success: false, message: 'Title and content are required' });
  }

  const newBlog = {
    id: String(Date.now()),
    title,
    content,
  };

  blogPosts.push(newBlog);
  res
    .status(201)
    .json({ success: true, message: 'Blog published successfully' });
});

app.put('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  const { title, content } = req.body;

  const blog = blogPosts.find(blog => blog.id === blogId);

  if (!blog) {
    return res.status(404).json({ success: fasle, message: 'Blog not found' });
  }

  blog.title = title || blog.title;
  blog.content = content || blog.content;

  res.status(200).json({ success: true, message: 'Blog updated successfully' });
});

app.delete('/blogs/:id', (req, res) => {
  const blogId = req.params.id;

  const blogIndex = blogPosts.findIndex(blog => blog.id === blogId);

  if (blogIndex === -1) {
    return res.status(404).json({ success: false, message: 'Blog not found' });
  }

  blogPosts.splice(blogIndex, 1)[0];
  res.status(200).json({ success: true, message: 'Blog deleted successfully' });
});

app.patch('/blogs/:id', (req, res) => {
  const blogId = req.params.id;
  const { title, content } = req.body;

  const blogIndex = blogPosts.findIndex(blog => blog.id === blogId);

  if (blogIndex === -1) {
    return res.status(404).json({ success: false, message: 'Blog not found' });
  }

  const updatedBlog = {
    id: blogId,
    title: title || blogPosts[blogIndex].title,
    content: content || blogPosts[blogIndex].content,
  };

  blogPosts[blogIndex] = updatedBlog;
  res
    .status(200)
    .json({ success: true, message: 'Blog replaced successfully' });
});

app.listen(4000, () => {
  console.log('Server running at port 4000');
});
