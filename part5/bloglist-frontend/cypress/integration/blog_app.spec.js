describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Bob dk',
      username: 'bob',
      password: 'bob'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('bob')
      cy.get('#password').type('bob')
      cy.get('#login-button').click()

      cy.contains('Bob dk logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('bob')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Bob dk logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'bob', password: 'bob' })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blogform-title').type('a blog by cypress')
      cy.contains('save').click()
      cy.contains('a blog by cypress')
    })

    it('A user can like a blog', function() {
      cy.createBlog({ title:'first blog', url: 'www.fullstackopen.com', author: 'unknown' })
      cy.contains('view').click()
      cy.contains('like').click()
      cy.get('.blog-likes').contains(1)
    })

    it('A user who create a blog can delete it', function() {
      cy.createBlog({ title:'first blog', url: 'www.fullstackopen.com', author: 'unknown' })
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.get('html').should('not.contain', 'fist blog')
    })
  })
})



// describe('Blog app', function () {
//   beforeEach(function () {
//       cy.request('POST', 'http://localhost:3001/api/testing/reset')
//       const user = {
//           name: 'Ashna',
//           username: 'ashna111',
//           password: 'fullstack'
//       }
//       cy.request('POST', 'http://localhost:3001/api/users/', user)
//       cy.visit('http://localhost:3000')
//   })

//   it('Login form is shown', function () {
//       cy.contains('Log in')
//       cy.contains('username')
//       cy.contains('password')
//   })

//   describe('Login', function () {
//       it('succeeds with correct credentials', function () {
//           cy.get("#username").type("ashna111")
//           cy.get("#password").type("fullstack")
//           cy.get("#login-button").click()
//           cy.contains("Ashna is logged in")
//       })

//       it('fails with wrong credentials', function () {
//           cy.get("#username").type("ashna111")
//           cy.get("#password").type("fullstack1")
//           cy.get("#login-button").click()
//           cy.contains("Wrong credentials")
//       })
//   })

//   describe.only("When logged in", function () {
//       beforeEach(function () {
//           cy.request('POST', 'http://localhost:3001/api/login', {
//               username: 'ashna111', password: 'fullstack'
//           }).then(response => {
//               localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
//               cy.visit('http://localhost:3000')
//           })
//       })

//       it("a new blog can be created", function () {
//           cy.contains("new blog").click()

//           cy.get("#title").type("Test Title")
//           cy.get("#author").type("Test Author")
//           cy.get("#url").type("Test URL")
//           cy.get("#create-blog").click()

//           cy.contains("Test Title")
//       })

//       it("user can like a blog", function () {
//           cy.contains("new blog").click()

//           cy.get("#title").type("Test Title")
//           cy.get("#author").type("Test Author")
//           cy.get("#url").type("Test URL")
//           cy.get("#create-blog").click()

//           cy.contains("Test Title")
//           cy.contains("view").click()
//           cy.contains("like").click()
//           cy.contains(1)
//       })

//       it("user can delete blog", function () {
//           cy.contains("new blog").click()

//           cy.get("#title").type("Test Title")
//           cy.get("#author").type("Test Author")
//           cy.get("#url").type("Test URL")
//           cy.get("#create-blog").click()

//           cy.contains("Test Title")
//           cy.contains("view").click()
//           cy.contains("remove").click()
//       })

//       it("order of blogs", function () {
//           cy.contains("new blog").click()

//           cy.get("#title").type("Test Title 1")
//           cy.get("#author").type("Test Author 1")
//           cy.get("#url").type("Test URL 1")
//           cy.get("#create-blog").click()

//           cy.contains("view").click()
//           cy.contains("like").click()
//           cy.contains("hide").click()

//           cy.get("#title").type("Test Title 2")
//           cy.get("#author").type("Test Author 2")
//           cy.get("#url").type("Test URL 2")
//           cy.get("#create-blog").click()

//           cy.get(".blog").then(blogs => {
//               cy.wrap(blogs[0])
//           })

//       })
//   })
// })