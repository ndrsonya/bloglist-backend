const dummy = (blogs) => {
    return 1
  }

const favoriteBlog = (blogs) => {

  mostLiked = Math.max.apply(null, blogs.map(function(o) { return o.likes; }));
  var mostLikedPost = blogs.filter(function(o) { return o.likes === mostLiked; })[0];
  return mostLikedPost;

}


const mostBlogs = (blogs) => {

  const authors = {}
  for (blogIndex in blogs) {
      const blog = blogs[blogIndex]
      authors[blog.author] = authors[blog.author] + 1 || 1
  }
  const authorArray = []
  for (authorName in authors) {
      const author = authors[authorName]
      authorArray.push({author: authorName, blogs: author})
  }

  theBiggestAmount = Math.max.apply(null, authorArray.map(function(o) { return o.blogs; }));
  let mostBlogsAuthor = authorArray.filter(function(o) { return o.blogs === theBiggestAmount; })[0];
  return ({
    author: mostBlogsAuthor.author,
    blogs: theBiggestAmount
  });

}

const totalLikes = (blogs) => {

   return blogs.reduce((s, o) => s + o.likes, 0)
    
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog, 
    mostBlogs
  }