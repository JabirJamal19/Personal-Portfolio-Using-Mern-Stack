import Blog from '../models/Blog.js';

export const getAllBlogs = async (req, res) => {
  try {
    const { category, tag, search, published = 'true' } = req.query;
    let query = { published: published === 'true' };

    if (category) query.category = category;
    if (tag) query.tags = tag;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }

    const blogs = await Blog.find(query).sort({ createdAt: -1 }).select('-content');
    res.status(200).json({ status: 'success', results: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getBlogsByTag = async (req, res) => {
  try {
    const blogs = await Blog.find({ tags: req.params.tag, published: true })
      .sort({ createdAt: -1 }).select('-content');
    res.status(200).json({ status: 'success', results: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ status: 'error', message: 'Blog not found' });
    res.status(200).json({ status: 'success', data: blog });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const incrementViews = async (req, res) => {
  try {
    const blog = await Blog.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!blog) return res.status(404).json({ status: 'error', message: 'Blog not found' });
    res.status(200).json({ status: 'success', data: { views: blog.views } });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    res.status(201).json({ status: 'success', data: blog });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!blog) return res.status(404).json({ status: 'error', message: 'Blog not found' });
    res.status(200).json({ status: 'success', data: blog });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ status: 'error', message: 'Blog not found' });
    res.status(200).json({ status: 'success', message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};
