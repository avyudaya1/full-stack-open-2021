const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  const emptyList = []
  const bigList = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 3,
      __v: 0
    },
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes(emptyList)
    expect(result).toBe(0)
  })

  // npm test -- -t 'when list has only one blog, equals the likes of that'
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(bigList)
    expect(result).toBe(8)
  })
})

describe('favorite blog', () => {
  const blogList = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 2
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 7
    },
  ]
  test('the blog which has most likes is the favorite blog', () => {
    const result = listHelper.favoriteBlog(blogList)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})

describe('most blogs', () => {
  const blogList = [
    {
      title: "Canonical string reduction",
      author: "H W Martin",
      likes: 12
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 2
    },
    
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 7
    },
  ]

  test('the author with most occurances has most blogs', () => {
    const result = listHelper.mostBlogs(blogList)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      blogs: 2
    })
  })
})

describe('most likes', () => {
  const blogList = [
    {
      title: "Canonical string reduction",
      author: "H W Martin",
      likes: 12
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 2
    },
    
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 7
    },
  ]

  test('the most liked author has highest likes on total of all his blogs', () => {
    const result = listHelper.mostLikes(blogList)
    expect(result).toEqual({
      author: "H W Martin",
      likes: 12
    })
  })
})