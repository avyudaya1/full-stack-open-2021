import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'

import Blog from './Blog'
import BlogForm from './BlogForm'

// Running tests
// CI=true npm test
// CI=true npm test -- --coverage

test('renders correct components', () => {
  const blog = {
    title: 'new blog',
    author: 'james',
    url: 'wwww.fullstackopen.com',
    likes: 0
  }

  const component = render(
    <Blog blog={blog}/>
  )

  expect(component.container.querySelector('.note-title')).toBeDefined()
  expect(component.container.querySelector('.note-author')).toBeDefined()
  expect(component.container.querySelector('.note-url')).toBeNull()
  expect(component.container.querySelector('.note-likes')).toBeNull()
})

test('clicking view shows blog url and likes', () => {
  const blog = {
    title: 'new blog',
    author: 'james',
    url: 'wwww.fullstackopen.com',
    likes: 0
  }

  const component = render(
    <Blog blog={blog}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container.querySelector('.note-url')).toBeDefined()
  expect(component.container.querySelector('.note-likes')).toBeDefined()
})

test('like button is pressed twice = event handler props is called twice', () => {
  const blog = {
    id: 1,
    title: 'new blog',
    author: 'james',
    url: 'wwww.fullstackopen.com',
    likes: 1
  }

  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} updateLikeCount={mockHandler}/>
  )

  const showButton = component.getByText('view')
  fireEvent.click(showButton)

  const button = component.getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('when blog is created its event handler is called', () => {
  const mockHandler = jest.fn()
  const component = render(
    <BlogForm createBlog={mockHandler}/>
  )

  const button = component.getByText('save')
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
