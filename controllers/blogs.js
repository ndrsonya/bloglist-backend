const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/blogs', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})


blogsRouter.post('/blogs', async (request, response, next) => {

  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status().json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })


  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)

})

blogsRouter.put('/addLikes/:id', async (request, response) => {
  const updatedBlog = { ...request.body, user: request.body.user.id}  
  console.log('updated blog', updatedBlog)
  await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
  response.json(updatedBlog)
})

blogsRouter.delete('/blogs/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})


module.exports = blogsRouter