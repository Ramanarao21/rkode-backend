import prisma from '../config/prisma.js';

class BlogService {
  // Get all blogs
  async getAllBlogs() {
    return await prisma.blog.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  // Get blog by ID
  async getBlogById(id) {
    return await prisma.blog.findUnique({
      where: { id: parseInt(id) }
    });
  }

  // Create new blog
  async createBlog(blogData) {
    const { category, title, author, readTime, content, image } = blogData;
    
    return await prisma.blog.create({
      data: {
        category,
        title,
        author,
        readTime,
        content,
        image
      }
    });
  }

  // Update blog
  async updateBlog(id, blogData) {
    const { category, title, author, readTime, content, image } = blogData;
    
    return await prisma.blog.update({
      where: { id: parseInt(id) },
      data: {
        ...(category && { category }),
        ...(title && { title }),
        ...(author && { author }),
        ...(readTime && { readTime }),
        ...(content && { content }),
        ...(image && { image })
      }
    });
  }

  // Delete blog
  async deleteBlog(id) {
    return await prisma.blog.delete({
      where: { id: parseInt(id) }
    });
  }
}

export default new BlogService();
