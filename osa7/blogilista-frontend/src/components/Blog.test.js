import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'


describe('Testing with initial blogs', () => {
    let component
    let mockHandler

    beforeEach(() => {
        const blog = {
            title: 'Testi',
            author: 'Testuser',
            user: {
                username: 'test'
            },
            likes: 1,
            url: 'test.com'
        }

        const user = {
            username: 'test',
            name: 'Testuser'
        }

        mockHandler = jest.fn()

        component = render(
            <Blog blog={blog} user={user} addLike={mockHandler} />
        )
    })

    test('<Blog /> component renders title and author, but not url or likes', () => {
        expect(component.container).toHaveTextContent('Testi')
    })

    test('Clicking blog name shows url and likes', () => {
        fireEvent.click(component.container.querySelector('.blog'))

        const urlDiv = component.container.querySelector('.url')
        expect(urlDiv).toBeDefined()

        const likesDiv = component.container.querySelector('.likes')
        expect(likesDiv).toHaveTextContent('likes')
    })

    test('Clicking like-button twice calls event handle twice', () => {
        fireEvent.click(component.container.querySelector('.blog'))
        const button = component.getByText('Like')

        fireEvent.click(button)
        fireEvent.click(button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})
