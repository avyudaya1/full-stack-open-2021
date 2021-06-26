const dummy = (blogs) => 1

const totalLikes = (blogs) => {

  const reducer = (a, b) => {
    return { likes: a.likes + b.likes}
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer)["likes"]
}

const favoriteBlog = (blogs) => {

  const calculateFav = () => {
    const likesArray = blogs.map(blog => blog.likes)
    return blogs[likesArray.indexOf(Math.max(...likesArray))]
  }

  return blogs.length === 0
    ? 0
    : calculateFav()
}

const mostBlogs = (blogs) => {

  const calculateMost = () => {

    var output = Object.values(
      blogs.reduce((obj, {author}) => {
        if(obj[author] === undefined){
          obj[author] = {author: author, blogs: 1}
        }
        else{
          obj[author].blogs++;
        }
        return obj
      }, {})
    )
    
    const outputIndexByBlogs = output.map(o => o.blogs)
    return output[outputIndexByBlogs.indexOf(Math.max(...outputIndexByBlogs))]
  }

  return blogs.length === 0
    ? 0
    : calculateMost()
}

const mostLikes = (blogs) => {

  const calculateLikes = () => {

    var output = Object.values(
      blogs.reduce((obj, {author, likes}) => {
        if(obj[author] === undefined){
          obj[author] = {author: author, likes: likes}
        }
        else{
          obj[author].likes+= likes;
        }
        return obj
      }, {})
    )
    
    const outputIndexByBlogs = output.map(o => o.likes)
    return output[outputIndexByBlogs.indexOf(Math.max(...outputIndexByBlogs))]
  }

  return blogs.length === 0
    ? 0
    : calculateLikes()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}